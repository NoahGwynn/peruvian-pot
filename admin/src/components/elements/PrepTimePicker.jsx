import React, { useRef } from 'react';
import Dropdown from "./Dropdown";

function PrepTimePicker({ val, setState, label }) {
    const time = useRef(val)

    const handleChange = (v, objKey) => {
        time.current = { ...time.current, [objKey]: v }
        let tempObj = val
        tempObj[objKey] = parseInt(v)
        setState(prevState => ({ ...prevState, preparationTime: tempObj }))
    }

    const hours = [...Array(16)].map((_, i) => {
        return i < 12 ? { value: i, label: i + " Hours" } : i === 12 ? { value: i, label: "12-23 Hours" } : i === 13 ? { value: i, label: "1 day" }
            : i === 14 ? { value: i, label: "2 days" } : i === 15 ? { value: i, label: "3+ days" } : null
    })
    const mins = [...Array(12)].map((_, i) => ({ value: i * 5, label: (i * 5) + " Minutes" }))

    return (
        <div>
            <label className={"mb-1"}>{label}</label>
            <div className={"d-flex"}>
                <div className={"mr-3"}>
                    <Dropdown options={hours} callback={handleChange} prevStateObjKey={"hour"} val={time.current.hour} label={""} />
                </div>
                <div className={""}>
                    <Dropdown options={mins} callback={handleChange} prevStateObjKey={"min"} val={time.current.min} label={""} />
                </div>
            </div>
        </div>
    );
}

export default PrepTimePicker;