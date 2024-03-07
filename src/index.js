// require ('dotenv').config({path: './env'})   this syntax works fine but using import and require makes it inconsistent.

import dotenv from "dotenv";
import connectDB from "./dataBase/index.js";
import {app} from "./app.js"

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
      app.on("error", (error) => {
        console.log(`Application is not Working `, error);
        throw error;
      });
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!!!", err);
  });






















// import express from "express";
// const app = express()

// // IIFI code     "( ()=> {...} ) ()"
// ( async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("Something went wrong with the application    while connecting to Database", error);
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
