import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import SnippetPage from "./SnippetPage";

function LoginPage(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = (e)=> setEmail(e.target.value);
  const handlePassword = (e)=> setPassword(e.target.value);

  const handleLoginSubmit = async (e)=>{
    e.preventDefault();

    const requestBody  = {email, password};
    
    try{
      const response = await authService.login(requestBody);      
      storeToken(response.data.authToken);      
      await authenticateUser();      
      navigate("/snippets")
    }catch(error){
      console.log("login error",error)
      const errorDescriptioin = error.response.data.message;
      setErrorMessage(errorDescriptioin); 
    }
    
  };

  return(
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} required={true}/>
        
        <label>password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} required={true}/>
        
        <button>Login</button>
      </form>

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      <p>Don't have an account?</p>
      <Link to="/signup"> Signup</Link>
    </div>
  )
}

export default LoginPage;