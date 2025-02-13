import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthSerivice";
// import firebase from "firebase/compat/app";

function LoginForm({ existingUser }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await FirebaseAuthService.loginUser(username, password);
      setUserName("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  }

  function handleLogout() {
    FirebaseAuthService.logoutUser();
  }

  async function handleSendResetPasswordEmail() {
    if (!username) {
      alert("Missing Username!");
      return;
    }
    try {
      await FirebaseAuthService.sendPasswordReset(username);
      alert("Sent the password reset email");
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome, {existingUser.email}</h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button
              type="button"
              onClick={handleSendResetPasswordEmail}
              className="primary-button"
            >
              ResetPassword
            </button>
            <button className="primary-button">Login</button>
          </div>
        </form>
      )}
    </div>
  );
}
export default LoginForm;
