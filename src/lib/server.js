'use strict';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './logger';
import speciesRouter from '../router/species.router';
import cladeRouter from '../router/clades.router';

import errorMiddleWare from './middleware/error-middleware';
import loggerMiddleWare from './middleware/logger-middleware';

const app = express();
const PORT = process.env.PORT || 3000;
let server = null;

// third party apps
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// parses binary into proper json

app.use(loggerMiddleWare);
app.use(cladeRouter);
app.use(speciesRouter);

app.use(errorMiddleWare);

app.all('*', (request, response) => {
  return response.sendStatus(404).send('Route Not Registered');
});

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(PORT, () => {
        console.log('Server up:', PORT);
      });
    })
    .catch((err) => {
      throw err;
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    })
    .catch((err) => {
      throw err;
    });
}; // disconnects us from Mongoose and returns a Promise that will close our server

export { startServer, stopServer };
