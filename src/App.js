import React, { useState, useEffect } from "react";
import ListaPokemon from "./components/ListaPokemon";
import VisorPokemon from "./components/VisorPokemon";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(null);

  // Cargar la lista de Pokémon al montar el componente
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results); // data.results trae { name, url }
      })
      .catch((err) => console.error("Error al obtener pokemons:", err));
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Lista de Pokémon */}
      <ListaPokemon
        pokemons={pokemons}
        onSelect={(url) => setSelectedPokemonUrl(url)}
        style={{
          width: "250px",
          borderRight: "2px solid #ddd",
          padding: "10px",
          overflowY: "auto",
        }}
      />

      {/* Visor de Pokémon */}
      <VisorPokemon
        pokemonUrl={selectedPokemonUrl}
        onBack={() => setSelectedPokemonUrl(null)}  // Botón volver
        style={{ flex: 1, padding: "20px" }}
      />
    </div>
  );
}

export default App;

