import { app } from "./server.js";
import { globalNotFoundPage, globalErrorHandler } from "./utils/globalHelper.js";
import auth from './routes/auth.router.js';
import user from './routes/user.router.js';
import { getUserData } from "./controllers/user.controller.js";
app.all('/', (req, res)=>{
    res.render('layout', {view_content: 'home'})
})
app.use('/au/', auth);
app.use('/user/', user);
app.get('/getUserData/', getUserData);
app.use(globalErrorHandler);
app.use(globalNotFoundPage);