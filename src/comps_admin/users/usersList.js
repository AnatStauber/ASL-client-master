import React,{ useState , useEffect }  from 'react'
import {  useSearchParams } from 'react-router-dom';

import { API_URL, doApiGet } from '../../services/apiService';
import CheckAdminComp from '../checkAdminComps'
import UserItem from './userItem';
import PageNav from '../../general_comps/pageNav';

export default function UsersList() {
  const [ar,setAr] = useState([]);
  const [querys] = useSearchParams();


  useEffect(() => {
    doApi();
  },[querys.get("page")])

  const doApi = async() => {
    let page = querys.get("page") || 1;
    let url = API_URL+"/users/usersList?page="+page;
    try{
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
    }
    catch(err){
      console.log(err);
      alert("there problem ,try again later")
    }

  }


  return (
    <div className='container'>
      <CheckAdminComp />
      <h1>List of users in systems</h1>
      <PageNav urlPageApi={API_URL+"/users/count"} perPage={5} navToDir="/admin/users?page=" cssClass="btn btn-info ms-2"  />

      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <UserItem key={item._id} doApi={doApi} index={i} item={item}/>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
