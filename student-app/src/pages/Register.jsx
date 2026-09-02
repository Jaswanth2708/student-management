
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {

    setError("");
    setMessage("");

    if (!username || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    fetch("http://localhost:5000/api/register", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username,
        password,
        role: "user"
      })

    })

      .then((response) => {

        return response.json().then((data) => {

          if (!response.ok) {
            throw new Error(
              data.error || "Registration failed"
            );
          }

          return data;

        });

      })

      .then((data) => {

        console.log(data);

        setMessage(
          "Registration successful! Redirecting to login..."
        );

        setUsername("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      })

      .catch((error) => {

        console.error(error);

        setError(error.message);

      });
  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1>
          🎓 Student Management
        </h1>

        <h2>
          Register
        </h2>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {message && (
          <p className="register-success">
            {message}
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button onClick={handleRegister}>
          Register
        </button>

        <p className="register-login">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Register;

