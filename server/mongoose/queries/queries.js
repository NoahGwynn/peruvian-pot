//Find all docs or find selected docs with query
exports.fetchDocs = function (Model, query = {}) {
    return new Promise((resolve, reject) => {
        Model.find(query, function (err, docs) {
            if (err) {
                console.error(err);
                reject("ERROR: Unable to fetch docs")
            } else resolve(docs)
        });
    })
}

// Find doc by ID
exports.fetchDocById = function (Model, id,) {
    return new Promise((resolve, reject) => {
        const data = Model.findById(id)
        if (data) resolve(data)
        else reject("ERROR: Data not found with _id: ", id)
    })
}

// Post a doc
exports.postDoc = function (Model, id, data) {
    return new Promise((resolve, reject) => {
        Model.findOneAndUpdate({ _id: id }, data, { new: true, upsert: true }, function (err, doc) {
            if (err) {
                console.error(err);
                reject("ERROR: Unable to post doc with _id: ", id)
            } else resolve(doc)
        });
    })
}

// Update doc
exports.updateDoc = function (Model, id, data) {
    return new Promise((resolve, reject) => {
        Model.findByIdAndUpdate(id, data, { new: true }, function (err, doc) {
            if (err) {
                console.error(err);
                reject("ERROR: Unable to update doc with _id: ", id)
            } else resolve(doc)
        });
    });
}

// Delete doc
exports.deleteDoc = function (Model, id) {
    return new Promise((resolve, reject) => {
        Model.deleteOne({ _id: id }, function (err, _) {
            if (err) {
                console.error(err);
                reject("ERROR: Unable to delete doc with _id: ", id)
            } else resolve()
        });
    });
}

