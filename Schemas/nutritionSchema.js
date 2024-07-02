const mongoose = require('mongoose');


const nutritionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    food: {type: String, required: true},
    calories: {type: Number, required: true},
    protein: {type: Number, required: true},
    carbs: {type: Number, required: true},
    fat: {type: Number, required: true},
  });

  const Nutrition = mongoose.model('nutrition', nutritionSchema);

  module.exports = Nutrition;


