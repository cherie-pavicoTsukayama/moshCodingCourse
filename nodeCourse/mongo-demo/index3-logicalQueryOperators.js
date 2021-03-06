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
  //Logical Query Operators
    //or
    //and

  const courses = await Course
  // .find(
  //  {//this is a filter where we can pass properties that are found in the document.
  //   author: 'Mosh',
  //   isPublished: true
  //  })
  .find()//call the find method with no argumentes. this is a Class Method. It returns a Promise.
  .or([ { author: 'Mosh' }, { isPublished: true } ])// use an array with two objects that are "filters" just like we used in the find method above.
  // with the or method with 2 filters we will get courses by Mosh OR that are published
  .and([ {} ]) // you can use the and method with filters just like the OR method above.
  .limit(10)//you can limit the query by 10 documents
  .sort({ name: 1 })// uses key value pair to sort by. Value 1 = assending order. Value -1 = decending order.
  .select({
    name: 1,
    tags: 1
  })//you can select which property you want to return.
  console.log (courses);
}

getCourses();
