import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Alert from "../../components/Alert";
import CustomRow from "../../components/CustomRow";
import CustomSpinner from "../../components/CustomSpinner";

import "./styles.css"

const CountryRankings = ({ apiUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [countriesAndYears, setCountriesAndYears] = useState([]);
  const [limit, setLimit] = useState(10);
  const years = [2015, 2016, 2017, 2018, 2019, 2020];
  const limits = Array.from({length: 5}, (_, i) => {return (i + 1) * 10})

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

  const getCountries = async() => {
    const url = `${apiUrl}/countries`;
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
        const url = `${apiUrl}/rankings?year=${el}&country=${c}`;
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
        if (data.error) {
          setError(true);
          setMessage(data.message);
        }

        const temp = groupDataByCountry(data.reduce((acc, curr) => {
          if (Array.isArray(curr)) acc.push(...curr);  
          return acc;
        }, []));
          // console.log(temp)
          setRankings(temp);
      })
    } else {
      Promise.all(countriesAndYears.slice(0, limit * years.length).map(async (el) => {
        const [country, year] = el;
        const url = `${apiUrl}/rankings?year=${year}&country=${country}`;
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
        if (data.error) {
          setError(true);
          setMessage(data.message);
        }

        const temp = groupDataByCountry(data.reduce((acc, curr) => {
          if (Array.isArray(curr)) acc.push(...curr);  
          return acc;
        }, []));
          setRankings(temp);
        })
      }
    }

  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCountryRankings(country)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [country, countriesAndYears, limit]);

  const onCountryChanged = (e) => {
    const { value } = e.target;
    setCountry(value);
  }

  const onLimitChanged = (e) => {
    const { value } = e.target;
    setLimit(value);
  }

  const countryElements = countries.map(el => {
    return <option value={el}>{el}</option>
  })

  const limitElements = limits.map(el => {
    return <option value={el}>{el}</option>
  })

  const rankingElements = Object.keys(rankings).map((el, i) => {
    const countryRankings = [el, rankings[el][2015] || 'N/A', rankings[el][2016] || 'N/A', 
    rankings[el][2017] || 'N/A', rankings[el][2018] || 'N/A', 
    rankings[el][2019] || 'N/A', rankings[el][2020] || 'N/A']
    return <CustomRow 
      data={countryRankings}
      styles={{backgroundColor: `${i % 2 ? "hsl(20, 68%, 62%)" : "hsl(20, 68%, 62%, 0.8)"}`, fontSize: "0.75rem"}}
    />
  })

  return (
      <Container fluid="sm" className="p-4">
        <Link to="/happiness-factors" className="fw-bold">View Happiness Factor Rankings <span><FontAwesomeIcon icon={faArrowRight} style={{color: "#e0885c",}} /></span></Link>
        <h3 className="mt-3">Country Rankings</h3>
        { error &&  <Alert type="error" message={message || "Unknown Error"}></Alert>}
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column gap-1">
              <label htmlFor="countries">Select a country:</label>
              <select 
                id="country" 
                name="country"
                className="p-2"
                onChange={onCountryChanged}
              >
                  <option value="">None</option>
                  {countryElements}
              </select>
          </div>
          <div className="d-flex flex-column gap-1">
                  <label htmlFor="limits">Limit results to:</label>
                  <select 
                    id="limits" 
                    name="limit"
                    className="p-2"
                    onChange={onLimitChanged}
                  >
                      {limitElements}
                  </select>
          </div>
        </div>
        {isLoading
        ? <div className="vh-100 d-flex justify-content-center align-items-center"><CustomSpinner message="Loading, please wait..."/></div>
        : <Col className="mt-5 rounded-3 overflow-hidden">
            <CustomRow 
              data={["Country", ...years.map(year => `${year} Ranking`)]}
              styles={{backgroundColor: "hsl(20, 68%, 62%)", fontSize: "0.9rem", fontWeight: "bold"}}
            />
            {rankingElements}
          </Col>}
      </Container>
  )
}

export default CountryRankings;