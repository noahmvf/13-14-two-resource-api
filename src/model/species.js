import mongoose from 'mongoose';
import Clade from './clade';

const speciesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  scientific: {
    type: String,
    required: true,
    unique: true,
  },
  diet: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

const skipInit = process.env.NODE_ENV === 'development';

export default mongoose.model('species', speciesSchema, 'species', skipInit);

const speciesPreHook = (done) => {
  return Clade.findById(this.cladeId)
    .then((foundClade) => {
      foundClade.species.push(this._id);
      return foundClade.save();
    })
    .then(() => done()) // done without any arguments means success
    .catch(done); // done with results means an error - do not save
};

const speciesPostHook = (document, done) => {
  return Clade.findById(document.cladeId)
    .then((foundClade) => {
      foundClade.speciesGroup = foundClade.speciesGroup.filter(species => species._id.toString() !== document._id.toString());
      return foundClade.save();
    })
    .then(() => done())
    .catch(done);
};

speciesSchema.pre('save', speciesPreHook);
speciesSchema.post('remove', speciesPostHook);

