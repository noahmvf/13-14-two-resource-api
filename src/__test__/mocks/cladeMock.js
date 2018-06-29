'use strict';

import faker from 'faker';
import Clade from '../../model/clade';

export default () => {
  const mockResourceToPost = {
    name: faker.lorem.words(1),
    species: faker.lorem.words(2),
  };
  return new Clade(mockResourceToPost).save();
};
