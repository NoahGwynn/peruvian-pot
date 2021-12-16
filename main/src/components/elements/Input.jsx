import React, {useContext, useState} from 'react';
import DesignContext from "../../dataManagement/providers/DesignContext";
import GeneralContext from "../../dataManagement/providers/GeneralContext";
import {rgbaToHex} from "../../siteHelper";

function Input({
                   val,
                   setVal,
                   prevStateObjKey = null,
                   label,
                   type = "text",
                   labelStyle = {},
                   inputStyle = {},
                   labelClass = "",
                   inputClass = "",
                   required = false,
                   inputColour = null,
               }) {
    const {designValues} = useContext(DesignContext)
    const {generalColour} = useContext(GeneralContext)
    const {colour} = designValues
    const [focused, setFocused] = useState(false);

    const handleChange = (v) => {
        if (prevStateObjKey) setVal(prevState => {
            return {...prevState, [prevStateObjKey]: v}
        })
        else setVal(v)
    }
    return (
        <>
            <label className={"mb-1 " + labelClass} style={labelStyle}>{label}</label>
            <input className={"general-input mb-2 " + inputClass}
                   style={{
                       ...inputStyle,
                       outline: "none",
                       border: `1px solid ${focused ? generalColour.bodyContrastColour : colour.nav}`,
                       backgroundColor: rgbaToHex(colour.logo, "40"),
                       color: inputColour ? inputColour : generalColour.bodyContrastColour,
                       boxShadow: `0 0 3px 1px ${focused ? generalColour.nav : colour.bg}`,
                   }}
                   type={type} value={val}
                   onFocus={() => setFocused(true)}
                   onBlur={() => setFocused(false)}
                   onChange={e => handleChange(e.target.value)} required={required}/>
        </>
    );
}

export default Input;