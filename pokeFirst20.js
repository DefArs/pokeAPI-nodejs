//Listar los primeros 20 Pokémon: Utiliza el PokeAPI para obtener los primeros 20 Pokémon. Muestra en la consola el nombre y número de cada Pokémon.

//Importación de Axios
const axios = require("axios");

// Con "\/(\d+)\/" buscamos si hay numeros en la URL para asi leer los datos, en caso de que no se encuentre:

function getPokemonNumber(url) {
  const matches = url.match(/\/(\d+)\//);
  if (matches && matches.length > 1) {
    return matches[1];
  }
  return "Dato desconocido";
}

//con limit=20 nos devuelve los datos de los primeros 20 pokemons
axios
  .get("https://pokeapi.co/api/v2/pokemon?limit=20")
  //si funciona correctamente, con .then ejecutamos y recibimos la respuesta en "response"
  .then((response) => {
    const pokemons = response.data.results;
    //con "forEach" itero entre cada resultado de pokemons para que muestre el nombre y el numero
    pokemons.forEach((pokemon) => {
      console.log(
        // con "getPokemonNumber" anteriormente obtenemos el numero
        `Pokemon: ${pokemon.name} y su numero es el: ${getPokemonNumber(
          pokemon.url
        )}`
      );
    });
  })
  .catch((error) => {
    console.log("Error al obtener los datos de los Pokemon:", error);
  });

//Marilyn M
