import React from 'react';

const Login = ({ username, password, setUsername, setPassword, onLogin, onRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="bodyContainer">
      <h2>Login</h2>
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
        <button className="custom-button" type="submit">Login</button>
        &nbsp;&nbsp;
        <button className="custom-button" type="button" onClick={onRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;