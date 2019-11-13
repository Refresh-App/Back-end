const privateRouter = require('express').Router()
const mailRouter = require('./mailer/sendMail')
const adminRouter = require('./admin/admin')
const jwt = require(_jwt)


privateRouter.use('/mailerYo',mailRouter)
privateRouter.use('/admin', jwt.chkRole(), adminRouter)
module.exports=privateRouter