import { sqlmap } from "../server.js";

export const getUserDataModel = async (query, param) => {
    return new Promise((resolve, reject) => {
        sqlmap.query(query, param, (err, data) => {
            if (err) {
                return reject(err.sqlMessage || "Database error");
            }
            resolve({ status: 200, msg: data });
        });
    });
};


export const regUserDataModel = async (query, param) => {

    return new Promise((resolve, reject) => {
        sqlmap.query(query, param, (err, insert) => {
                if (err) {
                    return reject(err.sqlMessage);
                }

                return resolve({ status: 200,  msg: "User Added..." });
            });
    });

};


export const loginCheckoutUserDataModel= (userEmail, userPassword)=>{
    return new Promise((resolve, reject)=>{
          sqlmap.query(`select * from users where email=? AND password=?`, [userEmail, userPassword], (err, data)=>{
              if(err) return reject(err.sqlMessage)
                  if(data?.length>0){
                      
                      return resolve(data)
                  } 
                  return reject("Authentication Failed!")
          })
     })
  }         