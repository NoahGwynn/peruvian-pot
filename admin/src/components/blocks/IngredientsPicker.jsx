import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import { fetchAll, postData } from "../../dataManagement/db/dbFunctions";
import { createId } from "../../siteHelper";
import InputWithList from "../elements/InputWithList";
import TextArea from "../elements/TextArea"
import ChosenIngredients from "../elements/ChosenIngredients";

function IngredientsPicker({ value, keyName, setState }) {
    const [input, setInput] = useState({ en: "", es: "" })
    const [info, setInfo] = useState({ en: "", es: "" })
    const [editInfo, setEditInfo] = useState(false)
    const [ingredients, setIngredients] = useState({ en: [], es: [] })
    const [addedIngredients, setAddedIngredients] = useState(value)

    //Fetch ingedients from db
    useEffect(() => {
        fetchAll("/api/ingredients")
            .then(data => {
                let enArr = []
                let esArr = []
                data.forEach(x => {
                    enArr.push(x.name.en)
                    esArr.push(x.name.es)
                });
                setIngredients({ en: enArr, es: esArr })
            })
    }, [])

    useEffect(() => {
        setState(prevState => ({ ...prevState, [keyName]: addedIngredients }))
    }, [addedIngredients])

    const handleAdd = () => {
        if (ingredients.en.includes(input.en) && ingredients.es.includes(input.es)) {
            let enArr = addedIngredients.en
            enArr.push({ name: input.en, listItem: "" })
            let esArr = addedIngredients.es
            esArr.push({ name: input.es, listItem: "" })
            setAddedIngredients({ en: enArr, es: esArr })
        }
    }
    const handleSave = () => {
        postData("/api/ingredients", { id: createId(input.en), name: input, info: info })
            .then(() => {
                console.log("Ingrediant saved")
            })
            .catch(() => console.log("Error saving Ingredient"))
    }

    const handleMatch = (v, lang) => {
        let otherLang = lang === "en" ? "es" : "en"
        if (ingredients[lang].includes(v)) setInput(prevState => ({ ...prevState, [otherLang]: ingredients[otherLang][ingredients[lang].indexOf(v)] }))
    }

    const disabledBtn = (btn) => {
        if (btn === "add") {
            return (!ingredients.en.includes(input.en) || !ingredients.es.includes(input.es))
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <ChosenIngredients enList={addedIngredients.en} esList={addedIngredients.es} lang={"en"} setListState={setAddedIngredients} />
                </Col>
                <Col>
                    <ChosenIngredients enList={addedIngredients.en} esList={addedIngredients.es} lang={"es"} setListState={setAddedIngredients} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputWithList list={ingredients.en} stateKey={"en"} val={input.en} setState={setInput} label={"Ingredients"} callback={handleMatch} />
                    {editInfo ? <TextArea val={info.en} setState={setInfo} stateKey={"en"} label={"Ingredient Information"} rows="2" /> : <p>{info.en}</p>}
                </Col>
                <Col>
                    <InputWithList list={ingredients.es} stateKey={"es"} val={input.es} setState={setInput} label={"Ingredientes"} callback={handleMatch} />
                    {editInfo ? <TextArea val={info.es} setState={setInfo} stateKey={"es"} label={"Información de Ingredientes"} rows="2" /> : <p>{info.es}</p>}
                </Col>
            </Row>
            <button onClick={handleAdd} className={"mr-2"} disabled={disabledBtn("add")} >Add Ingredient</button>
            <button onClick={handleSave} className={"mr-2"}>Save Ingredient</button>
            <button onClick={() => setEditInfo(!editInfo)}>Edit Information</button>
        </div>
    );
}

export default IngredientsPicker;
