import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import "./styles.css"

function Alert({ message, type }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
        {<div className="custom-alert | d-flex justify-content-between align-items-center" type={type}>
            <span>{ message }</span>
            <FontAwesomeIcon icon={faXmarkCircle} className="close-btn" onClick={() => setIsOpen(false)}/>
        </div>}
        </>
    );
}

export default Alert;