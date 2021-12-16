require('dotenv').config()
const pkg = require('mongoose');
const { connect } = pkg;

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hdqj6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

module.exports = async () => {
    try {
        const conn = await connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Mongo db connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Mongo db Error: ${error.message}`);
        process.exit(1)
    }
}