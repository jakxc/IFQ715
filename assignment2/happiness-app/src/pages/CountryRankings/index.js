import { Container } from "react-bootstrap";
import CustomRow from "../../components/CustomRow";
import "./styles.css"

const CountryRankings = () => {
    return (
        <Container>
            <h3>Country Rankings</h3>
            <div>
                <label for="cars">Select a country:</label>
                <select id="country" name="country">
                    <option value="Finland">Finland</option>
                    <option value="Australia">Australia</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Japan">Japan</option>
                </select>
            </div>
            <CustomRow />
        </Container>
    )
}

export default CountryRankings;