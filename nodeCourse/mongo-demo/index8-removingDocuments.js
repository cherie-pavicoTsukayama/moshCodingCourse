const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch( err => console.log('Could not connect to MongoDB...', err ));

//Schemas Types
// String
// Number
// Date
// Buffer
// Boolean
// ObjectID
// Array

const courseSchema = new mongoose.Schema({
  name: String;
  author: String;
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

//Model
//using the mongoose method model to create a Class what uses the courseSchema Schema
//to create instances with that schema.
const Course = mongoose.model('Course', courseSchema);

//Removing a course
async function removeCourse(id) {

}

removeCourse('629fe47b1a2448051f598383')
