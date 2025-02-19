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


export const addUserDataModel = async (query, param) => {

    return new Promise((resolve, reject) => {
        sqlmap.query(query, param, (err, insert) => {
                if (err) {
                    return reject(err.sqlMessage);
                }
                resolve({ status: 200,  msg: "User Added..." });
            });
    });

};

