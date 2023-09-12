import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CustomRow from "../../components/CustomRow";
import "./styles.css"

const CountryRankings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const optionElements = [];

  const getCountries = async() => {
    const API_KEY = "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV";
    const url = "https://d2h6rsg43otiqk.cloudfront.net/prod/countries"
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
      }
    })
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    setLoading(true);
    getCountries()
    .then(data => setCountries(data))
    .then(console.log(countries))
    .catch((error) => {
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const getRankingsByCountry = (query) => {
      
  }

    return (
        <Container>
            <h3>Country Rankings</h3>
            <div>
                <label for="cars">Select a country:</label>
                <select id="country" name="country">
                   {optionElements}
                </select>
            </div>
            <div className="d-flex flex-column rounded-3 overflow-hidden">
              <CustomRow data={["Rank", "Country", "Score", "Economy", "Family", "Health", "Freedom", "Generosity", "Trust"]}/>
            </div>
        </Container>
    )
}

export default CountryRankings;