import { GAME_CONSTANTS } from '../constants/gameConstants';

// Formatear nombre de Pokémon para mostrar
export const formatPokemonName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
};

// Cargar lista de todos los Pokémon
export const loadAllPokemon = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${GAME_CONSTANTS.TOTAL_POKEMON}`);
    const data = await response.json();
    const pokemonList = data.results.map((pokemon, index) => ({
      id: index + 1,
      name: formatPokemonName(pokemon.name),
      originalName: pokemon.name
    }));
    return pokemonList;
  } catch (error) {
    console.error("Error cargando lista de Pokémon:", error);
    return [];
  }
};

// Generar Pokémon oculto aleatorio
export const generateHiddenPokemon = async (getPokemonData) => {
  try {
    const number = Math.floor(Math.random() * GAME_CONSTANTS.TOTAL_POKEMON) + 1;
    const pokemonData = await getPokemonData(number);
    console.log("Pokémon oculto:", pokemonData.name);
    return pokemonData;
  } catch (error) {
    console.error("Error generando Pokémon oculto:", error);
    throw error;
  }
};

// Filtrar sugerencias basadas en el texto ingresado
export const filterSuggestions = (text, allPokemon) => {
  if (text.length < GAME_CONSTANTS.MIN_SUGGESTION_LENGTH) {
    return [];
  }

  return allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(text.toLowerCase())
  ).slice(0, GAME_CONSTANTS.MAX_SUGGESTIONS);
};

// Buscar Pokémon en la lista por nombre
export const findPokemonByName = (searchName, allPokemon) => {
  return allPokemon.find(p => 
    p.name.toLowerCase() === searchName.toLowerCase() ||
    p.originalName.toLowerCase() === searchName.toLowerCase()
  );
}; 