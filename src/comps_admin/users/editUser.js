import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import CheckAdminComp from '../checkAdminComps';


export default function EditUser() {
  const [info, setInfo] = useState({})
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const params = useParams();

  // בקשה בהתחלה שתשלוף את כל המידע של הטופס
  useEffect(() => {
    doApiInit();
  }, [])

  const doApiInit = async () => {
    // עושים בקשה לשרת בשביל למלא את הטופס עם המידע 
    // שנרצה לערוך עוד רגע לפריט
    let url = API_URL + "/users/byId/" + params["id"];
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setInfo(resp.data.user)
      console.log("info" , info)
      // console.log ("active", info.active)
    }
    catch(err){
      console.log(err.response);
      alert("There problem try come back later")
    }
  }

  const onSubForm = (bodyFormData) => {
    // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
    console.log(bodyFormData)
    doApiForm(bodyFormData);
  }

  const doApiForm = async (bodyFormData) => {
    let url = API_URL + "/users/" + params["id"];
    try {
      console.log(url)
      let resp = await doApiMethod(url, "PUT", bodyFormData)
      console.log(resp)
      if (resp.data) {
        alert("user updated successfuly");
        nav("/admin/users")
      }
      else {
        alert("There is a problem , try again later")
      }
    }
    catch (err) {
      console.log(err);
      alert("There is a problem, try again later")
    }
  }


return (

  <div className='container'>
    <CheckAdminComp />
    <h2>Edit category</h2>
    {info.email ? <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow'>
      <label>First name:</label>
      <input defaultValue={info.fullName.firstName} {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
      {errors.name && <div className='text-danger'>Enter valid name (min 2 chars) </div>}
      <label>Last name:</label>
      <input defaultValue={info.fullName.lastName} {...register("lastName", { required: true, minLength: 2 })} type="text" className='form-control' />
      {errors.lastName && <div className='text-danger'>Enter valid name (min 2 chars) </div>}
      <label>Email:</label>
      <input defaultValue={info.email} {...register("email", { required: true, minLength: 2 })} type="text" className='form-control' />
      {errors.email && <div className='text-danger'>Enter valid name (min 2 chars) </div>}
      <label>Password:</label>
      <input defaultValue={info.password} {...register("password", { required: true, minLength: 2 })} type="text" className='form-control' />
      {errors.password && <div className='text-danger'>Enter valid name (min 2 chars) </div>}
  
      <div className='mt-3'>
        <button className='btn btn-success me-5'>Update</button>
        <Link className='btn btn-danger' to="/admin/users">Back</Link>
      </div>
    </form> : <h2>Loading...</h2> }
  </div>
)
  

}