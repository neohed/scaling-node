const dotenv = require("dotenv");
dotenv.config()

const port = process.env.DEFAULT_SERVER_PORT;
const pid = process.pid;

module.exports = {
    port,
    pid,
}
