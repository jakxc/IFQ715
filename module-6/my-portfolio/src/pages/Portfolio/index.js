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
        setProjects(querySnapshot.docs.map((doc) => doc.data()));
    }

    useEffect(() => {
        setLoading(true);
        getProjects()
        .then(res => console.log(res))
        .catch(e => console.log(e))
        .finally(() => setLoading(false))
    }, []);

    const projectElements = projects.map((project, i) => {
        return <Col>
                    <ProjectCard 
                        key={i} 
                        title={project["title"]} 
                        desc={project["description"]}
                        image={project["image"]}
                        url={project["url"]}
                    />
                </Col>
    })

    return (
        <Container fluid="sm">
            <Row className="gap-3">
                {loading ? <pre>Loading...</pre> : projectElements} 
            </Row>
        </Container>
    )
}

export default Portfolio;