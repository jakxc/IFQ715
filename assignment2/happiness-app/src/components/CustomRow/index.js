import "./styles.css";

const CustomRow = ({ data }) => {
    const rowElements = data.map((el, i, a) => {
        return <div key={el}>{el}</div>
    })

    return (
        <div className="background-dark | d-flex justify-content-around p-3">
           {rowElements}
        </div>
    )
}

export default CustomRow;