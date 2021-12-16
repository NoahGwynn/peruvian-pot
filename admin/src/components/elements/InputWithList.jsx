import React, { useEffect, useState, useMemo } from 'react';

function InputWithList({ label = null, stateKey = null, val, setState = null, list = [], lang = null, callback = null }) {
    const [suggestions, setSuggestions] = useState([]);
    const data = useMemo(() => {
        return {
            regions: ["Peru", "Amazonas", "Ancash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Cuzco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martin", "Tacna", "Tumbes", "Ucayali"],
            catagories: [],
        }
    }, [])

    useEffect(() => {
        setSuggestions(Array.isArray(list) ? list : data[list])
    }, [list, data])

    const handleChange = (e) => {
        const v = e.target.value
        if (setState) setState(prevState => stateKey ? { ...prevState, [stateKey]: v } : v)
        else if (setState) setState(v)

        if (callback) callback(v, stateKey, lang)
    }

    return (
        <div>
            {label && <label className={"general-input__label"}>{label}</label>}
            <div className={"d-flex"}>
                <input type={"text"} list={stateKey} placeholder={label} className={"general-input"}
                    value={val} onChange={handleChange} autoComplete={"false"} />
                <datalist id={stateKey}>
                    {suggestions.map((o, i) => {
                        return <option key={o}>{o}</option>
                    })}
                </datalist>
            </div>
        </div>
    );
}

export default InputWithList;