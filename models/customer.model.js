import {sqlmap} from "../server.js"

export const getCustomerDataModel= async (query, param)=>{
    return new Promise((resolve, reject) => {
        sqlmap.query(query, param, (err, data) => {
            if (err) {
                return reject(err.sqlMessage || "Database error");
            }
            resolve({ status: 200, msg: data });
        });
    });
}

export const postCustomerDataModel= async (query, param)=>{
    return new Promise((resolve, reject) => {
        sqlmap.query(query, param, (err, insert) => {
                if (err) {
                    return reject(err.sqlMessage);
                }

                return resolve({ status: 200,  msg: "Customer Added..." });
            });
    });
}

export const deleteCustomerDataModel= async (query, param)=>{
    return new Promise((resolve, reject) => {
        sqlmap.query(query, param, (err, insert) => {
                if (err) {
                    return reject(err.sqlMessage);
                }

                return resolve({ status: 200,  msg: "Customer Deleted!" });
            });
    });
}