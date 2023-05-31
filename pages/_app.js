import '@/styles/globals.css'
import Nav from '../components/Nav'

export default function App({ Component, pageProps }) {
  return (
    <div className='app'>
      <header>
        <h1>Next.js + Redis</h1>
        <Nav />
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        <p>&copy; 2022. Not all rights reserved</p>
      </footer>
    </div>
  )}
