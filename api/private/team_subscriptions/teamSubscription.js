const router = require('express').Router()
const dbModel = require('./teamSubscriptionModel')
router
  .get('/',(req,res)=>{
    return dbModel.findAll()
    .then(p=>{res.status(200).json({message:`Success`,...p})})
    .catch(e=>{res.status(200).json({message:'Something has gone wrong', ...e})})
})
router
  .get('/:id',(req,res)=>{
    const {id}=req.params
    return dbModel.findById(id)
    .then(p=>{res.status(200).json({message:`Success`,...p})})
    .catch(e=>{res.status(200).json({message:'Something has gone wrong', ...e})})
})
  
router
  .post('/',(req,res)=>{
    const {body}=req
    return dbModel.add(body)
    .then(p=>{res.status(201).json({message:`Success`,...p})})
    .catch(e=>{res.status(200).json({message:'Something has gone wrong', ...e})})
})
router
  .put('/:id',(req,res)=>{
    const {id}=req.params
    const {body}=req
  
    return dbModel.editById(id,body)
    .then(p=>{res.status(200).json({message:`Success`,...p})})
    .catch(e=>{res.status(200).json({message:'Something has gone wrong', ...e})})
})
router
  .delete('/:id',(req,res)=>{
    const {id}=req.params
    
    return dbModel.remove(id)
    .then(p=>{res.status(201).json({message:`Success`,...p})})
    .catch(e=>{res.status(200).json({message:'Something has gone wrong', ...e})})
})

router.routes = [{
  route: "/team-subscriptions",
  method: "GET",
  expects: { headers: "Authorization: Token" },
  returns: {}
},
{ route: "/team-subscriptions/:id", method: "GET", expects: { headers: "Authorization: Token" }, returns: {} },
{ route: "/team-subscriptions", method: "POST", expects: {}, returns: {} },
{ route: "/team-subscriptions/:id", method: "PUT", expects: {}, returns: {} },
{ route: "/team-subscriptions/:id", method: "DELETE", expects: {}, returns: {} }
];
module.exports=router
