import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function SignupPage(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmail = (e)=> setEmail(e.target.value);
  const handlePassword = (e)=> setPassword(e.target.value);
  const handleName = (e)=> setName(e.target.value);

  const handleSignupSubmit = (e)=>{
    e.preventDefault();

    const requestBody  = {email, password, name};
    
    console.log(requestBody);
    
  };

  return(
    <div className="SignupPage">
      <h1>SignUp</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName}/>

        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail}/>

        <label>password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword}/>
        
        <button>Sign Up</button>
      </form>

      <p>Already have an account?</p>
      <Link to="/login"> Login</Link>
    </div>
  )
}

export default SignupPage;