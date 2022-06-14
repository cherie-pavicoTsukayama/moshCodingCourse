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
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

  //Model
  //using the mongoose method model to create a Class what uses the courseSchema Schema
  //to create instances with that schema.

const Course = mongoose.model('Coures', courseSchema);


//save the Course instace into the database
async function createCourse(){
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
 catch(err) {
  console.log('Error:', err.message);
 }
}

//Querying Documents
async function getCourses() {
  const courses = await Course
  // .find({ author: 'Mosh', isPublished: true })

  //Get course that Starts with Mosh
  // the ^ character in regular expressions represents a string that starts with something
  .find({ author: /^Mosh/})

  //Get Course that ENDS with Hamedani
  // the $ character in regular expressions represents the end of a string this
  // query is case sensitive. To make it not case sensitive apend a i at the end.
  .find({ author: /Hamedani$/i })

  // Get course who's author contains the word 'Mosh'
  // the .* characters together in regular expresion represents 0 or more characters
  // before or after the given string. It does not matter what characters are.
  // This code is currently case sensitive, to make it case insensitive put an i at the end. 
.find({ author: /.*Mosh.*/ })
  .limit(10)
  .sort({ name: 1 })
  .select({ name: 1, tags: 1 })
  console.log (courses);
}

getCourses();
