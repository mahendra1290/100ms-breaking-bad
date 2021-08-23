import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

import "./App.css";
import CharacterDetail from "./components/character-detail/CharacterDetail";
import CharacterList from "./components/character-list/CharacterList";
import Filter from "./components/filter/Filter";
import { useDebounce } from "./customHooks/debounceHook";

function App() {
  const [characters, setCharacters] = useState([]);

  //pagination with ?limit=characterPerPage&offset=offset
  const [charactersPerPage] = useState(10);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const resetData = () => {
    setRefresh((refresh) => !refresh);
  };

  const filterByName = (searchName) => {
    if (searchName && searchName !== "") {
      axios.get(`characters?name=${searchName}`).then((response) => {
        setCharacters(response.data);
      });
    } else {
      resetData();
    }
  };

  const searchNameChange = useDebounce(filterByName, 400);

  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category !== "unset") {
      setLoading(true);
      axios.get(`characters?category=${category}`).then((response) => {
        setCharacters(response.data);
        setLoading(false);
      });
    } else {
      resetData();
    }
  }, [category]);

  useEffect(() => {
    setLoading(true);
    axios.get(`characters?limit=${charactersPerPage}&offset=${offset}`).then((response) => {
      setCharacters(response.data);
      setLoading(false);
    });
  }, [refresh, offset, charactersPerPage]);

  const handleNameFilter = (value) => {
    searchNameChange(value);
  };

  const handleCategoryFilter = (value) => {
    setCategory(value);
  };

  const onNextPageClick = () => {
    if (characters.length > 0) {
      setOffset((offset) => offset + charactersPerPage);
      setPage((page) => page + 1);
    }
  };

  const onPrevPageClick = () => {
    if (offset > 0) {
      setOffset((offset) => offset - charactersPerPage);
      setPage((page) => page - 1);
    }
  };

  return (
    <Router>
      <div className="App bg-gray-700 min-h-screen">
        <nav className="w-full px-4 py-6 bg-gray-900 ">
          <p className="text-2xl font-bold">
            <Link to="/">100ms Breaking Bad</Link>
          </p>
        </nav>
        <Switch>
          <Route path="/character/:id">
            <CharacterDetail />
          </Route>

          <Route path="/">
            <div className="flex flex-col justify-items-stretch">
              <Filter nameChange={handleNameFilter} categoryChange={handleCategoryFilter}></Filter>
              <div className={loading ? "opacity-40 relative" : ""}>
                <CharacterList characters={characters}></CharacterList>
              </div>

              <div className="text-white flex justify-center items-center">
                <button onClick={onPrevPageClick}>Prev</button>
                <p className="text-lg px-4 py-2">{page}</p>
                <button onClick={onNextPageClick}>Next</button>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
