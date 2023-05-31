const next = require('next')
const express = require('express')
const { CronJob } = require('cron')

const pageController = require('./utils/pageController')
const renderPage = require('./utils/renderPage')

const CACHED_PAGES = ['/', '/catalog', '/about']

const DEFAULT_CATEGORIES = [
  {
    id: 1,
    title: 'First category',
    products: []
  },
  {
    id: 2,
    title: 'Second category',
    products: []
  },
  {
    id: 3,
    title: 'Third category',
    products: []
  }
]

let allCategories = []

async function updateCategories() {
  console.log('@update')
  try {
    const index = Math.floor(Math.random() * 3)
    const categories = await Promise.resolve(DEFAULT_CATEGORIES)
    allCategories = [categories[index]]
  } catch (err) {
    console.error(err)
  }
}
updateCategories()

const cronJobForCategories = new CronJob(
  '*/1 * * * *',
  updateCategories,
  null,
  false,
  'Europe/Moscow'
)

const dev = process.env.ENV === 'development'

const app = next({ dev })

const handle = app.getRequestHandler()
let intervalId = null;
app.prepare().then(() => {
  const server = express()

  server.use(express.static('static'))

  server.get('/_next/*', handle)

  server.get('/favicon.ico', handle)

  server.get('/current-categories', (req, res) => {
    res.json(allCategories)
  })

  server.get('*', pageController, (req, res) => {
    console.log('@route handler', req.path)

    if (req.path === '/clear-cache') {
      if (
        req.headers['x-verification-code'] &&
        req.headers['x-verification-code'] !== process.env.VERIFICATION_CODE
      ) {
        return res.sendStatus(403)
      }

      res.clearCache()

      return res.sendStatus(200)
    }

    if (CACHED_PAGES.includes(req.path)) {
      if(!intervalId) {
        intervalId = setInterval(() => {
          res.clearCache()
        }, 10000);
      }
      return renderPage(app, req, res)
    }

    return handle(req, res)
  })

  const port = 5000

  server.listen(port, (err) => {
    if (err) return console.error(err)

    console.log(`🚀 Server ready on port ${port}`)
  })

  if (!dev) {
    console.log('@Prod')
    cronJobForCategories.start()
  }
})