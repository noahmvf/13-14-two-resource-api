'use strict';

import { Router } from 'express';
import logger from '../lib/logger';
import Clade from '../model/clade';

const cladeRouter = new Router();

cladeRouter.post('/api/clades', (request, response, next) => {
  Clade.init() // initalizing our router
    .then(() => { // returning a promise
      logger.log(logger.INFO, `CLADEROUTER BEFORE SAVE: Saved a new clade ${JSON.stringify(request.body)}`);
      return new Clade(request.body).save(); // logging infomration then saving to our database
    })
    .then((newClade) => {
      logger.log(logger.INFO, `CLADE ROUTER AFTER SAVE: Saved a new clade ${JSON.stringify(newClade)}`);
      return response.json(newClade);
    })
    .catch(next);
});

cladeRouter.get('api/clades/:id?', (request, response, next) => {
  Clade.init()
    .then(() => {
      return Clade.findOne({ _id: request.params.id }); // returns the first occurrence in our selection
    })
    .then((foundClade) => {
      logger.log(logger.INFO, `CLADE ROUTER: FOUND THE MODEL, ${JSON.stringify(foundClade)}`);
      response.json(foundClade);
    })
    .catch(next);
});

export default cladeRouter;
