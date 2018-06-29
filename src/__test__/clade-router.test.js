'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Clade from '../model/clade';
import createMockCladePromise from './mocks/cladeMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/clades`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => Clade.remove({}));

describe('POST /api/clade', () => {
  const mockResource = {
    name: faker.lorem.words(1),
    species: faker.lorem.words(1),
  };

  test('200 POST for successful post of a clade', () => {
    return superagent.post(apiUrl)
      .send(mockResource)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(mockResource.name);
        expect(response.body.species).toEqual(mockResource.species);
        expect(response.body._id).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('GET /api/clades', () => {
  test('200 GET for successful fetching of a clade', () => {
    let returnedClade;
    return createMockCladePromise()
      .then((newClade) => {
        returnedClade = newClade;
        return superagent.get(`${apiUrl}/${newClade._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(returnedClade.name);
        expect(response.body.species).toEqual(returnedClade.species);
      })
      .catch((err) => {
        throw err;
      });
  });
});
