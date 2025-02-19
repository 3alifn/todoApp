import { getCustomerDataModel, postCustomerDataModel, deleteCustomerDataModel } from "../models/customer.model.js"
import {sqlmap} from "../server.js"

export const getCustomerData= async (req, res, next)=>{

try {
    const query= `select * from customers where userid=? limit 50`;
    const userid= req.session.auth.email;
    const elemData= await getCustomerDataModel(query, [userid]);

    let element= "";
    for (const user of elemData.msg) {
      element+= `  <tr>
                      <td class="p-3"> 
                          <input class="shadowx checkout form-check-input" type="checkbox" value="${user.id}" name="dataid[]" id="">
                      </td>

                  <td class="shadowx"> <button onclick="deleteCustomerData(${user.id})" type="button" class="shadow-sm fw-bold p-0 px-3 btn btn-go text-danger">Delete</button></td>
             
                      
                      <td class="">
                       
                          <span class="badge text-dark bg-light">${user.first_name}</span>
                      </td>
                      <td class="">
                          <span class="badge text-dark bg-light">${user.last_name}</span>
                      </td> 

                       <td class="">
                          <span class="badge text-dark bg-light">${user.gender}</span>
                      </td> 

                       <td class="">
                          <span class="badge text-dark bg-light">${user.age}</span>
                      </td> 

                       <td class="">
                          <span class="badge text-dark bg-light">${user.email}</span>
                      </td> 

                       <td class="">
                          <span class="badge text-dark bg-light">${user.phone}</span>
                      </td> 
      
                  
    </tr>`
    
    }
    
   return res.send({status: 200, data: element})
    
} catch (err) {
    return next(err) // throw globalError...
}

}


export const postCustomerData= async (req, res, next)=>{
    
    const { fname, lname, gender, age, email, phone } = req.body;
    const userid= req.session.auth.email;
    const query= `INSERT INTO customers (userid, first_name, last_name, gender, age, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)`
    const param= [userid, fname, lname, gender, age, email, phone]
    
    const customerCheckDataModel= (userEmail)=>{
      return new Promise((resolve, reject)=>{
            sqlmap.query(`select id from customers where email=?`, [userEmail], (err, data)=>{
                if(err) return reject(err.sqlMessage)
                    if(data?.length>0){
                        return reject('User Email Already Exists...')
                    } 
                    return resolve(true)
            })
       })
    }         

    try {
        const insert= await customerCheckDataModel(email)
            const result= await postCustomerDataModel(query, param)
            return res.send({ status: 200,  msg: "Customer Added Successfully!..." });
         
    } catch (err) {
        return next(err);
    }
}

export const deleteCustomerData= async (req, res, next)=>{
    const {id}= req.body;
    
    try {
        const query= `delete from customers where id=?`
        const param= [id];
        await deleteCustomerDataModel(query, param);
        return res.send({ status: 200,  msg: "Customer Deleted!" })

    } catch (err) {
        return next(err);
        
    }
}