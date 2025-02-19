import { Router } from "express";
const user= Router();

import { getCustomerData, postCustomerData, deleteCustomerData } from "../controllers/customer.controller.js";

user.all("*", (req, res, next)=>{
    if(req.session.auth){
        return next()
    } 
    return res.redirect('/au/login/')
})

user.all('/dashboard/', (req, res)=>{
    res.render('layout', {view_content: 'todoApp'} )
})


user.get('/getCustomerData/', getCustomerData)
user.post('/postCustomerData/', postCustomerData)
user.delete('/deleteCustomerData/', deleteCustomerData)

export default user;