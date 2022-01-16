const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для работы с хтмл в вебпаке
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Плагин для склейки цсс

module.exports = {
  mode: 'development',
  entry: './src/pages/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'chat.bundle.js',
  },
  resolve: {
    // Такой список нужен для резолва всех необходимых разрешений файлов
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json', '.html'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Чат', // Кастомный тайтл у хтмл файла
      template: './static/index.html', // путь к файлу index.html
    }),

    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
  module: {
    rules: [
      // Typescript
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      // SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // Картинки
      {
        test: /\.(png|svg|jpg|gif)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
        loader: 'file-loader', // при обработке этих файлов нужно использовать file-loader
      },
      // Шрифты
      {
        test: /\.(woff|woff2|ttf|eot)$/, // Отдельный загрузчик для шрифтов, потому что предыдущий вариант сыпал ошибки
        use: 'file-loader',
      },
      // ХТМЛ файлы
      {
        test: /\.html$/,
        loader: 'html-loader', // при обработке этих файлов нужно использовать file-loader
      },
      // CSS
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true, // вот так - генерирует sourcemap для CSS
              importLoaders: 1,
            }, // Настройка для импорта файлов
          },
          'postcss-loader', // Лоадер для минификации файлов
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 9000,
  },

};
