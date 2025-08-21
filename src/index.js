// // // require('dotenv').config({path: './.env'});
// // import dotenv from "dotenv"
// // import connectDB from "./db/index.js";
// // import mongoose from 'mongoose';
// // import { DB_NAME } from './constants.js';
// // // import app from "./app.js"
// // // import connectDB from './db';
// // dotenv.config({ path: './.env' });


// // connectDB()
// //     .then(() => {

// //         app.listen(process.env.PORT || 8000, () => {
// //             console.log(`server is running on port ${process.env.PORT || 8000}`);
// //         })
// //     })
// // app.on("error", (error) => {
// //     console.log("errrror:", error);
// //     throw error;
// // })
// //     .catch((error) => {
// // console.log("MongoDB connection errrroorrr:",error);

// //     })
// import dotenv from "dotenv";
// import connectDB from "./db/index.js";
// import app from "./app.js";
// import { DB_NAME } from "./constants.js";
// import express from "express";   // ✅ add express
// dotenv.config({ path: "./.env" });

// const app = express();           // ✅ define app
// app.use(express.json());

// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//       console.log(`✅ Server running on port ${process.env.PORT || 8000}`);
//     });

//     app.on("error", (error) => {
//       console.error("❌ Server error:", error);
//       throw error;
//     });
//   })
//   .catch((error) => {
//     console.error("❌ MongoDB connection error:", error);
//   });












// // import express from 'express';
// // const app = express();

// // (async  ()=>{
// //     try {
// //         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
// //         app.on("error",(error)=>{
// //             console.log("ERRR: ", error);
// //             throw error;
// //         })

// //         app.listen(process.env.PORT, () => {
// //             console.log(`Server is running on port ${process.env.PORT}`);
// //         });

// //     } catch (error) {
// //         console.error("error:", error);
// //         throw error;
// //     }
// // })()

import mongoose from "mongoose"
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";  

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

    app.on("error", (error) => {
      console.error(" Server error:", error);
      throw error;
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

