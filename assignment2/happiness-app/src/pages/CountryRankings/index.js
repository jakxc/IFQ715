import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Alert from "../../components/Alert";
import CustomRow from "../../components/CustomRow";
import CustomSpinner from "../../components/CustomSpinner";

const CountryRankings = ({ apiUrl, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [page, setPage] = useState('0-20');
  const years = [2015, 2016, 2017, 2018, 2019, 2020];
  const pagination = Array.from({ length : 9 }, (_, i) => {return { 'lower': i === 0 ? 0 : i * 20, 'upper': (i + 1) * 20 < countries.length ? (i + 1) * 20 : countries.length}})
  
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
    const token = localStorage.getItem("token");
    if (c.length > 0) {
        const url = `${apiUrl}/rankings?country=${c}`;
        
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
      } else {
        const url = `${apiUrl}/rankings`;
        
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
          return data;
        })
      }
    }

  useEffect(() => {
    setIsLoading(true);
    getCountries()
    .then(data => {
      if (data.error) {
        setError(true);
        setMessage(data.message);
      } else {
        setCountries(data);
      }
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
    .then(data => {
      if (data.error) {
        setError(true);
        setMessage(data.message);
      } else {
        const sortedData = data.sort((a,b) => 
        a['country'] === b['country'] 
        ? 0 
        : a['country'] > b['country'] ? 1 : -1)
        const temp = groupDataByCountry(sortedData);
        setRankings(temp);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [country]);

  const onCountryChanged = (e) => {
    const { value } = e.target;
    setCountry(value);
  }

  const onPageChanged = (e) => {
    const { value } = e.target;
    setPage(value);
  }

  const countryElements = countries.map(el => {
    return <option value={el} style={{color: "hsla(0, 0%, 11%, 0.75)"}}>{el}</option>
  })

  const pageElements = pagination.map(el => {
    return <option value={`${el['lower']}-${el['upper']}`} style={{color: "hsla(0, 0%, 11%, 0.75)"}}>{`${el['lower'] + 1}-${el['upper']}`}</option>
  })

  const rankingsWithinPage = Object.keys(rankings).length > 1 
  ? Object.keys(rankings).slice(page.split('-')[0], page.split('-')[1]) 
  :  Object.keys(rankings);

  const rankingElements = rankingsWithinPage.map((el, i) => {
    const countryRankings = [el, rankings[el][2015] || 'N/A', rankings[el][2016] || 'N/A', 
    rankings[el][2017] || 'N/A', rankings[el][2018] || 'N/A', 
    rankings[el][2019] || 'N/A', rankings[el][2020] || 'N/A']
    return <CustomRow 
      data={countryRankings}
      styles={{backgroundColor: `${i % 2 ? "hsl(20, 68%, 62%)" : "hsl(20, 68%, 62%, 0.8)"}`, fontSize: "0.75rem"}}
    />
  })

  return (
      <Container fluid="sm" className="px-3 my-5">
        <Link to="/happiness-factors" className="fw-bold">View Happiness Factor Rankings <span><FontAwesomeIcon icon={faArrowRight} style={{color: "#e0885c",}} /></span></Link>
        <h3 className="mt-3 fw-bold">Country Rankings</h3>
        { isLoggedIn 
          ? <>
          { error &&  <Alert type="error" message={message || "Unknown Error"} onClose={() => setMessage("")}></Alert>}
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column gap-1">
                <label htmlFor="countries">Select a country:</label>
                <select 
                  id="country" 
                  name="country"
                  className="p-2"
                  onChange={onCountryChanged}
                >
                    <option value="" style={{color: "hsla(0, 0%, 11%, 0.75)"}}>None</option>
                    {countryElements}
                </select>
            </div>
            <div className="d-flex flex-column gap-1">
                    <label htmlFor="pages">Select results from:</label>
                    <select 
                      id="pages" 
                      name="page"
                      className="p-2"
                      onChange={onPageChanged}
                    >
                        {pageElements}
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
          </>
          : <p>You have to be logged in to view rankings. Click <Link to="/login" className="fw-bold">here</Link> to login if you already haven an account
          or register <Link to="/register" className="fw-bold">here</Link></p>
          }
      </Container>
  )
}

export default CountryRankings;