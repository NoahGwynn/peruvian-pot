import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import Input from "../components/elements/Input";
import Dropdown from "../components/elements/Dropdown";
import ToggleButtons from "../components/elements/ToggleButtons";
import PrepTimePicker from "../components/elements/PrepTimePicker";
import TextEditor from "../components/textEditor/TextEditor";
import InputWithList from "../components/elements/InputWithList";
import PostData from '../dataManagement/PostData';
import { createId } from '../siteHelper'
import ImageLibrary from "../imageManager/ImageLibrary";
import IngredientsPicker from "../components/blocks/IngredientsPicker";
import ListRepeater from "../components/blocks/ListRepeater";

function RecipeEditor() {
    // const {t} = useTranslation()
    const [recipe, setRecipe] = useState({
        id: "", title: { en: "", es: "" }, img: "", vid: "", summary: { en: "", es: "" }, about: { en: "", es: "" }, ingredients: { en: [], es: [] }, method: { en: [], es: [] }, region: "", ratings: [], comments: [],
        dateCreated: new Date().toUTCString(), datePublished: new Date().getUTCDate(), published: false, homePage: false, category: "savoury-food", preparationTime: { hour: 0, min: 0 },
        vegetarian: false, vegan: false, difficulty: 0, serves: 0, goesWellWith: [], author: "Peruvian Pot",
    });

    console.log(recipe);

    const handleSetLangObjs = (val, stateKey, lang) => {
        let tempObj = recipe[stateKey]
        tempObj[lang] = val
        setRecipe(prevState => ({ ...prevState, [stateKey]: tempObj }))
    }

    useEffect(() => {
        setRecipe(prevState => ({ ...prevState, id: createId(recipe.title.en) }))
    }, [recipe.title.en])

    return (
        <div>
            <Row>
                {/* English */}
                <Col>
                    <h2 className={"mt-5"}>{"English"}</h2>
                    {/*Title*/}
                    <Input label={"Title"} stateKey={"title"} callback={handleSetLangObjs} val={recipe.title.en} lang={"en"} required />
                    <hr />
                </Col>
                <Col>
                    <h2 className={"mt-5"}>{"Español"}</h2>
                    <Input label={"Título"} stateKey={"title"} callback={handleSetLangObjs} val={recipe.title.es} lang={"es"} required />
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col xs={"6"}>
                    {/*img*/}
                    <ImageLibrary directory={""} handleImageChoice={""} mapIndex={""} label={"Image"} />
                    <hr />
                    {/*vid*/}
                    <ImageLibrary directory={""} handleImageChoice={""} mapIndex={""} label={"Video"} />
                    <hr />
                    {/*region*/}
                    <InputWithList val={recipe.region} setState={setRecipe} stateKey={"region"} list={"regions"} label={"Region"} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                    {/*summary*/}
                    <TextEditor value={recipe.summary.en} setState={setRecipe} stateKey={"summary"} label={"Summary"} lang={"en"} />
                    <hr />
                    {/*about*/}
                    <TextEditor value={recipe.about.en} setState={setRecipe} stateKey={"about"} label={"About This Recipe"} lang={"en"} />
                    <hr />
                </Col>
                <Col>
                    <hr />
                    {/*summary*/}
                    <TextEditor value={recipe.summary.en} setState={setRecipe} stateKey={"summary"} label={"Resumen"} lang={"es"} />
                    <hr />
                    {/*about*/}
                    <TextEditor value={recipe.about.en} setState={setRecipe} stateKey={"about"} label={"Acerca de esta receta"} lang={"es"} />
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    {/*ingredients*/}
                    <IngredientsPicker value={recipe.ingredients} setState={setRecipe} stateKey={"ingredients"} />
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    {/*method en*/}
                    <ListRepeater listDataObj={{ method: "" }} value={recipe.method.en} stateKey={"method"} lang={"en"} callback={handleSetLangObjs} label={"Method"}
                        ItemComponent={({ data, index, handleUpdate }) => <TextEditor value={data.method} callback={(v) => handleUpdate(v, index, "method")} />} />
                    <hr />
                </Col>
                <Col>
                    {/*method es*/}
                    <ListRepeater listDataObj={{ method: "" }} value={recipe.method.es} stateKey={"method"} lang={"es"} callback={handleSetLangObjs} label={"Método"}
                        ItemComponent={({ data, index, handleUpdate }) => <TextEditor value={data.method} callback={(v) => handleUpdate(v, index, "method")} />} />
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col xs={"6"}>
                    {/*category*/}
                    <Dropdown options={[{ label: "Savoury Food", value: "savoury-food" }, { label: "Seet Food", value: "sweet-food" }, { label: "Soft Drink", value: "soft-drink" }, { label: "Alcoholic Drink", value: "alcohol-drink" }]}
                        val={recipe.category} setState={setRecipe} stateKey={"category"} label={"Catagory"} />
                    <hr />
                    {/*preparationTime*/}
                    <PrepTimePicker label={"Preparation Time"} setState={setRecipe} val={recipe.preparationTime} />
                    <hr />
                    {/*difficulty*/}
                    <Dropdown options={[{ label: "Easy", value: 0 }, { label: "Medium", value: 1 }, { label: "Hard", value: 2 }]} val={recipe.difficulty}
                        setState={setRecipe} stateKey={"difficulty"} label={"Difficulty"} />
                    <hr />
                    {/*serves*/}
                    <Input label={"Serves"} stateKey={"serves"} setState={setRecipe} val={recipe.serves} required type={"number"} />
                    <hr />
                    {/*vegetarian*/}
                    <ToggleButtons val={recipe.vegetarian} stateKey={"vegetarian"} setState={setRecipe} label={"Vegetarian"} />
                    {/*vegan*/}
                    <ToggleButtons val={recipe.vegan} stateKey={"vegan"} setState={setRecipe} label={"Vegan"} />
                    <hr />
                    {/*goesWellWith*/}

                    {/*author*/}
                    <Input label={"Author"} stateKey={"author"} setState={setRecipe} val={recipe.author} required />
                </Col>

                <PostData apiPath={"/api/recipes"} data={recipe} />

            </Row>
        </div>
    );
}

export default (RecipeEditor);