import { Router } from "express";
const user= Router();

import { getCustomerData, postCustomerData, deleteCustomerData } from "../controllers/customer.controller.js";
import { globalMulterUploader } from "../middlewares/uploader.middleware.js";
user.all("*", (req, res, next)=>{
    if(req.session.auth){
        return next()
    } 
    return res.redirect('/au/login/')
})

user.all('/dashboard/', (req, res)=>{
    res.render('layout', {view_content: 'todoApp'} )
})

const multerUploader= globalMulterUploader({name: ['single', 'avatar'], path: '/images/', size: 500* 1024, filter: ['image/jpeg', 'image/png']})
user.get('/getCustomerData/', getCustomerData)
user.post('/postCustomerData/', multerUploader, postCustomerData)
user.delete('/deleteCustomerData/', deleteCustomerData)

export default user;