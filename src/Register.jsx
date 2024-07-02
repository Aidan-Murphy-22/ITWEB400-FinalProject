import React from 'react';

const Register = ({ username, password, setUsername, setPassword, onRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="bodyContainer">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="userName">
          <label htmlFor="username">Username:</label>
          <input 
            className='inputDesign'
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}  
            required 
          />
        </div>
        <br />
        <div className="passWord">
          <label htmlFor="password">Password:</label>
          <input 
            className='inputDesign'
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <br />
        <button className="custom-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
