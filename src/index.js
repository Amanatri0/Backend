// require ('dotenv').config({path: './env'})   this syntax works fine but using import and require makes it inconsistent.

import dotenv from "dotenv"
import connectDB from "./dataBase/index.js"


dotenv.config({
    path: "./env"
})


connectDB()





















// import express from "express";
// const app = express()

// // IIFI code     "( ()=> {...} ) ()"
// ( async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("Something went wrong with the application while connecting to Database", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening to PORT ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.error("ERROR:", error)
//         throw err
//     }
// })()
