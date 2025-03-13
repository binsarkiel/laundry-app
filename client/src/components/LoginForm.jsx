import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { KeyRound, LogIn, User } from "lucide-react";

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
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-8 text-primary">
        Login to your account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="form-control">
          <label className="input validator w-full" htmlFor="username">
            <User />
            <input
              id="username"
              type="text"
              required
              placeholder="Username"
              title="Must be 3 to characters, containing only letters, number or dash"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
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
        <div className="form-control">
          <label className="input validator w-full" htmlFor="password">
            <KeyRound />
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
        <button className="btn w-full gap-2 btn-primary" type="submit">
          <LogIn />
          Sign In
        </button>
      </form>

      <div className="divider my-8">OR</div>

      <p className="text-center">
        Don't have an account?{' '}
        <Link to="/register" className="link link-primary font-semibold">Register</Link>
      </p>
    </div>
  );
}

export default LoginForm;
