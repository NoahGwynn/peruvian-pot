import React, { useMemo } from 'react';

function Dropdown({ options, val, setState = null, stateKey = null, label, required = false, callback = null, lang = null }) {
    const id = useMemo(() => Math.random() * 999, [])
    const handleChange = (v) => {
        console.log(v);
        if (setState) setState(prevState => stateKey ? { ...prevState, [stateKey]: v } : v)

        if (callback) callback(v, stateKey, lang)
    }
    return (
        <div>
            <label htmlFor={id} className={"mb-1"}>{label}</label>
            <select id={id} className={"general-input mb-2"} value={val} onChange={e => handleChange(e.target.value)} required={required}>
                {options.map((v, i) => {
                    return <option key={i} value={v.value}>{v.label}</option>;
                })}
            </select>
        </div>
    );
}

export default Dropdown;