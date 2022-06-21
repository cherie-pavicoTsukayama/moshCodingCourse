const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Failed to connect...', err));

const courseSchema = new mongoose.Schema({
  tags: [String],
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
  .find({ isPublished: true })
  .or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i }
  ])
  .sort('name')
  .select('name price')
};

async function run(){
  const courses = await getCourses();
  console.log('Published courses, $15 or more and have "by" in the title', courses);
}

run();
