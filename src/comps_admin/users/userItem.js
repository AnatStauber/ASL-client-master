import React, { useState } from 'react'
import { API_URL, doApiMethod } from '../../services/apiService';
import { Link } from 'react-router-dom';


export default function UserItem(props) {
  let item = props.item;




  const onDelClick = async () => {
    if (window.confirm("Are you sure you want to delete: " + item.fullName.firstName + " " + item.fullName.firstName)) {
      try {
        let url = API_URL + "/users/" + item._id;
        let resp = await doApiMethod(url, "DELETE");
        console.log(resp.data);
        if (resp.data.matchedCount === 1) {
          props.doApi();
        }
      }
      catch (err) {
        alert("There problem, or you try to delete superAdmin");

        console.log(err.response);
        // alert("There problem , try again later")
      }

    }
  }

  const onActivateClick = async () => {
    if (window.confirm("Are you sure you want to reactivate: " + item.fullName.firstName + " " + item.fullName.firstName)) {
      try {
        let url = API_URL + "/users/changeActive/" + item._id;
        let bodyData = { userID: item._id , active: true}
        let resp = await doApiMethod(url, "PATCH", bodyData);
        console.log(resp.data);
        if (resp.data.matchedCount === 1) {
          props.doApi();
        }
      }
      catch (err) {
        alert("There is a problem, try again later");

        console.log(err.response);
        // alert("There problem , try again later")
      }

    }
  }

  // משנה תפקיד של משתמש
  const onRoleClick = async () => {
    let bodyData;
    if (item.role === "user") {
      bodyData = { role: "admin" }
    }
    else {
      bodyData = { role: "user" }
    }

    let url = API_URL + "/users/changeRole/" + item._id;
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData)
      console.log(resp.data)
      if (resp.data) {
        props.doApi()
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem, or you try to change superAdmin to user");
    }
  }

  return (
    <tr>

      <td>{props.index + 1}</td>
      <td>{item.fullName.firstName} - {item.fullName.lastName}</td>
      <td>{item.email}</td>
      <td>
        <button onClick={onRoleClick}>
          {item.role}
        </button>
      </td>

      <td>{String(item.active)}</td>
      <td>
   
        <Link className='btn btn-info me-2' to={"/admin/editUser/" + item._id} >Edit</Link>
        {(item.active) ? (
           <button onClick={() => { onDelClick() }} className='badge bg-danger'>Delete</button>
        ) : (
          <button onClick={() => { onActivateClick() }} className='badge bg-success'>ReActivate</button>
        )}
       
      </td>
    </tr>
  )
}
