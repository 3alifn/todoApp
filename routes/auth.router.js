import { Router } from "express";
const auth= Router();
import { AddUserData } from "../controllers/user.controller.js";

auth.get('/reg/', (req, res)=>{
    res.render('layout', {view_content: "regForm"});
})


auth.post('/addUserDataPost', AddUserData)

auth.get('/login/', (req, res)=>{
    res.render('layout', {view_content: "loginForm"});

})

auth.all('/logout/', (req, res)=>{
    req.session.destroy()
    res.redirect('/au/login/');
})

auth.all('/checkout/', (req, res)=>{
    
   return res.redirect('/au/dashboard/')
    
})

auth.all('/dashboard/', (req, res)=>{
    
    res.render('layout', {view_content: "todoApp"});
    
})


export default auth;