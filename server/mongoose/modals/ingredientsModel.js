const pkg = require('mongoose');
const { Schema, model } = pkg;


const langSchemaStr = new Schema({
    en: String,
    es: String,
})

const ingredientsSchema = new Schema({
    _id: String,
    name: {
        type: langSchemaStr,
        required: true,
    },
    info: langSchemaStr,
});

const Ingredients = model("Ingredients", ingredientsSchema)

module.exports = Ingredients