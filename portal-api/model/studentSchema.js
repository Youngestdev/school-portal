const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    regno: {
      type: Number,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      trim: true,
      required: true
    },
    faculty: {
      type: String,
      trim: true,
      required: true
    },
    department: {
      type: String,
      trim: true,
      required: true
    },
    programme: {
      type: String,
      trim: true,
      required: true
    },
    currlvl: {
      type: Number,
      required: true
    },
    user: {
      type: String,
      trim: true,
      required: true
    }
  },
  {collection: 'students'}
);


studentSchema.index({regno: 1}, {unique: true});

let studentsModel = mongoose.model(Students, studentSchema);

module.exports = studentsModel;
