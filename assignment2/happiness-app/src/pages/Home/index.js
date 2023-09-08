import './styles.css'
import { Container, Col, Row } from 'react-bootstrap'
import worldIcon from '../../assets/lowpolyworld.png'

const Home = () => {
    return (
        <Container fluid="sm" className='p-5'>
            <Row>
                <Col sm={12} md={6}> 
                    <h2>Welcome to the World Happiness Rankings!</h2>
                    <p>What is happiness? Is it defined as “Feeling or showing pleasure or contentment.” by Oxford English Dictionary. 
                    How one can accurately measure this will always remain a mystery. 
                    </p>
                    <p>That being said, here you will be able to access a plethora of data from the World Happiness Report which ranks overall happiness of a country according to the views of its citizens on a range
                    of happiness measures. These measure include Economy, Family, Health, Freedom, Generosity and Trust.
                    </p>
                </Col>
                <Col sm={12} md={6}>
                    <div className='w-100 d-flex justify-content-center'>
                        <img src={worldIcon} alt='https://www.pngitem.com/middle/obRhbm_low-poly-earth-png-transparent-png/' className='world-icon'/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;