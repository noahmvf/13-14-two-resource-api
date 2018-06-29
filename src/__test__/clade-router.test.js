'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Clade from '../model/clade';
import createMockCladePromise from './lib/cladeMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/clades`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => Clade.remove({}));

describe('POST /api/clades', () => {
  const mockResource = {
    name: faker.name.firstName(),
    teacher: 'Vinicio',
  };

  test('200 POST for successful post of a clade', () => {
    return superagent.post(apiUrl)
      .send(mockResource)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(mockResource.name);
        expect(response.body.teacher).toEqual(mockResource.teacher);
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
        expect(response.body.teacher).toEqual(returnedClade.teacher);
      })
      .catch((err) => {
        throw err;
      });
  });
});
