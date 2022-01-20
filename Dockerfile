FROM node:16.13.1-alpine
# Указываем рабочюю директорию
WORKDIR /messenger

# Копируем package.json
COPY package*.json ./

# Ставим модули только для продакшена
RUN npm ci --only=production

# Копируем исходные коды
COPY ./index.js ./
COPY ./build/*.* ./build/

# Открываем 3000 порт
#EXPOSE 3000

# Запускаем приложение
CMD npm run start
