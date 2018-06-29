'use strict';

import faker from 'faker';
import Species from '../../model/species';
import cladeMockPromise from './cladeMock';

export default () => {
  const mockData = {};
  return cladeMockPromise()
    .then((newClade) => {
      mockData.clade = newClade;
    })
    .then(() => {
      const mockSpecies = {
        name: faker.lorem.words(1),
        scientific: faker.lorem.words(2),
        diet: faker.lorem.words(1),
        cladeId: mockData.clade._id,
      };
      return new Species(mockSpecies).save();
    })
    .then((newSpecies) => {
      mockData.species = newSpecies;
      return mockData;
    })
    .catch((err) => {
      throw err;
    });
};
