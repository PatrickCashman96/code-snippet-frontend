import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar(){
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return(
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/snippets">
            <button>Snippets</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
        
      )}
      
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Signup</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}

    </nav>
  )
}

export default Navbar;