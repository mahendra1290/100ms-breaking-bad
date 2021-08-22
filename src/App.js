import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import CharacterDetail from "./components/character-detail/CharacterDetail";
import CharacterList from "./components/character-list/CharacterList";
import Filter from "./components/filter/Filter";

function App() {
  const [characters, setCharacters] = useState([]);

  const [searchName, setSearchName] = useState("");

  const [page, setPage] = useState(0);

  const [categories, setCategories] = useState("");

  const CHARACTERS_CACHE = "characters";

  useEffect(() => {
    if (localStorage.getItem(CHARACTERS_CACHE)) {
      setCharacters(JSON.parse(localStorage.getItem(CHARACTERS_CACHE)));
    } else {
      axios.get("characters").then((response) => {
        localStorage.setItem(CHARACTERS_CACHE, JSON.stringify(response.data));
        setCharacters(response.data);
      });
    }
  }, []);

  const nameChange = (value) => {
    setSearchName(value.toLowerCase());
  };

  const onNextPageClick = () => {
    if (page < characters.length / 10 - 1) {
      setPage((page) => page + 1);
    }
  };

  const onPrevPageClick = () => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  };

  return (
    <Router>
      <div className="App bg-gray-700">
        <nav className="w-full px-4 py-4 bg-gray-900 ">
          <p className="text-2xl font-bold">100ms Breaking Bad</p>
        </nav>
        <Switch>
          <Route path="/character/:id">
            <CharacterDetail />
          </Route>
          <Route path="/">
            <div className="flex flex-col justify-items-stretch">
              <Filter nameChange={nameChange}></Filter>
              <div className="flex justify-center items-center">
                <button onClick={onPrevPageClick}>Prev</button>
                <p className="px-4 py-2">{page}</p>
                <button onClick={onNextPageClick}>Next</button>
              </div>
              <CharacterList characters={characters.slice(page * 10, page * 10 + 10).filter((ch) => ch.name.toLowerCase().includes(searchName) || searchName === "")}></CharacterList>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
