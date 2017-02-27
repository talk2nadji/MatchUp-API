'use strict';

// match-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true }
});

const matchSchema = new Schema({
  // date: { type: Date, required: true, 'default': Date.now },
  // generatorId: { type: Schema.Types.ObjectId, ref: 'user' },
  // userOneId: { type: Schema.Types.ObjectId, ref: 'user' },
  // userTwoId: { type: Schema.Types.ObjectId, ref: 'user' },

  date: { type: Date, required: true, 'default': Date.now },
  generatorId: { type: Schema.Types.ObjectId, ref: 'user' },
  user1: { type: String, required: true },
  user2: { type: String, required: true },

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const matchModel = mongoose.model('match', matchSchema);

module.exports = matchModel;
