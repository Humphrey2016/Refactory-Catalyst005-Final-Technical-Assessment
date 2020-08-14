const express=require('express');
const router = express.Router();

require('../models/covidRegModule');


//getting the manager registrationm page and setting a route for it
router.get('/covid', (req, res) => {
    res.render("covidReg");
  });
  
  //posting the manager registration page to the browser
  router.post("/managerReg", async (req, res) => {
  // console.log(req.body);
  
  try {
    const Manager = new ManagerRegistration({
      fullname: req.body.fullname,
      emailaddress: req.body.emailaddress,
      username: req.body.username,
      password: req.body.password,
      repassword: req.body.repassword,
      EMPnumber: req.body.EMPnumber,
      NINnumber: req.body.NINnumber,
    });
    await ManagerRegistration.register(Manager, req.body.password, err =>{
      if (err){
        throw err
      }
      res.redirect('/manager/managerlogin');
    }); 
  } catch (err) {
    console.log(err);
    res.send("Sorry! Something went wrong.");
  }
  });


  module.exports=router;