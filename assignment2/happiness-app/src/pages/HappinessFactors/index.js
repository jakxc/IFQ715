import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Alert from "../../components/Alert";
import CustomSpinner from "../../components/CustomSpinner";
import CustomRow from "../../components/CustomRow";
// import "./styles.css"

const HappinessFactors = ({ apiUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [limit, setLimit] = useState(10);
  const [year, setYear] = useState(2015);
  // const [country, setCountry] = useState("");
  const [factors, setFactors] = useState([]);
  const years = [2015, 2016, 2017, 2018, 2019, 2020];
  const limits = Array.from({length: 15}, (_, i) => {return (i + 1) * 10})

  const getFactors = async(c, y, l) => {
    const url = `${apiUrl}/factors/${y}?limit=${l}${c.length > 0 ? `&country=${c}` : ""}`;
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

  useEffect(() => {
    setIsLoading(true);
    getFactors("", year, limit)
    .then(data => {
      setFactors(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [year, limit]);

  const onYearChanged = (e) => {
    const { value } = e.target;
    setYear(value);
  }

  const onLimitChanged = (e) => {
    const { value } = e.target;
    setLimit(value);
  }

  const yearElements = years.map(el => {
    return <option value={el}>{el}</option>
  })

  const limitElements = limits.map(el => {
    return <option value={el}>{el}</option>
  })

  const factorElements = factors.map((el, i) => {
    const dataElements = [
    el['rank'], el['country'], el['score'], 
    el['economy'], el['family'], el['health'], 
    el['freedom'], el['generosity'], el['trust']
  ]
    return <CustomRow 
      data={dataElements}
      styles={{backgroundColor: `${i % 2 ? "hsl(20, 68%, 62%)" : "hsl(20, 68%, 62%, 0.8)"}`, fontSize: "0.75rem"}}
    />
  })

  return (
      <Container fluid="sm" className="p-4">
         <Link to="/country-rankings" className="fw-bold">View Country Rankings <span><FontAwesomeIcon icon={faArrowRight} style={{color: "#e0885c",}} /></span></Link>
          <h3 className="mt-3">Happiness Factor Rankings</h3>
          { error &&  <Alert type="error" message={message || "Unknown Error"}></Alert>}
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column gap-1">
                <label htmlFor="years">Select a year:</label>
                <select 
                  id="years" 
                  name="years"
                  className="p-2"
                  onChange={onYearChanged}
                >
                    {yearElements}
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
                  data={["Rank", "Country", "Score", "Economy", "Family", "Health", "Freedom", "Generosity", "Trust"]}
                  styles={{backgroundColor: "hsl(20, 68%, 62%)", fontSize: "0.9rem", fontWeight: "bold"}}
                />
                {factorElements}
              </Col>
          }
      </Container>
  )
}

export default HappinessFactors;