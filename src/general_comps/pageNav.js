import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { doApiGet, doApiMethod } from '../services/apiService';

export default function PageNav(props) {
  const [pages,setPages] = useState(0);
  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = props.urlPageApi;
    let resp = await doApiGet(url);
    console.log(resp.data.count)
    let totalPages = Math.ceil(resp.data.count/props.perPage)
    // מגדיר את מספר העמודים
    setPages(totalPages);

    console.log(resp.data); 
  }


  return (
    <div>
      <span>Page:</span>
      {/* נרצה לעשות לולאה לפי מספר העמודים ולייצר לינקים */}
      {/* [...Array(pages)] -> מייצר מערך זמני לפי מספר כדי שנוכל לבצע על מספר לולאה כערך המספר */}
      {[...Array(pages)].map((item,i) => {
        return(
          <Link to={props.navToDir + (i+1)} className={props.cssClass} key={i}>{i+1}</Link>
        )
      })}
    </div>
  )
}
