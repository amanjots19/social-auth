const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/',(req,res)=>{
  res.render('login');
})
router.get('/mainApp',(req,res,next)=>{
  res.render('main');
})

module.exports = router;
