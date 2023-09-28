import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./styles.css"

const Search = ({ placeholder, onSubmit, dataList }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(query);
    }

    return (
        <div className="search">
            <input 
                type="text" 
                placeholder={placeholder}
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                list={dataList ? dataList : ""}
                className="search_input"
            />
            <FontAwesomeIcon icon={faSearch} className="search_icon" onClick={handleSubmit}/>
        </div>
    )
}

export default Search;