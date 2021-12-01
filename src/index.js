const path = require('path');
const express = require('express');
const hbs = require('hbs');
const pokemon = require('./utils/pokemon');
const shakespeare = require('./utils/shakespeare');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Home Directory
app.get('', (req, res) => {
  res.render('index', {
    title: 'Pokemon Home Page',
    name: 'Abdel Hady Koulailat',
  });
});

// Pokemon Directory
app.get('/pokemon/*', (req, res) => {
  const requestedPokemon = req.params[0];

  if (!requestedPokemon) {
    return res.send({
      error: 'You must provide a Pokemon name in the URL',
    });
  }

  pokemon(requestedPokemon, (pokemonError, pokemonData) => {
    if (pokemonError) {
      return res.send({ error: pokemonError });
    }
    shakespeare(pokemonData, (shakespeareError, shakespeareTranslated) => {
      if (shakespeareError) {
        return res.send({ error: shakespeareError });
      }
      res.send({
        requestedPokemon,
        shakespeareTranslated,
      });
    });
  });
});

// Unknown Directory Error Page
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMessage: 'I think you are looking for /pokemon/<pokemon_name> e.g: http://localhost:3000/pokemon/charizard',
    name: 'Abdel Hady Koulailat',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
