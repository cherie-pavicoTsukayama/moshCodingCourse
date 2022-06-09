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
  //Comparision Opertators
    //eq (equal)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than or equal to)
    //lt (less than)
    //lte (less than or equal to)
    //in
    //nin (not in)

  const courses = await Course
  // .find( //this is a Class Method. It returns a Promise.
  //  {//this is a filter where we can pass properties that are found in the document.
  //   author: 'Mosh',
  //   isPublished: true
  //  })
  //.find ({price: { $gte:10, $lte: 20 }})// filtering for prices greater than or eaqal to 10 AND less than or equal to 20.
  .find({ price: { $in: [10, 15, 20] } }) //filtering for prices that are IN the given array.
  .limit(10)//you can limit the query by 10 documents
  .sort({ name: 1 })// uses key value pair to sort by. Value 1 = assending order. Value -1 = decending order.
  .select({
    name: 1,
    tags: 1
  })//you can select which property you want to return.
  console.log (courses);
}

getCourses();
