const axios = require('axios');

async function buscarPokemon(nombre) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    const pokemon = response.data;

    console.log('Nombre:', pokemon.name);
    console.log('Tipo:', pokemon.types.map(type => type.type.name).join(', '));
    console.log('Altura:', pokemon.height);
    console.log('Peso:', pokemon.weight);
  } catch (error) {
    console.log('No se encontró el Pokémon');
  }
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Ingresa el nombre de un Pokémon: ', (nombre) => {
  buscarPokemon(nombre.toLowerCase());
  readline.close();
});