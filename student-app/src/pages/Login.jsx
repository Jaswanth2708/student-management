import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (!username || !password) {

      setError("Please enter username and password");

      return;
    }

    fetch("http://localhost:5000/api/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username,
        password
      })

    })

      .then((response) => {

        if (!response.ok) {
          throw new Error("Invalid username or password");
        }

        return response.json();

      })

      .then((data) => {

        console.log(data);

        // Save logged-in user
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(data.user)
        );

        // Go to Home
        navigate("/");

      })

      .catch((error) => {

        console.error(error);

        setError(
          "Invalid username or password"
        );

      });
  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1>
          🎓 Student Management
        </h1>

        <h2>
          Login
        </h2>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>
<p className="register-link">
  Don't have an account?{" "}
  <Link to="/register">
    Register
  </Link>
</p>
      </div>

    </div>

  );
}

export default Login;