import { MulterError } from "multer";
export const globalErrorHandler= (err, req, res, next)=>{
    if(err instanceof MulterError ) {
      console.error(err.message);
      res.send({status: 500, msg: "Error! "+ err.message+" & size upto 500kb", alert: "alert-warning text-dark"})
      return
     }
      console.error("My Next Error! "+ err);
      res.send({status: 500, msg: "Error! "+ err, alert: "alert-danger text-dark"})
  
  }
  
  export const globalNotFoundPage= (req, res, next)=>{
    return res.redirect('/404.html')
  }