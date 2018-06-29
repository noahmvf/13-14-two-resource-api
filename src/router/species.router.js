'use strict';

import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Species from '../model/species';

const speciesRouter = new Router();

speciesRouter.post('/api/species', (request, response, next) => {
  Species.init()
    .then(() => {
      logger.log(logger.INFO, `SPECIES ROUTER: POST BEFORE SAVE: ${JSON.stringify(request.body)}`);
      return new Species(request.body).save();
    })
    .then((newSpecies) => {
      logger.log(logger.INFO, `SPECIES ROUTER: POST AFTER SAVE: ${JSON.stringify(newSpecies)}`);
    });
});

speciesRouter.get('api/species/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, 'Did not enter an ID'));
  }
  
  Species.init() ///////////////////////
})
