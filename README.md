# tl-pokemon-challenge

Challenge 2 - Truelayer 2nd stage

A simple application to get a Pokemon name from a user and return the name and a shakespearean description of the Pokemon.

## Instruction
### Dependencies

You will need to have docker installed, you can find out how to do this here: https://docs.docker.com/get-docker/


### How to run the application

* Pull this repository to your machine.
* Open up Terminal/CMD and naviagte to the file
  * this should be where the Dockerfile is.
* Execute `docker run -p 3000:3000 node-poke-challenge`.

### How to stop the application

* Open up another terminal/CMD.
* Execute `docker ps`.
* Copy the "CONTAINER ID" value.
* Execute `docker stop <container_id>` where <container_id> is the value you copied.

## How to use

You can use this applications in two ways:

### As an API

By making a GET request to http://localhost:3000/pokemon/<pokemon_name>, where <pokemon_name> is the Pokemon name you are getting the description for. 
You will be returned an JSON with 2 keys, "name" and "description".

Example:
```` 
{
  "requestedPokemon": "charizard",
  "shakespeareTranslated": "spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally."
}
```` 

### By using the UI

Go to http://localhost:3000/ and enter the Pokemon name in the search bar and click "Search".
The name and description will populate below the search bar, unless an error has occured, then a error message will display.


## You found a bug?

Do let me know and I will implement a solution.

