import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Country({ name, location }) {
  return (
    <div className="card-country m1">
      <strong>{name}</strong> , {location}
    </div>
  );
}

function useCountries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080/?" + new URLSearchParams({ q })
    );
    const data = await response.json();
    setCountries(data);

    localStorage.setItem("lastQuery", q);
  };

  return { search, countries };
}

function App() {
  const { search, countries } = useCountries();

  return (
    <div>
      <h2>Country Finder</h2>
      <input
        className="textInput"
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <div className="flex-row">
        {countries.map((country) => {
          return (
            <Country
              key={country.id}
              name={country.name}
              location={country.location}
            />
          );
        })}
      </div>

      {countries.length === 0 && (
        <div>
          <p>No countries found.</p>
        </div>
      )}
    </div>
  );
}

export default App;
