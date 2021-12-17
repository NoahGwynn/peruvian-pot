import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import { CaretDown, CaretUp, PlusLg, Trash } from 'react-bootstrap-icons';


function ListRepeater({ ItemComponent, listDataObj, value, setState = null, stateKey = null, lang = null, callback = null, label }) {
    const [list, setList] = useState(value)


    useEffect(() => {
        if (setState) setState(prevState => stateKey ? { ...prevState, [stateKey]: list } : list)
        else if (setState) setState(list)

        if (callback) callback(list, stateKey, lang)
    }, [list])

    // UPDATES LIST
    // requires - value, index and objKey
    const handleUpdateList = (v, i, objKey) => {
        console.log(v);
        let tempArr = list
        let tempObj = tempArr[i]
        tempObj[objKey] = v
        setList([...tempArr])
    }

    return <>
        {label && <label className={"mb-1"}>{label}</label>}
        {list.map((item, i) => {
            return <div key={i} className={"mb-4"}>
                <Row>
                    <Col md={9}>
                        <ItemComponent data={item} index={i} handleUpdate={handleUpdateList} />
                    </Col>
                    <Col md={3}>
                        <ArrayBtns last={i + 1 !== list.length} first={i !== 0} index={i} state={[list, setList]} listDataObj={listDataObj} />
                    </Col>
                </Row>
                <hr className={"mt-4"} />
            </div>
        })}
        <div className={"mb-5 text-right"}>
            <button type={"button"} style={{ fontSize: "2rem" }} className={"btn"} onClick={() => setList(prevState => [...prevState, listDataObj])}>
                New <PlusLg />
            </button>
        </div>
    </>
}

export default ListRepeater;


///////////////////// Buttons ///////////////////////

function ArrayBtns({ last, first, index, state: [array, setArray], listDataObj }) {
    const [helpText, setHelpText] = useState(" ")

    const handleMove = (action) => {
        let tempArr = array
        let f = tempArr.splice(index, 1)[0];
        action === "down" && tempArr.splice(index + 1, 0, f);
        action === "up" && tempArr.splice(index - 1, 0, f);
        setArray([...tempArr])
    }

    const handleAddDelete = (action) => {
        let tempArr = array
        action === "add" && tempArr.splice(index + 1, 0, listDataObj);
        action === "delete" && tempArr.splice(index, 1);
        setArray([...tempArr])
    }

    return <>
        <div className={"position-relative h-100"}>
            <div className={"position-absolute"} style={{ bottom: "-1.9rem", right: "0" }}>
                <p className={"text-right m-0 p-0 text-small"}>{helpText}</p>
            </div>
            <div className={"position-absolute"} style={{ bottom: "0", right: "0" }}>
                {first && <Btn value={<CaretUp />} action={"up"}
                    setHelp={setHelpText} helpText={"Move Up"} handleChange={handleMove} />}
                {last && <Btn value={<CaretDown />} action={"down"}
                    setHelp={setHelpText} helpText={"Move Down"} handleChange={handleMove} />}

                <Btn value={<PlusLg />} action={"add"} handleChange={handleAddDelete}
                    setHelp={setHelpText} helpText={"Add Bellow"} />
                <Btn value={<Trash />} action={"delete"} handleChange={handleAddDelete}
                    setHelp={setHelpText} helpText={"Delete"} />

            </div>
        </div>
    </>
}


////// Button //////
function Btn({ value, action, setHelp, helpText, handleChange }) {
    return <>
        <button type={"button"} style={{ fontSize: "2rem", lineHeight: ".6" }}
            onClick={() => handleChange(action)} className={"btn p-1 ml-1"}
            onMouseEnter={() => setHelp(helpText)} onMouseLeave={() => setHelp("")}
            onClickCapture={(e) => e.currentTarget.blur()}>
            {value}
        </button>
    </>
}