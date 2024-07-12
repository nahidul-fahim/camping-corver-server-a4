import mongoose from "mongoose"
import config from "./app/config"
import {Server} from "http";
import app from "./app";

let server: Server

async function main() {
    try {
        await mongoose.connect(config.db_url as string)
        server = app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
        })
    }
    catch (error) {
        console.log("Error from server file", error)
    }
}


// invoking the main function
main();


// handling unhandled rejection
process.on('unhandledRejection', () => {
    console.log(`😈 unhandledRejection is detected. Shutting down the server.......`)
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})


// handling uncaughtException
process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected. Shutting down the server.......`)
    process.exit(1)
})