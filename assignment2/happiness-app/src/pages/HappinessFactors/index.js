import { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import CustomRow from "../../components/CustomRow";
// import "./styles.css"

const HappinessFactors = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [countriesAndYears, setCountriesAndYears] = useState([]);
  const displayLimit = 10;
  const years = [2015, 2016, 2017, 2018, 2019, 2020];

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
    .then(res => res.json())
    .then(data => {
          if (data.error) {
            setError(true);
            setMessage(data.message);
          }

          return data;
    })
    .catch((error) => console.log(error));
  }

  const getCountryRankings = async (c = "") => {
    if (c.length > 0) {
      Promise.all(years.map(async (el) => {
        const url = `https://d2h6rsg43otiqk.cloudfront.net/prod/rankings?year=${el}&country=${c}`;
        const token = localStorage.getItem("token");
        
        return fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
          }
        })
      }))
      .then(res => Promise.all(res.map(res => res.json())))
      .then(data => {
        const temp = data.reduce((acc, curr) => {
          if (Array.isArray(curr)) acc.push(...curr);  
          return acc;
        }, [])
          // console.log(temp)
          setRankings(temp);
      })
    } else {
      Promise.all(countriesAndYears.slice(0, displayLimit * years.length).map(async (el) => {
        const [country, year] = el;
        const url = `https://d2h6rsg43otiqk.cloudfront.net/prod/rankings?year=${year}&country=${country}`;
        const token = localStorage.getItem("token");
        
        return fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
          }
        })
      }))
      .then(res => Promise.all(res.map(res => res.json())))
      .then(data => {
        const temp = data.reduce((acc, curr) => {
          if (Array.isArray(curr)) acc.push(...curr);  
          return acc;
        }, [])
          setRankings(temp);
        })
      }
    }

  useEffect(() => {
    setLoading(true);
    getCountries()
    .then(data => {
      setCountries(data);
      setCountriesAndYears(data.reduce((acc, curr) => {
        for (const year of years) {
          acc.push([curr, year]);
        }
    
        return acc;
      }, []));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getCountryRankings(country)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [country, countriesAndYears, displayLimit]);

  const groupDataByCountry = (dataset) => {
    const obj = {};
    for (let i=0; i<dataset.length; i++) {
      const curr = dataset[i];
      if (!obj[curr['country']]) {
        obj[curr['country']] = {[curr['year']]: curr['rank']}
      } else {
        obj[curr['country']][curr['year']] = curr['rank'];
      }
    }

    return obj;
  }

  const onCountryChanged = (e) => {
    const { value } = e.target;
    setCountry(value);
  }

  const optionElements = countries.map(el => {
    return <option value={el}>{el}</option>
  })

  const rankingObj = groupDataByCountry(rankings);
  console.log(rankingObj);
  const rankingElements = Object.keys(rankingObj).map((el, i) => {
    const countryRankings = [el, rankingObj[el][2015] || 'N/A', rankingObj[el][2016] || 'N/A', 
    rankingObj[el][2017] || 'N/A', rankingObj[el][2018] || 'N/A', 
    rankingObj[el][2019] || 'N/A', rankingObj[el][2020] || 'N/A']
    return <CustomRow 
      data={countryRankings}
      styles={i % 2 ? {backgroundColor: "hsl(20, 68%, 62%)"} : {backgroundColor: "hsl(20, 68%, 62%, 0.8)"}}
    />
  })

  return (
      <Container>
          <h3>Happiness Factor Rankings</h3>
          <div className="d-flex flex-column gap-1">
              <label htmlFor="countries">Select a country:</label>
              <select 
                id="country" 
                name="country"
                className="p-2"
                onChange={onCountryChanged}
              >
                  <option value="">None</option>
                  {optionElements}
              </select>
          </div>
          <Col className="mt-5 rounded-3 overflow-hidden">
            {<CustomRow 
              data={["Country", ...years.map(year => `${year} Ranking`)]}
              styles={{backgroundColor: "hsl(20, 68%, 62%)", fontWeight: "bold"}}
            />}
            {rankingElements}
          </Col>
      </Container>
  )
}

export default HappinessFactors;