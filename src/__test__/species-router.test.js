'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Clade from '../model/clade';
import Species from '../model/species';
import createMockDataPromise from './mocks/speciesMock';

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
          name: faker.lorem.words(1),
          scientific: faker.lorem.words(2),
          diet: faker.lorem.words(1),
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
