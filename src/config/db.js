const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Connect successful !!");
    } catch(e) {
        console.log("Connect failed !!");
    }
}

module.exports = { connect };