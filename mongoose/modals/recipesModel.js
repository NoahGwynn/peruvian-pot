const pkg = require('mongoose');
const { Schema, model } = pkg;

const prepTimeSchema = new Schema({
    hour: Number,
    min: Number,
})
const langSchemaStr = new Schema({
    en: String,
    es: String,
})
const langSchemaArr = new Schema({
    en: Array,
    es: Array,
})

const recipeSchema = new Schema({
    _id: String,
    title: {
        type: langSchemaStr,
        required: true,
    },
    img: String,
    vid: String,
    summary: langSchemaStr,
    about: langSchemaStr,
    ingredients: langSchemaArr,
    method: langSchemaArr,
    region: String,
    ratings: Array,
    comments: Array,
    dateCreated: Date,
    datePublished: Date,
    published: Boolean,
    homePage: Boolean,
    categories: Array,
    preparationTime: prepTimeSchema,
    vegetarian: Boolean,
    vegan: Boolean,
    difficulty: Number,
    serves: Number,
    goesWellWith: Array,
    author: String,
});

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe