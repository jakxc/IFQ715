import "./styles.css"

function Alert({ message, type }) {
    return (
        <div className="alert" type={type}>
          <span>&times; </span>
            { message }
        </div>
    );
}

export default Alert;