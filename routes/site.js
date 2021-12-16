const path = require('path');

module.exports = function (app, dynamicStatic) {
    app.get("*", function (_, res) {
        dynamicStatic.setPath(path.resolve(__dirname, '../main/build'));
        res.sendFile(path.resolve(__dirname, "../main/build/index.html"))
    })
}