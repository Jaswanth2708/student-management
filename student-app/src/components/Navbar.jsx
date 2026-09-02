
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        🎓 Student Management System
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/students">Students</Link>

        <Link to="/about">About</Link>

        <Link to="/attendance">Attendance</Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;

