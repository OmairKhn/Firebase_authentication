import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddNumber = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3003/users", { name, number: phone })
      .then(result => {    
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Link to="/">View phonebook</Link>
      <h2>Add Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br />
        <button type="submit">Add number</button>
      </form>
    </div>
  );
};

export default AddNumber;
