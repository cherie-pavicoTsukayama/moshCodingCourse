const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch( err => console.log('Failed to connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  tags: [ String ],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
  __v: Number
})

const Course = mongoose.model('Courses', courseSchema);

async function getCourses() {
return await Course
    .find({
      isPublished: true,
      tags: 'backend'
    })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 })
}

async function run() {
  const courses = await getCourses();
  console.log('Courses', courses);
}

run();
