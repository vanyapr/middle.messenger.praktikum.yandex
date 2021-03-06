const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для работы с хтмл в вебпаке
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Плагин для склейки цсс
const CopyPlugin = require('copy-webpack-plugin'); // Плагин для копирования файлов

module.exports = {
  mode: 'production',
  entry: './src/pages/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'chat.[fullhash].bundle.js',
  },
  resolve: {
    // Такой список нужен для резолва всех необходимых разрешений файлов
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json', '.html'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Чат', // Кастомный тайтл у хтмл файла
      template: './static/index.html', // Входной файл
      filename: 'index.html', // Файл на выходе
      favicon: './static/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'style-[fullhash].css',
    }), // подключение плагина для объединения файлов

    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'static/favicon.ico'), to: 'build' },
      ],
    }),
  ],
  module: {
    rules: [
      // Typescript
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader', // Обработчик яваскриптов
            options: { // Пришлось добавить эту часть в сборщик, потому что иначе сыпало ошибками о неподдерживаемом синтаксисе
              presets: [
                {
                  plugins: ['@babel/plugin-proposal-class-properties'], // включает поддержку продвинутого синтаксиса яваскрипта
                },
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              // transpileOnly: true, // Только транспиляция
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      // JS
      {
        test: /\.js$/, // Регулярное выражение для поиска яваскриптов
        loader: 'babel-loader', // Обработчик яваскриптов
        options: { // Пришлось добавить эту часть в сборщик, потому что иначе сыпало ошибками о неподдерживаемом синтаксисе
          presets: [
            {
              plugins: ['@babel/plugin-proposal-class-properties'], // включает поддержку продвинутого синтаксиса яваскрипта
            },
          ],
        },
        exclude: path.resolve(__dirname, 'node_modules'), // Исключенные директории
      },
      // SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // Картинки
      {
        test: /\.(png|jpg|jpeg|gif)$/i, // регулярное выражение, которое ищет все файлы с такими расширениями
        use: {
          loader: 'file-loader', // при обработке этих файлов нужно использовать file-loader
        },
        // type: 'asset',
      },
      // SVG
      {
        test: /\.svg$/i, // регулярное выражение, которое ищет все файлы с такими расширениями
        type: 'asset/resource',
      },
      // Шрифты
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Отдельный загрузчик для шрифтов, потому что предыдущий вариант сыпал ошибки
        type: 'asset',
      },
      // ХТМЛ файлы
      {
        test: /\.html$/,
        loader: 'html-loader', // при обработке этих файлов нужно использовать html-loader
      },
      // CSS
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              // sourceMap: true, // вот так - генерирует sourcemap для CSS
              importLoaders: 1,
            }, // Настройка для импорта файлов
          },
          'postcss-loader', // Лоадер для минификации файлов
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 9000,
  },

};
