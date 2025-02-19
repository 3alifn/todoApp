import { sqlmap } from "../server.js";

class SqlApp{
    constructor(sqlmap){
        this.sqlmap= sqlmap;
    }
    
    async CreateApp(sql, data){
            this.sql= sql;
            this.data= data;
            return new Promise((resolve, reject)=>{
              sqlmap.query(sql, data, (err, next)=>{
                if(err) return reject({status: 500, msg: err.sqlMessage})
                    return resolve({status: 200, msg: 'App Created Successfully'})
              })
            })
        };
        
        async UpdateApp(sql, data){
            return new Promise((resolve, reject)=>{
                sqlmap.query(sql, data, (err, next)=>{
                    if(err) return reject({status: 500, msg: err.sqlMessage})
                        return resolve({status: 200, msg: "App Update Successfully"})
                })
            })

        };

        async FetchApp(sql, data){
            return new Promise((resolve, reject)=>{
                sqlmap.query(sql, data, (err, AppData)=>{
                    if(err) return reject({status: 500, msg: err.sqlMessage})
                        return resolve({status: 200, AppData})
                })
            })

        };

        
        async DeleteApp(sql, data){
            return new Promise((resolve, reject)=>{
                sqlmap.query(sql, data, (err, next)=>{
                    if(err) return reject({status: 500, msg: err.sqlMessage})
                        return resolve({status: 200, msg: "App Deleted Successfully!"})
                })
            })

        };
        
}


export default SqlApp;