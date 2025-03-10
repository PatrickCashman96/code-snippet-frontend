import { useState, useEffect, createContext } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

function AuthProviderWrapper(props){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) =>{
    localStorage.setItem("authToken", token);
  }

  const authenticateUser = async ()=>{
    const storedToken = localStorage.getItem("authToken");

    if(storedToken){
      try{
        const response = await authService.verify(); 
        console.log("authenticated");
        const user = response.data;

        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);

      }catch(error){
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
        console.log("invalid token", error)
      }
    }else{
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
        console.log("!storedToken")
    }
  }

  const removeToken = ()=>{
    localStorage.removeItem("authToken")
  }

  const logOutUser = ()=>{
    removeToken();
    authenticateUser();
  }

  useEffect(()=>{
    authenticateUser();
  },[])

  return(
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export {AuthProviderWrapper, AuthContext}