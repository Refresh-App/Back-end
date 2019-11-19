const router = require('express').Router()
const dbModel = require(Model)
router
  .get('/',(req,res)=>{
    res.status(200).sendFile('./docs.html')
})

module.exports=router
