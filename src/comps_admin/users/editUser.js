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

      let resp = await doApiMethod(url, "PUT", bodyFormData)
      if (resp.data) {
        alert("user update succefuly");
        nav("/admin/users")
      }
      else {
        alert("There problem , try again later")
      }
    }
    catch (err) {
      console.log(err);
      alert("There problem , or category url already in system")
    }
  }


  return (
  <div>
    <h2> active:  {info.active ? 'true' : 'false'}</h2>
    <h2> {info.email} </h2>
    <h2> date: {info.date_created}</h2>
    <h2> name: {info.fullName.firstName}</h2>
 </div>  
 
)
  

}