// import React, { useState } from "react";

// export const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   const handleSearch = () => {
//     onSearch(query);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search for boba shops..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Use useEffect to trigger the autocomplete suggestions when the query changes
  useEffect(() => {
    if (query.trim() !== "") {
      fetch(`/api/businesses/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((error) => console.error(error));
    } else {
      setSuggestions([]); // Clear suggestions when the input is empty
    }
  }, [query]);

  // Handle selecting a suggestion
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name); // Set the query to the selected suggestion
    setSuggestions([]); // Clear suggestions
    onSearch(suggestion.name); // Trigger the search
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for boba shops..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <button onClick={() => onSearch(query)}>Search</button> */}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name} · {suggestion.city}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
