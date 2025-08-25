import React from "react";
import PokemonItem from "./PokemonItem";

export default function ListaPokemon({ pokemons, onSelect, style }) {
  return (
    <div style={{ ...style }}>
      <h2
        style={{
          textAlign: "center",
          color: "#e3350d",
          marginBottom: "16px",
        }}
      >
        Lista de Pokémon
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "12px",
        }}
      >
        {pokemons.map((p) => (
          <PokemonItem key={p.name} pokemon={p} onClick={() => onSelect(p.url)} />
        ))}
      </div>
    </div>
  );
}
