const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
]

//**Create an endpoint to get a list of all genres
//Create a new genre
//Update a genre
//Delete an existing genre

app.get('/api/genres', (req, res) => {
 return res.send(genres);
});

app.get('/api/genres/:name', (req, res) => {
  const reqName = req.params.name.toLocaleLowerCase();
  const genre = genres.find(g => g.name.toLocaleLowerCase() === reqName);
  if (!genre) return res.status(404).send('Genre does not exist.');
  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = (validateGenre(req.body));
  if (error) res.status(400).send(error.details[0].message);
  let name = (bodyName) => {
    const firstLetter = bodyName.shift();
    return firstLetter;
  }
  console.log(name(req.body.name));


})

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
