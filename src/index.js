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
app.get('/pokemon/:pokemon', async (req, res) => {
  const requestedPokemon = req.params.pokemon;

  if (!requestedPokemon) {
    return res.send({
      error: 'You must provide a Pokemon name in the URL',
    });
  }

  try {
    const [pokemonError, pokemonData] = await pokemon(requestedPokemon);

    if (pokemonError) {
      return res.send({ error: pokemonError });
    }

    let firstEnglishDescription;
    // Loop over objects and return first object where language is English
    for (let i = 0; i < pokemonData.length; i += 1) {
      if (pokemonData[i].language.name === 'en') {
        // Assign Pokemon description to variable and break out of loop
        firstEnglishDescription = (JSON.stringify(pokemonData[i].flavor_text, null, ' '));
        break;
      }
    }

    const [shakespeareError, shakespeareTranslated] = await shakespeare(firstEnglishDescription);

    if (shakespeareError) {
      return res.send({ error: shakespeareError });
    }
    res.send({
      requestedPokemon,
      shakespeareTranslated,
    });
  } catch (e) {
    res.status(404).send();
  }
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
