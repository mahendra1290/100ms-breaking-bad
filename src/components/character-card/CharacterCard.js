import React from "react";
import "./CharacterCard.css";

const CharacterCard = ({ character }) => {
  return (
    <div className="flex flex-col md:flex-row items-center h-full shadow-md rounded-md bg-gray-900 p-4 gap-4">
      <div className="border-2 border-gray-300 overflow-hidden min-w-[12rem] min-h-[12rem] max-h-[12rem] max-w-[12rem] rounded-full ">
        <img className="object-contain" src={character.img} alt={`${character.name}'s`}></img>
      </div>
      <div className="w-full">
        <p>Name</p>
        <h1 className="text-xl">{character.name}</h1>

        <p>Occupation</p>
        <h1>{character.occupation}</h1>

        <p>Birth Date</p>
        <h1>{character.birthday}</h1>

        <p>Status</p>
        <h1>{character.status}</h1>
      </div>
    </div>
  );
};

export default CharacterCard;
