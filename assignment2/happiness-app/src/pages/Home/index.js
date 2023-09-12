import { Container, Col, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import earthImg from '../../assets/low-poly-earth.png';
import './styles.css';

const Home = () => {
    return (
        <Container fluid="md" className='p-5'>
            <Row>
                <Col sm={12} md={6} className='my-auto'> 
                    <h2 className='primary-color | fw-bold'>Welcome to the World Happiness Rankings!</h2>
                    <p>What is <span className='fw-bold'>happiness</span>? Is it defined as <span className='fw-bold'>"Feeling or showing pleasure or contentment."</span> by 
                    Oxford English Dictionary. How one can accurately measure this?</p>
                    <p>The World Happiness Report does attempt to do this and convert it to meaningful data. This publication has rankings of national happiness based on respondent 
                        ratings of their own lives and correlations with various (quality of) life factors</p>
                    <p>The rankings of national happiness are achieved using a Cantril ladder survey by the polling company Gallup, Inc. In addition to ranking countries happiness levels,
                        each report has contributing authors that focus on a particular themes (economy, family, health, freedom, generosity, trust). 
                        The data used to rank countries of each of these themes are gathered from various polls and surveys such as the Gallup World Poll and World Values Survey. 
                    </p>
                    <div className='d-flex gap-4'>
                        <NavLink to="/countryRankings"><button className='fw-bold'>Country Rankings</button></NavLink>
                        <NavLink to="/countryRankings"><button className='fw-bold'>Happiness Factors</button></NavLink>
                    </div>
                </Col>
                <Col sm={12} md={6} className='my-auto'>
                    <div className='d-flex justify-content-center'>
                        <img src={earthImg} alt='Earth' className='world-img anim-hover'/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;