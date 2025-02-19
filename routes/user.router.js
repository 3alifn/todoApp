import { Router } from "express";
const user= Router();

user.all("*", (req, res, next)=>{
    if(req.session.auth){
        return next()
    } 
    return res.redirect('/au/login/')
})

export default user;