import express from 'express'
import mongoose from 'mongoose'
// import cors from 'cors';

import userRoutes from './routes/user-routes.js'

const app = express()
app.use(express.json())  // instead of bodyParser.json() in express 4.16+

// prevent CORS errors
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'
  );
  next()
})

app.use('/api/user', userRoutes);

app.use((req, res, next) => {
  return next(new HttpError('Not Found', 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || '[B_APP 36]' })
});

const CONNECTION_URL = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@mern.vohpb.mongodb.net/${ process.env.DB_NAME }?retryWrites=true&w=majority`

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => console.log('\n[OK] Connected to DB \n'))
  })
  .catch(err => console.log(err))