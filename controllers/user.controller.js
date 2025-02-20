import { sqlmap } from "../server.js"; // mysql connector...
import { getUserDataModel, regUserDataModel, loginCheckoutUserDataModel} from "../models/user.model.js";
import {createHmac} from "crypto";
import { resolve } from "path";
import { rejects } from "assert";
export const getUserData= async (req, res, next)=> {

try {
    const query= `select * from users order by id desc limit 50 `;
    const elemData= await getUserDataModel(query, []);

    let element= "";
    for (const user of elemData.msg) {
      element+= `  <tr>
                      <td class="p-3"> 
                          <input class="shadowx checkout form-check-input" type="checkbox" value="${user.id}" name="dataid[]" id="">
                      </td>

                                    
                      <td class="">

                       <span class="badge text-dark bg-light">
                          <img class="shadowx avatar-circle bg-card-color-light rounded-pill" style="width: 40px; height: 40px;" src="/images/${user.avatar}" alt="">
                      </span>

                      </td> 

                      <td class="">
                       
                          <span class="badge text-dark bg-light">${user.name}</span>
                      </td>
                      <td class="">
                          <span class="badge text-dark bg-light">${user.email}</span>
                      </td> 
      
                  
    </tr>`
    
    }
    
    res.send({status: 200, data: element})
    
} catch (err) {
    next(err) // throw globalError...
}

}


export const regUserData= async (req, res, next)=>{

        const { name, gender, email, password } = req.body;
        const defaultAvatat= gender=="male"?'male_avatar.png':'female_avatar.png';
        const avatar= req.file?.filename==undefined? defaultAvatat: req.file?.filename;
        const hashPassword= createHmac('md5', process.env.secret_key).update(password).digest('hex');
        const query= `INSERT INTO users (name, gender, email, password, avatar) VALUES (?, ?, ?, ?, ?)`
        const param= [name, gender, email, hashPassword, avatar]
        
        const regCheckUserDataModel= (userEmail)=>{
          return new Promise((resolve, reject)=>{
                sqlmap.query(`select id from users where email=?`, [userEmail], (err, data)=>{
                    if(err) return reject(err.sqlMessage)
                        if(data?.length>0){
                            return reject('User Email Already Exists...')
                        } 
                        return resolve(true)
                })
           })
        }         

        try {
            const insert= await regCheckUserDataModel(email)
                const result= await regUserDataModel(query, param)
                req.session.auth={user: true, email: email, name: name, avatar: avatar}
                return res.send({ status: 200,  msg: "User Registration Successfully!..." });
             
        } catch (err) {
            return next(err);
        }
}



export const loginCheckoutUserData= async (req, res, next)=>{

        const { email, password } = req.body;
        
        const hashPassword= createHmac('md5', process.env.secret_key).update(password).digest('hex');
        const param= [email, hashPassword]
        

        try {
            const data= await loginCheckoutUserDataModel(email, hashPassword)
            
                req.session.auth= { user: true, email: data[0].email, name: data[0].name, avatar: data[0].avatar};
   
                return res.send({status: 200,  msg: "Login Successfully!" });
             
        } catch (err) {
            return next(err);
        }
}


