import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(){
  
  return(
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      
      <Link to="/signup">
        <button>Signup</button>
      </Link>

      <Link to="/login">
        <button>Login</button>
      </Link>

    </nav>
  )
}

export default Navbar;