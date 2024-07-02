const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  date: { type: String, required: true }, 
  exercises: [{
    type: { type: String, required: true },
    duration: { type: Number, required: true }
  }]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;