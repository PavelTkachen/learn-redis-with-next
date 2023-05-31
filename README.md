Для запуска редиса:
docker-compose up // или в демоне, чтбы не видеть логи:
docker-compose up -d

Для запуска приложения:
npm install
npm run build
npm start

При необходимости очистки кеша редиса:
GET запрос на адрес http://localhost:5000/clear-cache c заголовком x-verification-code: super-secret
(Можно воспользоваться либо курлом либо postman/insomnia)
Такая необходимость встречается при отладке когда нужно перезапустить сервер(npm start), лучше при каждом перезапуске чистить кеш иначе таймер не будет работать