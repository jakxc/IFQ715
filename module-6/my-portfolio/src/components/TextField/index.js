import "./styles.css"

const TextField = ({value, label, placeholder, type, isRequired, onInputChanged}) => {
    const handleChange = (e) => {
        const { value } = e.target;

        onInputChanged(value);
    }
    return (
        <div class="form__group field">
            {isRequired 
            ? <input 
                value={value}
                type={type}
                class="form__field" 
                placeholder={placeholder}
                name={label}
                id={label}
                onChange={handleChange}
                required 
            />
            : <input 
                value={value}
                type={type}
                class="form__field" 
                placeholder={placeholder}
                name={label}
                id={label}
                onChange={handleChange}
            />}
            <label for={label} class="form__label">{label}</label>
        </div>
    )
}

export default TextField;