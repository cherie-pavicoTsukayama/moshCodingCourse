const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
]

//**Create an endpoint to get a list of all genres
//**Create a new genre
//**Update a genre
//Delete an existing genre

router.get('/', (req, res) => {
  return res.send(genres);
});

router.get('/:name', (req, res) => {
  const reqName = req.params.name.toLocaleLowerCase();
  const genre = genres.find(g => g.name.toLocaleLowerCase() === reqName);
  if (!genre) return res.status(404).send('Genre does not exist.');
  res.send(genre);
});

router.post('/', (req, res) => {
  const { error } = (validateGenre(req.body));
  if (error) res.status(400).send(error.details[0].message);

  const reqName = req.body.name;
  const name = (bodyName) => {
    const firstLetter = bodyName.split("")[0].toUpperCase();
    const letters = bodyName.substring(1).toLowerCase();
    return firstLetter + letters;
  }

  const genre = genres.find(g => g.name === name(reqName));
  if (genre) return res.status(200).send('That Genre already exists.');

  const lastId = genres.slice(genres.length - 1)[0].id + 1;
  const newGenre = {
    id: lastId,
    name: name(reqName)
  }
  genres.push(newGenre);

  return res.status(201).send(newGenre);
});

router.put('/:id', (req, res) => {
  const { error } = (validateGenre(req.body));
  if (error) res.status(400).send(error.details[0].message);

  const reqId = parseInt(req.params.id);
  const newName = req.body.name;
  const genre = genres.find(g => g.id === reqId);
  if (!genre) return res.status(400).send('The Genre with the given ID was not found.');

  genre.name = newName;
  return res.status(201).send(genre);
})

router.delete('/:id', (req, res) => {
  const reqId = parseInt(req.params.id);
  const genre = genres.find(g => g.id === reqId);
  if (!genre) return res.status(400).send('The Genre with the given ID was not found.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.status(200).send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(genre);
}

module.exports = router;
