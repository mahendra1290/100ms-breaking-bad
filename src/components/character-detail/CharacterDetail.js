import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
  const [character, setCharacter] = useState({});
  const [quotes, setQuotes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/characters/${id}`).then((response) => {
      const characterData = response.data[0];
      setCharacter(characterData);
      axios.get(`quote/?author=${characterData.name}`).then((response) => {
        setQuotes(response.data);
      });
    });
  }, [id]);

  return (
    <div className="p-4 rounded-md md:max-w-xl mx-auto bg-gray-900 mt-2">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-[20rem] mb-4 sm:m-0 sm:mr-4">
          <img className="rounded-md" src={character.img} alt={character.name}></img>
        </div>
        <div className="flex flex-col justify-between">
          <p>Name</p>
          <h1 className="text-xl">{character.name}</h1>

          {character.birthday !== "Unknown" ? (
            <>
              <p>Birth Day</p>
              <h1>{character.birthday}</h1>
            </>
          ) : null}

          <p>Occupation</p>
          <h1>{character.occupation}</h1>

          <p>Nickname</p>
          <h1>{character.nickname}</h1>

          <p>Portrayed</p>
          <h1>{character.portrayed}</h1>

          <p>Status</p>
          <h1>{character.status}</h1>

          <p>Appeared In Seasons</p>
          <h1>
            {character?.appearance?.map((season) => (
              <span key={season} className="mr-3">
                {season}
              </span>
            ))}
          </h1>
        </div>
      </div>
      {quotes.length ? (
        <>
          <h1 className="text-lg mt-2">Quotes</h1>
          {quotes.map((item) => (
            <blockquote key={item.quote_id}>
              <p className="py-2 italic font-serif text-gray-200 font-bold">"{item.quote}"</p>
            </blockquote>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default CharacterDetail;
