'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Clade from '../model/clade';
import Species from '../model/species';
import createMockDataPromise from './lib/speciesMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/species`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => {
  Promise.all([
    Clade.remove({}),
    Species.remove({}),
  ]);
});

describe('POST /api/speciess', () => {
  test('200 POST for succcesful posting of a species', () => {
    return createMockDataPromise()
      .then((mockData) => {
        const mockSpecies = {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
          cladeId: mockData.clade._id,
        };

        return superagent.post(apiUrl)
          .send(mockSpecies)
          .then((response) => {
            expect(response.status).toEqual(200);
          })
          .catch((err) => {
            throw err;
          });
      });
  });
});

describe('GET /api/species', () => {
  test('200 GET for succesful fetching of a species', () => {
    return createMockDataPromise()
      .then((mockData) => {
        return superagent.get(`${apiUrl}/${mockData.species._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      })
      .catch((err) => {
        throw err;
      });
  });
});
