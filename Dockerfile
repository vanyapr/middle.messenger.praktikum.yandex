FROM node:16
# Указываем рабочюю директорию
WORKDIR /messenger

# Копируем package.json
COPY package*.json ./

# Ставим модули только для продакшена
RUN npm ci --only=production

# Копируем исходные коды
COPY . .

# Открываем 3000 порт
#EXPOSE 3000

# Запускаем приложение
CMD node index.js
