const express = require('express');
const router = express.Router();
const Drone = require("../models/Drone.model.js");

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones

Drone.find()
.then((responseFind)=>{
res.render("drones/list.hbs",{ allDrones: responseFind});

})
.catch((error)=>next(error));
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs")

});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone

  const {name, propellers, maxSpeed} = req.body
  try {
    await Drone.create({
      name,
      propellers,
      maxSpeed
    })
    
    res.redirect("/drones")
  } catch (error) {
    res.redirect("/drones/create")
    next (error)
    
  }

});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here

  Drone.findById(req.params.id)
  .then((response)=>{
    console.log(response)

    res.render("drones/update-form.hbs", {
      droneUpdate: response
    })
  })
  .catch((error)=>{
    next(error)
  })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body

  Drone.findByIdAndUpdate(req.params.id, {
    name,
    propellers,
    maxSpeed
  })
  .then (()=>{
    res.redirect("/drones")
  })
  .catch((err) => {
    res.redirect(`/drones/${req.params.id}/edit`)
    next(err)})
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
console.log("req.params",req.params)
  Drone.findByIdAndDelete(req.params.id)
  .then (()=>{
    res.redirect("/drones")
  })
  .catch((err) => {
    res.redirect(`/drones/${req.params.id}/delete`)
    next(err)})


});

module.exports = router;
