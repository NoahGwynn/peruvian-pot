const Recipe = require("../mongoose/modals/recipesModel");
const { fetchDocById, fetchDocs, postDoc, updateDoc, deleteDoc } = require("../mongoose/queries/queries");

module.exports = function (app) {

    app.route("/api/recipes")
        // Fetch all recipes
        .get(function (req, res) {
            fetchDocs(Recipe)
                .then(data => res.json(data))
                .catch(err => res.send(500, { error: err }))
        })

        // Add new recipe
        .post(function (req, res) {
            postDoc(Recipe, req.body.id, req.body)
                .then(() => res.sendStatus(200))
                .catch(err => res.send(500, { error: err }))
        })


    app.route("/api/recipes/:id")
        // Fetch one by ID
        .get(function (req, res) {
            fetchDocById(Recipe, req.params.id)
                .then(data => res.json(data))
                .catch(err => res.send(500, { error: err }))
        })

        // Update a recipe
        .put(function (req, res) {
            updateDoc(Recipe, req.params.id, req.body)
                .then(() => res.sendStatus(200))
                .catch(err => res.send(500, { error: err }))
        })

        // Delete a recipe
        .delete(function (req, res) {
            deleteDoc(Recipe, req.params.id)
                .then(() => res.sendStatus(200))
                .catch(err => res.send(500, { error: err }))
        })

}