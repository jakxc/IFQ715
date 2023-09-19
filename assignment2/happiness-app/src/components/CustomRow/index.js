import "./styles.css";

const CustomRow = ({ data, styles }) => {
    const rowElements = data.map((el, i) => {
        return <div key={i} className="cell | d-flex justify-content-center align-items-center text-center p-3">{el}</div>
    })

    return (
        <div className="d-flex justify-content-between gap-2" style={styles}>
           {rowElements}
        </div>
    )
}

export default CustomRow;