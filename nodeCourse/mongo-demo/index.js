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

createCourse()
