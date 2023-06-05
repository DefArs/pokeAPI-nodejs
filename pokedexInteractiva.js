const fetch = require("isomorphic-fetch");

const baseURL = "https://pokeapi.co/api/v2/";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function buscarPokemonPorNombre(nombre) {
  const url = `${baseURL}pokemon/${nombre}`;
  try {
    const data = await fetchData(url);
    mostrarInformacionPokemon(data);
  } catch (error) {
    console.log("Error: No se pudo encontrar el Pokémon.");
  }
}

function mostrarInformacionPokemon(pokemon) {
  console.log(`numero de pokedex: ${pokemon.id}`);
  console.log(`Nombre: ${pokemon.name}`);
  console.log("Tipos:");
  pokemon.types.forEach((type) => console.log(type.type.name));
  console.log(`Altura: ${pokemon.height}`);
  console.log(`Peso: ${pokemon.weight}`);
}

async function listarTiposPokemon() {
  const url = `${baseURL}type`;
  const data = await fetchData(url);
  console.log("Tipos de Pokémon:");
  data.results.forEach((type) => console.log(type.name));
  
  const tipoPokemon = await getInput("Ingresa el nombre de un tipo de Pokémon: ");
  const tipoUrl = data.results.find((type) => type.name === tipoPokemon)?.url;
  
  if (tipoUrl) {
    const tipoData = await fetchData(tipoUrl);
    const pokemonList = tipoData.pokemon.map((entry) => entry.pokemon);
    console.log(`Pokémon del tipo ${tipoPokemon}:`);
    pokemonList.forEach((pokemon) => console.log(pokemon.name));
  } else {
    console.log(`No se encontró el tipo de Pokémon: ${tipoPokemon}`);
  }
}

async function main() {
  console.log("¡Bienvenido a la Pokédex interactiva!");
  while (true) {
    console.log("\nOpciones:");
    console.log("1. Buscar Pokémon por nombre");
    console.log("2. Listar tipos de Pokémon");
    console.log("3. Salir");
    const opcion = parseInt(await getInput("Selecciona una opción: "));
    
    switch (opcion) {
      case 1:
        const nombrePokemon = await getInput("Ingresa el nombre del Pokémon: ");
        await buscarPokemonPorNombre(nombrePokemon);
        break;
      case 2:
        await listarTiposPokemon();
        break;
      case 3:
        console.log("¡Hasta luego!");
        return;
      default:
        console.log("Opción inválida. Inténtalo de nuevo.");
    }
  }
}

function getInput(prompt) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    readline.question(prompt, (input) => {
      readline.close();
      resolve(input);
    });
  });
}

main();