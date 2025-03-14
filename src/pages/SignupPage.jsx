import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

function SignupPage(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e)=> setEmail(e.target.value);
  const handlePassword = (e)=> setPassword(e.target.value);
  const handleName = (e)=> setName(e.target.value);

  const handleSignupSubmit = async (e)=>{
    e.preventDefault();

    const requestBody  = {email, password, name};
    
    console.log(requestBody);
    
    try {
      const response = await authService.signup(requestBody);
      navigate('/login')
    } catch (error) {
      const errorDescription = error.response?.data?.message;
      setErrorMessage(errorDescription)
    }

  };

  return(
    <div className="SignupPage">
      <h1>SignUp</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} required={true}/>

        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} required={true}/>

        <label>password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} required={true}/>
        
        <button>Sign Up</button>
      </form>

      {errorMessage && <p className="error-Message">{errorMessage}</p>}
      <p>Already have an account?</p>
      <Link to="/login"> Login</Link>
    </div>
  )
}

export default SignupPage;