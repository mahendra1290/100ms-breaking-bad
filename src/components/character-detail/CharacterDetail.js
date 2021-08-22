import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios.get(`/characters/${id}`).then((response) => {
      setCharacter(response.data[0]);
      console.log(response.data[0]);
    });
  }, []);

  const { id } = useParams();

  return (
    <div>
      Detail Component
      <h1>{id}</h1>
      <h1>{character.name}</h1>
    </div>
  );
};

export default CharacterDetail;
