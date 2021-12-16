const Ingredients = require("../mongoose/modals/ingredientsModel");
const { fetchDocById, fetchDocs, postDoc, updateDoc, deleteDoc } = require("../mongoose/queries/queries");

module.exports = function (app) {

    app.route("/api/ingredients")
        // Fetch all ingredients docs
        .get(function (req, res) {
            fetchDocs(Ingredients)
                .then(data => {
                    res.json(data)
                })
                .catch(err => res.send(500, { error: err }))
        })

        // Add a new ingredients doc
        .post(function (req, res) {
            console.log(req.body);
            postDoc(Ingredients, req.body.id, req.body)
                .then(() => res.sendStatus(200))
                .catch(err => res.send(500, { error: err }))
        })


    app.route("/api/ingredients/:id")
        // Fetch one by ID
        .get(function (req, res) {
            fetchDocById(Ingredients, req.params.id)
                .then(data => res.json(data))
                .catch(err => res.send(500, { error: err }))
        })

        // Update an ingredients doc
        .put(function (req, res) {
            updateDoc(Ingredients, req.params.id, req.body)
                .then(() => res.sendStatus(200))
                .catch(err => res.send(500, { error: err }))
        })

        // Delete an ingredients doc
        .delete(function (req, res) {
            deleteDoc(Ingredients, req.params.id)
                .then(() => res.sendStatus(200))
                .catch(err => res.send(500, { error: err }))
        })

}