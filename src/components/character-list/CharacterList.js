import React from "react";
import CharacterCard from "../character-card/CharacterCard";
import { useHistory } from "react-router-dom";

const CharacterList = ({ characters }) => {
  const history = useHistory();

  return (
    <div className="cursor-pointer px-4 py-2 grid grid-cols-1 grid-flow-row sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {characters.map((ch) => (
        <div key={ch.char_id} className="transition-all duration-550 hover:scale-[1.06] hover:opacity-80" onClick={() => history.push(`/character/${ch.char_id}`)}>
          <CharacterCard character={ch} role={"button"}></CharacterCard>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
