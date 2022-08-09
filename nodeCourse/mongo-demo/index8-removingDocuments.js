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

//save the Course instance into the database
async function createCourse() {
 try {
  const course = new Course ({
    name: 'Calligraphy Course',
    author: 'Cherie',
    tags: ['writting'],
    isPublished: true
  })
   const result = await course.save();
   console.log(result);
}
  catch(err){
    console.log('Error:', err.message);
  }
}


//Removing a course
async function removeCourse(id) {
  //const result = await Course.deleteOne({ _id: id }); deletes one course.
  //const result = await Course.deleteMany({ _id: id }); will delete the first one it finds
  const result = await Course.findByIdAndRemove({ _id: id });
  console.log('Course deleted:', result);
}



//createCourse();
removeCourse('62f2924334c72c3ae1820499');
