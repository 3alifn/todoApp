import { Router } from "express";
const auth= Router();
import { regUserData, loginCheckoutUserData } from "../controllers/user.controller.js";

auth.get('/reg/', (req, res)=>{
    res.render('layout', {view_content: "regForm"});
})


auth.post('/regUserData', regUserData)

auth.get('/login/', (req, res)=>{
    res.render('layout', {view_content: "loginForm"});

})

auth.all('/logout/', (req, res)=>{
    req.session.destroy()
    res.redirect('/au/login/');
})

auth.all('/loginCheckoutUserData/', loginCheckoutUserData)



export default auth;