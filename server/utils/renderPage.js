async function renderPage(app, req, res) {
  // объединяем параметры и строку запроса из объекта запроса
  const query = { ...req.params, ...req.query }

  try {
    // рендерим страницу
    const html = await app.renderToHTML(req, res, req.path, query)

    // записываем ее в `redis`
    // данный метод добавляется в объект ответа соответствующим посредником
    res.saveHtmlToCache(html)

    // и возвращаем клиенту
    res.send(html)
  } catch (err) {
    console.error(err)

    // рендерим дефолтную страницу ошибки
    await app.renderError(err, req, res, req.path, query)
  }
}

module.exports = renderPage