const axios = require('axios');

const pokemon = async (pokemonName, callback) => {
  const pokeUrl = 'https://pokeapi.co/api/v2/pokemon';

  // Make first request to get species URL from name
  const speciesUrl = await axios.get(`${pokeUrl}/${pokemonName}`)
    .then((res) => res.data.species.url)
    .catch((err) => {
      callback(err.message, undefined);
    });
  // Make second request to get the Pokemon's description array of objects
  await axios.get(speciesUrl)
    .then((res) => {
      callback(undefined, res.data.flavor_text_entries);
    })
    .catch((err) => {
      callback(err.message, undefined);
    });
};

module.exports = pokemon;
