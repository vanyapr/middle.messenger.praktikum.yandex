const connectHistoryApiFallback = require('connect-history-api-fallback');
const { PORT = 3000 } = process.env;
const express = require('express');

const app = express();
app.use('/', connectHistoryApiFallback()); // Route is controlled by js, must be written in front of express.static! ! !
app.use('/', express.static(`${__dirname}/build`));

app.listen(PORT, () => {
  console.log('App listening at 3000');
});
