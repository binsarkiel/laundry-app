// frontend/src/components/LoginForm.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    const result = await login(username, password);
    if (result.success) {
      navigate("/"); // Redirect ke home setelah login berhasil
    } else {
      setError(result.message); // Set error message
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4 mx-2">

          <label className="input validator" htmlFor="username">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              id="username"
              type="text"
              required
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <p className="validator-hint hidden">
            Must be 3 to 30 characters
            <br />
            containing only letters, number or dash
          </p>
          </div>
          <div className="mb-6 mx-2">
            <label className="input validator" htmlFor="password">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                id="password"
                type="password"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>
          </div>
          <div className="flex items-center justify-center ">
            <button
              className="btn btn-outline btn-primary"
              type="submit"
            >
              Submit
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
