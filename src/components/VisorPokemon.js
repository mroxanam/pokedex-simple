import React, { useState, useEffect } from "react";

// Degradados por tipo de Pokémon
const typeGradients = {
  fire: ["#F08030", "#FFD1A4"],
  grass: ["#78C850", "#B0E57C"],
  water: ["#6890F0", "#A0D4FF"],
  electric: ["#F8D030", "#FFF59D"],
  psychic: ["#F85888", "#FFA6C9"],
  ice: ["#98D8D8", "#D4F0F0"],
  dragon: ["#7038F8", "#B8A9FF"],
  dark: ["#705848", "#A38F7C"],
  fairy: ["#EE99AC", "#FFD4E0"],
  normal: ["#A8A878", "#E0E0B0"],
  fighting: ["#C03028", "#FF9A90"],
  flying: ["#A890F0", "#D3C9FF"],
  poison: ["#A040A0", "#E5A3E5"],
  ground: ["#E0C068", "#FFF0B0"],
  rock: ["#B8A038", "#E6D68F"],
  bug: ["#A8B820", "#D7E382"],
  ghost: ["#705898", "#A293C7"],
  steel: ["#B8B8D0", "#E0E0F0"],
};

function VisorPokemon({ pokemonUrl, onBack }) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [hoverInicio, setHoverInicio] = useState(false);

  useEffect(() => {
    if (!pokemonUrl) {
      setPokemon(null);
      setSpecies(null);
      return;
    }

    fetch(pokemonUrl)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        return fetch(data.species.url);
      })
      .then((res) => res.json())
      .then((speciesData) => setSpecies(speciesData))
      .catch((err) => console.error("Error al obtener detalles:", err));
  }, [pokemonUrl]);

  const descripcion =
    species?.flavor_text_entries?.find((entry) => entry.language.name === "es")
      ?.flavor_text.replace(/\n|\f/g, " ") || "Sin descripción.";

  const handleClick = () => {
    if (!pokemonUrl) {
      alert("Debes seleccionar un Pokémon para ver más información.");
    }
  };

  // Degradado según tipo o neutro al inicio
  const mainType = pokemon?.types[0]?.type.name;
  const gradientColors = pokemon
    ? typeGradients[mainType] || ["#f4ba46ff", "#fa931dff"]
    : ["#f5c854ff", "#f6a533ff"]; // degradado inicial suave
  const background = `linear-gradient(160deg, ${gradientColors[0]} 40%, ${gradientColors[1]} 100%)`;

  // Color para los cuadros ligeramente más claro
  const boxColor = pokemon
    ? `rgba(${parseInt(gradientColors[0].slice(1, 3), 16)}, ${parseInt(
        gradientColors[0].slice(3, 5),
        16
      )}, ${parseInt(gradientColors[0].slice(5, 7), 16)}, 0.9)`
    : "rgba(255,255,255,0.95)";

  const cuadroStyle = {
    background: boxColor,
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    maxWidth: "600px",
    marginTop: "5px",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 15px",
    background: "#6d757bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  return (
    <div
      onClick={handleClick}
      style={{
        flex: 1,
        padding: "20px",
        textAlign: "center",
        background: background,
        borderRadius: "15px",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.5s ease",
      }}
       >
         {!pokemon ? (
         <div
         style={{
          ...cuadroStyle,
          textAlign: "center",
         fontWeight: "bold",         // texto más grueso
          color: "#000000",           // texto negro
           textShadow: "1px 1px 2px rgba(0,0,0,0.3)", // sombra para mejor legibilidad
           transform: hoverInicio ? "translateY(-5px)" : "translateY(0)",
            boxShadow: hoverInicio
        ? "0 12px 28px rgba(0,0,0,0.25)"
        : "0 8px 20px rgba(0,0,0,0.2)",
    }}
    onMouseEnter={() => setHoverInicio(true)}
        onMouseLeave={() => setHoverInicio(false)}
          >
           Seleccionar un Pokémon para ver más información.
            </div>
            ) : (
        <>
          <h2 style={{ textTransform: "capitalize", marginBottom: "10px" }}>
            {pokemon.name}
          </h2>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            style={{ width: "200px", marginBottom: "15px" }}
          />
          <p
            style={{
              fontStyle: "italic",
              background: "rgba(255, 255, 255, 0.6)",
              padding: "8px",
              borderRadius: "10px",
              maxWidth: "400px",
              marginBottom: "15px",
              color: "#222",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            {descripcion}
          </p>

          <div
            style={{cuadroStyle,
             fontWeight: "bold", // hace el texto más grueso
                color: "#000000",   // texto negro
                textAlign: "center",
            }}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
              })
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(0)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              })
            }
          >
            <p>
              <strong>Tipos:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p>
              <strong>Altura:</strong> {pokemon.height} | <strong>Peso:</strong> {pokemon.weight}
            </p>
            <p>
              <strong>Habilidades:</strong>{" "}
              {pokemon.abilities
                .map((h) =>
                  h.ability.name
                    .replace("overgrow", "Espesura")
                    .replace("chlorophyll", "Clorofila")
                    .replace("torrent", "Torrente")
                    .replace("rain-dish", "Cura Lluvia")
                )
                .join(", ")}
            </p>
          </div>

          <button
            onClick={onBack}
            style={buttonStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(-3px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              })
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "translateY(0)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              })
            }
          >
            Volver
          </button>
        </>
      )}
    </div>
  );
}

export default VisorPokemon;
