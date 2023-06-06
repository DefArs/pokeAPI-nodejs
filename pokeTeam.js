const axios = require('axios');

// Función para obtener un número aleatorio entre un rango dado
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para crear un equipo de Pokémon aleatorio
async function crearEquipoPokemon() {
  const equipo = [];

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const pokemons = response.data.results;

    while (equipo.length < 6) {
      const randomIndex = getRandomNumber(0, pokemons.length - 1);
      const randomPokemon = pokemons[randomIndex];

      if (!equipo.find(pokemon => pokemon.name === randomPokemon.name)) {
        const pokemonResponse = await axios.get(randomPokemon.url);
        const pokemonData = pokemonResponse.data;

        equipo.push({
          name: pokemonData.name,
          number: pokemonData.id
        });
      }
    }

    console.log('Equipo de Pokémon:');
    equipo.forEach(pokemon => {
      console.log(`- Nombre: ${pokemon.name}, Número: ${pokemon.number}`);
    });
  } catch (error) {
    console.log('Error al crear el equipo de Pokémon');
  }
}

// Crear el equipo de Pokémon aleatorio
crearEquipoPokemon();