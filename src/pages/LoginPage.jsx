import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function LoginPage(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e)=> setEmail(e.target.value);
  const handlePassword = (e)=> setPassword(e.target.value);

  const handleLoginSubmit = (e)=>{
    e.preventDefault();

    const requestBody  = {email, password, name};
    
    console.log(requestBody);
    
  };

  return(
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail}/>
        
        <label>password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword}/>
        
        <button>Sign Up</button>
      </form>

      <p>Don't have an account?</p>
      <Link to="/signup"> Signup</Link>
    </div>
  )
}

export default LoginPage;