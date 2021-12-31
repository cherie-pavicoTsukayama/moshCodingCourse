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
//**Create a new genre
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
  const reqName = req.body.name;
  const name = (bodyName) => {
    const firstLetter = bodyName.split("")[0].toUpperCase();
    const letters = bodyName.substring(1).toLowerCase();
    return firstLetter + letters;
  }

  const { error } = (validateGenre(req.body));
  if (error) res.status(400).send(error.details[0].message);

  for( let i = 0; i < genres.length; i++ ) {
    if (name(reqName) === genres[i].name) {
      return res.status(200).send('That Genre already exists.')
    }
  }

  const lastId = genres.slice(genres.length - 1)[0].id + 1;
  const genre = {
    id: lastId,
    name: name(reqName)
  }
  genres.push(genre);

  return res.status(201).send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const reqId = parseInt(req.params.id);
  const newName = req.body.name;
  const genre = genres.find(g => g.id === reqId);
  if (!genre) return res.status(404).send('The Genre with the given ID was not found.');

  genre.name = newName;
  return res.status(201).send(genre);


})

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
