const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Failed to connect...', err));


const courseSchema = new mongoose.Schema({
  name: String,
  tags: [ String ],
  date: Date,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Courses', courseSchema);

async function getCourses() {
  return await Course
    .find({ isPublished: true })
    .or([{tags: 'frontend'}, {tags: 'backend'}])
    // .and( [{tags: /.*end.*/}] ) this code works as well as or.
    .sort('-price')
    .select('name author tags price')
}

async function run(){
  const courses = await getCourses()
  console.log('Courses by Decending Price', courses)
}

run();
