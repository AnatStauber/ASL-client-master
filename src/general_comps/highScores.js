import React, { useEffect, useState, useContext } from 'react';
import { API_URL, doApiGet } from '../services/apiService';
import './highScores.css';
import jwt_decode from 'jwt-decode'
import { AuthContext } from '../context';


export default function HighScores() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [data, setData] = useState([]); // הגדרת משתנה state למידע

  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let url = API_URL + '/scores/getMaxScore';
      let resp = await doApiGet(url); // המתנה לסיום הבקשה עם await
      console.log(resp.data);
      setData(resp.data); // עדכון המידע במשתנה הstate
    } catch (err) {
      console.log(err.response);
      alert('יש בעיה, נסי שוב מאוחר יותר');
    }

  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person, index) => {
          const formattedDate = new Date(person.date_created).toLocaleDateString("en-GB");
  
          return (
            <tr key={index}>
              <td>{person.user_id.fullName.firstName} {person.user_id.fullName.lastName}</td>
              <td>{person.score}</td>
              <td>{formattedDate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}