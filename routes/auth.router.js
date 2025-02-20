import { Router } from "express";
const auth= Router();
import { regUserData, loginCheckoutUserData } from "../controllers/user.controller.js";
import { globalMulterUploader } from "../middlewares/uploader.middleware.js";

auth.get('/reg/', (req, res)=>{
    res.render('layout', {view_content: "regForm"});
})

const multerUploader= globalMulterUploader({name: ['single', 'avatar'], path: '/images/', size: 500* 1024, filter: ['image/jpeg', 'image/png']})
auth.post('/regUserData', multerUploader, regUserData)

auth.get('/login/', (req, res)=>{
    res.render('layout', {view_content: "loginForm"});

})

auth.all('/logout/', (req, res)=>{
    req.session.destroy()
    res.redirect('/au/login/');
})

auth.all('/loginCheckoutUserData/', loginCheckoutUserData)



export default auth;