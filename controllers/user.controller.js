import { sqlmap } from "../server.js"; // mysql connector...
import { getUserDataModel } from "../models/user.model.js";

export const getUserData= async (req, res, next)=> {

try {
    const query= `select * from users limit 50`;
    const elemData= await getUserDataModel(query, []);

    let element= "";
    for (const index of elemData.msg) {
      element+= `  <tr>
                      <td class="p-3"> 
                          <input class="shadowx checkout form-check-input" type="checkbox" value="${info[index].id}" name="dataid[]" id="">
                      </td>
                      <td class="">
                          <span class="badge text-dark bg-light">
                              <img class="shadowx avatar-circle bg-card-color-light rounded-pill" style="width: 40px; height: 40px;" src="/images/${info[index].avatar}" alt="">
                          </span>
                          <span class="badge text-dark bg-light">${info[index].name}</span>
                      </td>
                      <td class="">
                          <span class="badge text-dark bg-light">${info[index].email}</span>
                      </td>
                      <td class="fw-semibold text-muted">
                          <div class="dropdown">
                              <button data-bs-toggle="dropdown" class="btn btn-link dropdown-toggle shadowx"> 
                                  <i class="bi bi-three-dots-vertical"></i>
                              </button>
                              <div class="dropdown-menu">
                                  <button type='button' onclick='_penbox_pull(${info[index].id})' class="btn dropdown-item btn-link p-2">
                                      <i class="bi bi-pen p-1"></i>view and edit
                                  </button>
                                  <button type='button' onclick='_delbox_push(${info[index].id})' class="btn dropdown-item btn-link p-2">
                                      <i class="bi bi-trash p-1"></i>delete forever
                                  </button>
                              </div>
                          </div>
                      </td>
    </tr>`
    
    }
    
    res.send({status: 200, data: element})
    
} catch (err) {
    next(err) // throw globalError...
}




}


const  AddUserData= async (req, res, next)=>{

        const { suuid, roll, name, avatar } = student;

        

}

