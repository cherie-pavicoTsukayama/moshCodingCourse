const morgan = require('morgan');
const express = require ('express');
const app = express();

if (app.get('evn') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
