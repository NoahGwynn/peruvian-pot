import React, { useMemo } from 'react';

function TextArea({ val, setState = null, stateKey = null, callback = null, lang = null, label, required = false, rows = "4" }) {
    const id = useMemo(() => Math.random() * 999, [])
    const handleChange = (v) => {
        if (setState) setState(prevState => stateKey ? { ...prevState, [stateKey]: v } : v)
        else if (setState) setState(v)

        if (callback) callback(v, stateKey, lang)
    }
    return (
        <div>
            <label htmlFor={id} className={"mb-1"}>{label}</label>
            <textarea id={id} className={"general-input mb-2"} value={val} rows={rows}
                onChange={e => handleChange(e.target.value)} required={required} />
        </div>
    );
}

export default TextArea;