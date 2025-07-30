import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { getPokemonData } from "./api/pokemon";
import { useEffect, useState } from "react";

export default function App() {
  const [pokemon, setPokemon] = useState();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageTimeout, setImageTimeout] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const number = Math.floor(Math.random() * 1025) + 1;
      try {
        const pokemonData = await getPokemonData(number);
        console.log("Pokemon data:", pokemonData);
        console.log("Sprite URL:", pokemonData.sprite);
        setPokemon(pokemonData);
        setImageError(false);
        setImageLoading(true);

        if (imageTimeout) {
          clearTimeout(imageTimeout);
        }

        const timeout = setTimeout(() => {
          console.log("Image loading timeout - trying again");
          setImageError(false);
          setImageLoading(true);
        }, 15000);
        setImageTimeout(timeout);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      }
    };

    fetchPokemon();

    return () => {
      if (imageTimeout) {
        clearTimeout(imageTimeout);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {pokemon && (
        <>
          {pokemon.sprite ? (
            <>
              {imageLoading && (
                <View style={styles.loadingContainer}>
                  <Text>Cargando imagen...</Text>
                </View>
              )}
              <Image
                source={{
                  uri: pokemon.sprite,
                  cache: "reload",
                }}
                style={[
                  styles.pokemonImage,
                  imageLoading && styles.hiddenImage,
                ]}
                resizeMode="contain"
                onError={(error) => {
                  setImageError(true);
                  setImageLoading(false);
                }}
                onLoad={() => {
                  setImageError(false);
                  setImageLoading(false);
                  if (imageTimeout) {
                    clearTimeout(imageTimeout);
                    setImageTimeout(null);
                  }
                }}
              />
            </>
          ) : (
            <View style={styles.placeholderImage}>
              <Text>Sprite no disponible</Text>
            </View>
          )}
          <Text>Name: {pokemon.name}</Text>
          <Text>Type 1: {pokemon.type1}</Text>
          <Text>Type 2: {pokemon.type2}</Text>
          <Text>Height: {pokemon.height} m</Text>
          <Text>Weight: {pokemon.weight} kg</Text>
          <Text>Habitat: {pokemon.habitat}</Text>
          <Text>Generation: {pokemon.gen}</Text>
          <Text>Color: {pokemon.color}</Text>
          <Text>Evolution Stage: {pokemon.evoStage}</Text>
        </>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  placeholderImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  loadingContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  hiddenImage: {
    opacity: 0,
  },
});