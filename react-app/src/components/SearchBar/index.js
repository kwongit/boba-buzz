import React, { useState } from "react";
import { useHistory } from "react-router";
import "./SearchBar.css";

export const SearchBar = ({ data }) => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleResults = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    const newData = data.filter((value) => {
      return value.name.toLowerCase().includes(searchQuery);
    });

    if (!searchQuery) {
      setFilteredData([]);
    } else {
      setFilteredData(newData);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setQuery("");
  };

  const handleClick = (id) => {
    history.push(`/businesses/${id}`);
  };

  return (
    <div>
      <div className="search-bar-container">
        <div className="search-bar-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <input
          className="search-bar"
          type="text"
          value={query}
          onChange={handleResults}
          placeholder="search for your next boba shop by name"
        ></input>

        <div className="search-bar-icon">
          {query.length !== 0 && (
            <i
              id="search-clear-button"
              className="fa-solid fa-x"
              onClick={clearInput}
            ></i>
          )}
        </div>
      </div>

      {filteredData.length !== 0 && (
        <div className="search-bar-results">
          {filteredData.map((data) => {
            return (
              <div>
                <div
                  className="search-bar-result"
                  onClick={() => handleClick(data.id)}
                >
                  <div className="search-bar-result-img-container">
                    <img
                      className="search-bar-result-img"
                      src={data.image_url}
                      alt={data.name}
                    ></img>
                  </div>
                  <div className="search-bar-result-name-city">
                    {data.name} · {data.city}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
