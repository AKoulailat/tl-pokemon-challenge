const pokemonForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

pokemonForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Use pokemon route to get description to display 
  fetch(`/pokemon/${search.value}`).then((response) => {
    response.json().then((data) => {
      messageOne.textContent = '';
      messageTwo.textContent = '';
      if (data.error) {
        // Display error if error occurs
        messageOne.textContent = `Error${data.error}`;
      } else {
        // Otherwise display the Pokemon name and description
        messageOne.textContent = `Name: ${data.requestedPokemon}`;
        messageTwo.textContent = `Description: ${data.shakespeareTranslated}`;
      }
    });
  });
});
