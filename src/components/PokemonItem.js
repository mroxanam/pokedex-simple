import React, { useEffect, useState } from "react";

export default function PokemonItem({ pokemon, onClick }) {
  const [sprite, setSprite] = useState(null);

  // Cargar sprite (imagen pequeña) desde la API
  useEffect(() => {
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => setSprite(data.sprites.front_default))
      .catch((err) => console.error(err));
  }, [pokemon.url]);

  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        background: "#fff",
        borderRadius: "12px",
        padding: "12px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >
      {sprite ? (
        <img
          src={sprite}
          alt={pokemon.name}
          style={{ width: "80px", height: "80px", marginBottom: "8px" }}
        />
      ) : (
        <div style={{ height: "80px" }}>...</div>
      )}
      <p style={{ textTransform: "capitalize", margin: 0, fontWeight: "bold" }}>
        {pokemon.name}
      </p>
    </div>
  );
}
