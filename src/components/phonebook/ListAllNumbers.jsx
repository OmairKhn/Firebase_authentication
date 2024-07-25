import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListAllNumbers = () => {
  const [users, setUsers] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3003/users')
      .then(response => {
        setUsers(response.data); // Set the users state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Link to="/add-number">Add number</Link>zzl
      <h2>Phone numbers</h2>
    
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.number}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListAllNumbers;
