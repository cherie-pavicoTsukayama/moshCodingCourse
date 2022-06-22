const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

//Schemas Types
// String
// Number
// Date
// Buffer
// Boolean
// ObjectID
// Array

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

//Model
//using the mongoose method model to create a Class what uses the courseSchema Schema
//to create instances with that schema.
const Course = mongoose.model('Coures', courseSchema);


//save the Course instace into the database
async function createCourse() {
  try {
    const course = new Course({
      name: 'Angular Course',
      author: 'Mosh',
      tags: ['angular', 'frontend'],
      isPublished: true
    })
    const result = await course.save(); //this is an asycn operation and so it will return a promise in the future.
    console.log(result);
  }
  catch (err) {
    console.log('Error:', err.message);
  }
}

//Querying Documents
async function getCourses() {
  const pageNumber = 2; // hard coded for simplicity usually will get it from an API call
  const pageSize = 10; // hard coded for simplicity usually will get it from an API call
  //ex: api/courses/?pageNumber=2&pageSize=10

  const courses = await Course
    .find({ author: 'Mosh', isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
  console.log(courses);
}

//Updating a Document Query First
async function updateCourse(id) {
 const course = await Course.findById(id);
 if (!course) return;

  course.isPublished = true;
  course.author = 'another author';

  const result = await course.save();
  console.log(result);
 }


updateCourse('629fe47b1a2448051f598383');

