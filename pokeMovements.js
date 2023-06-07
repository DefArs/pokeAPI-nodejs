//Obtener los movimientos de un Pokémon:Solicita al usuario que ingrese el nombre de un Pokémon.
//Utiliza el PokeAPI para obtener los movimientos del Pokémon ingresado. Muestra en la consola una lista de los movimientos del Pokémon.

const axios = require("axios"); //solicitud http
const readline = require("readline"); // interactuar con la terminal

//leer los datos que introduce el usuario en la terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//le preguntamos algo al usuario
rl.question("Por favor ingresa el nombre de un Pokemon: ", (pokemonName) => {
  //obtenemos un array que contiene los movimientos del pokemon elegido
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then((response) => {
      const moves = response.data.moves;
      //aqui iteramos los movimientos encontrados
      if (moves.length > 0) {
        console.log(`Los movimientos de ${pokemonName} son:`);
        moves.forEach((move) => {
          console.log(move.move.name);
        });
      } else {
        console.log(
          `No se encontraron movimientos para ${pokemonName}, intentalo de nuevo.`
        );
      }
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    })
    .finally(() => {
      rl.close();
    });
});

//Marilyn M
