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
  const pageNumber = 2; // hard coded for simplicity usually will get it from an API call
  const pageSize = 10; // hard coded for simplicity usually will get it from an API call
//ex: api/courses/?pageNumber=2&pageSize=10

  const courses = await Course
  .find({ author: 'Mosh', isPublished: true })
  .skip( (pageNumber - 1 ) * pageSize ) // used to impliment pagination. To initiate pagination we need to skip all the documents on the previous page.
  .limit(pageSize) // then you change this to pageSize
  //with lines 55 & 56 we can get the documents for any given page
  .sort({ name: 1 })
  .select({ name: 1, tags: 1 })
  console.log (courses);
}

getCourses();
