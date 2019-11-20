const router = require('express').Router()
var path = require('path');

router
  .get('/',(req,res)=>{
    res.type('.html')
      console.log('here')
    res.sendFile(path.join(__dirname + '/docs.html'))
})

module.exports=router
