/* eslint-disable no-undef */
require('dotenv').config({ path: __dirname + '/../.evn' })

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const TEST_MONGO_URL = process.env.TEST_MONGO_URL
const SECRET = process.env.SECRET

module.exports = {
    NODE_ENV,
    PORT,
    MONGO_URL,
    TEST_MONGO_URL,
    SECRET
}