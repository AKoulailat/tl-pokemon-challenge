const axios = require('axios');

const shakespeare = async (pokemonDescription) => {
  const translateUrl = 'https://api.funtranslations.com/translate/shakespeare.json?text=';

  try {
    // Request to obtain species URL from inputted name
    const translatedDescritpion = await axios.get(`${translateUrl}/${pokemonDescription}`);
    // Request to obtain Pokemon description array
    const cleanDescription = translatedDescritpion.data.contents.translated.replace(/\\n|\\f|\/|\"/g, ' ');
    return [undefined, cleanDescription.trim()];
  } catch (e) {
    return [e.response.statusText, undefined];
  }
};

module.exports = shakespeare;
