import React, { useMemo } from 'react';

function ToggleButtons({ val, setState, stateKey = null, label }) {
    const id = useMemo(() => Math.random() * 999, [])
    const handleChange = () => {
        if (stateKey) setState(prevState => {
            return { ...prevState, [stateKey]: !val }
        })
        else setState(!val)
    }

    return (
        <div className={"d-inline-flex flex-column mr-4"}>
            <label htmlFor={id} className={"mb-1"}>{label}</label>
            <label id={id} className={"switch"}>
                <input type={"checkbox"} checked={val} onChange={handleChange} />
                <span className={"slider round"} />
            </label>
        </div>
    );
}

export default ToggleButtons;