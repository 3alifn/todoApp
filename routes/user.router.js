import { Router } from "express";
const user= Router();

user.all("*", (req, res, next)=>{
    if(req.session.auth){
        return next()
    } 
    return res.redirect('/au/login/')
})

user.all('/dashboard/', (req, res)=>{
    res.render('layout', {view_content: 'todoApp'} )
})


user.get('/user/getCustomerData/')
user.post('/user/postCustomerData/')
user.delete('/user/deleteCustomerData/')

export default user;