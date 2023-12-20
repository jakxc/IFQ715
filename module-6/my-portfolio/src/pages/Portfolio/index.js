import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import ProjectCard from "../../components/Card";

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProjects = async () => {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const docsData = querySnapshot.docs.map(el => el.data());

        setProjects(docsData);
    }

    useEffect(() => {
        setLoading(true);
        getProjects()
        .then(res => console.log(res))
        .catch(e => console.log(e))
        .finally(() => setLoading(false))
    }, []);

    const projectElements = projects.map((project, i) => {
        return <Col md={4} className="my-2">
                    <ProjectCard 
                        key={i} 
                        title={project["name"]} 
                        desc={project["description"]}
                        image={project["image"]}
                        url={project["url"]}
                    />
                </Col>
    })

    return (
        <Container fluid="sm">
            <Row>
                {loading ? <pre>Loading...</pre> : projectElements} 
            </Row>
        </Container>
    )
}

export default Portfolio;