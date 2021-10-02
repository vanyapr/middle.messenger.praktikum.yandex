const express = require('express');
const PORT = 3000;

// Объявили экземпляр экспресса
const app = express();

app.use('/', express.static(`${__dirname}/build`))

app.listen(PORT, () => {
    console.log('App listening at 3000');
});
