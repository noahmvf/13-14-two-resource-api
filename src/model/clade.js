'use strict';

import mongoose from 'mongoose';

const cladesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  species: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'species',
    },
  ],
}, { timestamps: true }); //  creates new createdOn and new updated

cladesSchema.pre('findOne', function preHookCallback(done) {
  this.populate('species');
  done();
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('clade', cladesSchema, 'clade', skipInit);
