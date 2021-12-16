import React from 'react';
import { Col, Row } from "react-bootstrap";
import Input from "./Input";


function ChosenIngredients({ enList, esList, lang, setListState }) {
    // console.log(enList);

    const remove = (i) => {
        let enArr = enList
        enArr.splice(i, 1)
        let esArr = esList
        esArr.splice(i, 1)
        setListState({ en: enArr, es: esArr })
    }

    const handleChange = (v, i) => {
        let newEn = enList
        let newEs = esList
        if (lang === "en") newEn[i].listItem = v
        if (lang === "es") newEs[i].listItem = v
        setListState({ en: newEn, es: newEs })
    }

    return (
        <>
            {(enList && esList && lang === "en" ? enList : esList).map((p, i) => {
                return <Row key={p.name}>
                    <Col xs={"auto"}>
                        <button onClick={() => remove(i)}>{p.name}</button>
                    </Col>
                    <Col>
                        <Input val={p.listItem} stateKey={i} callback={handleChange} />
                    </Col>
                </Row>
            })}
        </>
    );
}

export default ChosenIngredients;