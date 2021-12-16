import React, { useMemo } from 'react';

function Input({ val, setState = null, callback = null, stateKey = null, label, lang = null, type = "text", required = false, }) {
    const id = useMemo(() => Math.random() * 999, [])
    const handleChange = (v) => {
        if (setState) setState(prevState => stateKey ? { ...prevState, [stateKey]: v } : v)

        if (callback) callback(v, stateKey, lang)
    }
    return (
        <div>
            <label htmlFor={id} className={"mb-1"}>{label}</label>
            <input id={id} className={"general-input mb-2"}
                type={type} value={val}
                onChange={e => handleChange(e.target.value)} required={required} />
        </div>
    );
}

export default Input;