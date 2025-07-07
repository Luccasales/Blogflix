const FormInput =  ({label,name, email,type,value,onChange, className}) =>{
    return(
        <div>
            <label htmlFor={name} className="block font-bold mb-1">{label}</label>
            <input 
            id={name}
            name={name}
            email={email}
            value={value}
            type={type}
            onChange={onChange} 
            className={`border rounded p2 w-100 ${className}`}
            required
            />
        </div>
    )
}

export default FormInput;