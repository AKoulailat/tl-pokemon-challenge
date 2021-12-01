const axios = require('axios');

const shakespeare = (pokemonDescription, callback) => {
  const translateUrl = 'https://api.funtranslations.com/translate/shakespeare.json?text=';

  let firstEnglishDescription;
  // Loop over objects and return first object where language is English
  for (let i = 0; i < pokemonDescription.length; i += 1) {
    if (pokemonDescription[i].language.name === 'en') {
      // Assign Pokemon description to variable and break out of loop
      firstEnglishDescription = (JSON.stringify(pokemonDescription[i].flavor_text, null, ' '));
      break;
    }
  }

  // Send request to get Shakespeareon description of Pokemon
  axios.get(`${translateUrl}/${encodeURIComponent(firstEnglishDescription)}`)
    .then((res) => {
      // Clean the string from escaped tags
      const cleanDescription = res.data.contents.translated.replace(/\\n|\\f|\/|\"/g, ' ');
      callback(undefined, cleanDescription.trim());
    })
    .catch((err) => {
      callback(err.message, undefined);
    });
};

module.exports = shakespeare;
