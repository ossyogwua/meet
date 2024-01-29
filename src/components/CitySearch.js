import React, { useEffect, useState } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (filteredLocations.length === 0) {
      infoText =
        "We can not find the city you are looking for. Please try another city";
    } else {
      infoText = "";
    }
    //console.error(infoText);
  };

  const handleClicked = (suggestion) => {
    //const value = event.target.textContent;
    setQuery(suggestion);
    setShowSuggestions(false); // to hide the list
    setCurrentCity(suggestion);
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li onClick={() => handleClicked(suggestion)} key={suggestion}>
                {suggestion}
              </li>
            );
          })}
          <li
            key="See all cities"
            onClick={() => handleClicked("See all cities")}
          >
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
