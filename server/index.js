import express from "express";
import cors from "cors";

// Initialize the express app
const app = express();
// Midleware
app.use(cors());
app.use(express.json());

// Make some countries
import Chance from "chance";
const chance = new Chance();

const countries = [...Array(10).keys()].map((id) => {
  return {
    id,
    name: chance.country({ full: true }),
    location: chance.address(),
  };
});

// Endpoint to search for animals.
app.get("", (req, res) => {
  // Filter results by query
  const q = req.query.q?.toLowerCase() || "";
  const results = countries.filter((country) =>
    country.name.toLocaleLowerCase().includes(q)
  );

  res.send(results);
});

app.listen(8080, () => console.log("Listening on port http://localhost:8080"));
