import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
  useContext,
} from "react";

// components
import Search from "./Search";
import ThemeContext from "../Context/ThemeContext";

// hooks
import useCharacters from "../hooks/useCharacters";

const initialState = {
  favorites: [],
};

const API = "https://rickandmortyapi.com/api/character";

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "Add to Favorite":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);
  const color = useContext(ThemeContext);

  const characters = useCharacters(API);

  const handleClick = (favorite) => {
    dispatch({ type: "Add to Favorite", payload: favorite });
  };

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  //toLowerCase garantiza que este en minusculas
  //filtrar por lo que se escriba
  // const FilterUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const FilterUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div style={{ color }} className="Characters">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      <div className="Search">
        <input
          type="text"
          value={search}
          ref={searchInput}
          onChange={handleSearch}
        />
      </div>

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      {FilterUsers.map((character) => (
        <div className="item" key={character.id}>
          <h2>{character.name}</h2>
          <button type="button" onClick={() => handleClick(character)}>
            Agregar a Favoritos
          </button>
        </div>
      ))}
    </div>
  );
};

export default Characters;
