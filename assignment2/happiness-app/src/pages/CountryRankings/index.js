import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CustomRow from "../../components/CustomRow";
import "./styles.css"

const CountryRankings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [rankings, setRankings] = useState([]);
  const years = ["2015", "2016", "2017", "2018", "2019", "2020"];

  const getCountries = async() => {
    const API_URL = "https://d2h6rsg43otiqk.cloudfront.net/prod"
    const url = `${API_URL}/countries`;
    const token = localStorage.getItem("token");
    
    return fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
     }
    })
    .then((res) => res.json())
    .then(data => {
          if (data.error) {
            setError(true);
            setMessage(data.message);
          }

          return data;
    })
    .catch((error) => console.log(error));
  }

  const setCountryRankings = async () => {
    const url = 'https://d2h6rsg43otiqk.cloudfront.net/prod/rankings?year=2020&country=Australia';
    const token = localStorage.getItem("token");

    return fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
      }
    })
    .then((res) => res.json())
    .then(data => {
      if (data.error) {
        setError(true);
        setMessage(data.message);
      }

      setRankings(data);
    })
    .catch((error) => console.log(error));
  }

  const getFactors = async (e) => {
    // e.preventDefault();

    const API_URL = "https://d2h6rsg43otiqk.cloudfront.net/prod";

    const url = `${API_URL}/factors/2020`;
    const token = localStorage.getItem("token")

    return fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
     }
    })
    .then((res) =>
      res.json().then(data => {
        console.log(data);
      })
    )
    .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    getCountries()
    .then(data => setCountries(data))
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setCountryRankings()
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);


  const getRankingsByCountry = (query) => {
      
  }

  const optionElements = countries.map(country => {
    return <option value={country}>{country}</option>
  })

  const rankingElements = rankings.map(el => {
    return <div>{el.country}({el.year}): {el.rank}</div>
  })

  return (
      <Container>
          <h3>Country Rankings</h3>
          <div className="d-flex flex-column gap-1">
              <label htmlFor="countries">Select a country:</label>
              <select 
                id="country" 
                name="country"
                className="p-2"
              >
                  <option value="">None</option>
                  {optionElements}
              </select>
          </div>
          <div className="d-flex flex-column overflow-hidden mt-5">
            {<CustomRow data={["Country", ...years.map(year => `${year} Ranking`)]}/>}
            {rankingElements}
          </div>
      </Container>
  )
}

export default CountryRankings;