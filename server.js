const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((conn) => {
  console.log('db connection successful!');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
