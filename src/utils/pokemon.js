const axios = require('axios');

const pokemon = async (pokemonName) => {
  const pokeUrl = 'https://pokeapi.co/api/v2/pokemon';

  try {
    const speciesUrl = await axios.get(`${pokeUrl}/${pokemonName}`);
    const speciesDescription = await axios.get(speciesUrl.data.species.url);
    return [undefined, speciesDescription.data.flavor_text_entries];
  } catch (e) {
    return [`${pokemonName} ${e.response.statusText}`, undefined];
  }
};

module.exports = pokemon;
