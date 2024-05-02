require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((conn) => {
  console.log('db connection successful!');
});

const app = require('./app');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
