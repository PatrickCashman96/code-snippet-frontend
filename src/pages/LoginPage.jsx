import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function LoginPage(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMeassage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = (e)=> setEmail(e.target.value);
  const handlePassword = (e)=> setPassword(e.target.value);

  const handleLoginSubmit = async (e)=>{
    e.preventDefault();

    const requestBody  = {email, password, name};
    
    try{
      // const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      const response = await authService.login(requestBody);
      console.log("JWT token:", response.data.authToken);
      
      storeToken(response.data.authToken);
      
      authenticateUser();
      
      navigate("/")
    }catch(error){
      const errorDescriptioin = error.response.data.message;
      setErrorMessage(errorDescriptioin); 
    }
    
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