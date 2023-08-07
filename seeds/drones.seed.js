// Iteration #1

const allDrones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

const mongoose = require("mongoose");
const Drone = require("../models/Drone.model.js");


const startSeeding = async () => {
    try {
        const responseConection = await mongoose.connect("mongodb://127.0.0.1:27017/lab-express-drones");
        console.log("Connected to MongoDB" + responseConection);
        const responseInsert = await Drone.insertMany(allDrones);
        console.log(responseInsert);
         const responseCloseConection = await mongoose.connection.close();
        // console.log(responseCloseConection);
    } catch (error) {
        console.log(error);
    }
}

startSeeding();