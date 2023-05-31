# дефолтная версия `Node.js`
ARG NODE_VERSION=16.15.0

# образ
FROM node:${NODE_VERSION}

# рабочия директория
WORKDIR /app

# копируем указанные файлы в рабочую директорию
COPY package.json ./

# устанавливаем зависимости
RUN npm install

# копируем остальные файлы
COPY . .

# выполняем сборку приложения
RUN npm run build

# запускаем кастомный сервер в производственном режиме
CMD ["npm", "start"]