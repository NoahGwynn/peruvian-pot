const path = require('path');

module.exports = function (app) {
    app.get("*", function (_, res) {
        res.sendFile(path.resolve(__dirname, "./main/build/index.html"))
    })
}