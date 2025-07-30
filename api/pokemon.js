const baseURL = "https://pokeapi.co/api/v2";

const generations = {
  "generation-i": 1,
  "generation-ii": 2,
  "generation-iii": 3,
  "generation-iv": 4,
  "generation-v": 5,
  "generation-vi": 6,
  "generation-vii": 7,
  "generation-viii": 8,
  "generation-ix": 9,
};

const formatPokemonName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const formatFormName = (name) => {
  return name
    .split('-')
    .join(' ');
};

const processEvolutionChain = (chain, hierarchy = 0) => {
  const result = [];

  const currentPokemon = {
    name: chain.species.name,
    hierarchy: hierarchy,
    id: chain.species.id,
  };

  result.push(currentPokemon);

  if (chain.evolves_to && chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((evolution) => {
      result.push(...processEvolutionChain(evolution, hierarchy + 1));
    });
  }

  return result;
};

export const getPokemonData = async (name) => {
  try {
    // Priemra consulta al endpoint pokemon para traer los datos base
    const res1 = await fetch(`${baseURL}/pokemon/${name}`);
    if (!res1.ok) throw new Error("Pokémon no encontrado");
    const data1 = await res1.json();

    const name2 = formatPokemonName(data1.name)
    const pokeName = formatFormName(name2);
    const type1 = data1.types[0]?.type.name || null;
    const type2 = data1.types[1]?.type.name || null;
    const height = data1.height / 10;
    const weight = data1.weight / 10;
    const sprite = data1.sprites.front_default;
    const speciesURL = data1.species.url;

    // Segunda consulta al endpoint species para traer datos mas generales
    const res2 = await fetch(speciesURL);
    const data2 = await res2.json();

    const habitat = data2.habitat?.name || null;
    const gen = generations[data2.generation.name];
    const color = data2.color.name;
    const evoChainURL = data2.evolution_chain.url;

    // Tercera consulta al endpoint evolution-chain para ver en que etapa evolutiva se encuentra
    const res3 = await fetch(evoChainURL);
    const data3 = await res3.json();
    const evoChain = processEvolutionChain(data3.chain);
    let evoStage =
      evoChain.find((pokemon) => pokemon.name === pokeName)?.hierarchy || 0;
    evoStage++;

    return {
      name: pokeName,
      sprite,
      type1,
      type2,
      height,
      weight,
      habitat,
      gen,
      color,
      evoStage,
    };
  } catch (e) {
    console.error("Error obteniendo los datos: ", e);
    throw e;
  }
};
