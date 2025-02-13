// import logo from "./logo.svg";
import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthSerivice";
import LoginForm from "./components/LoginForm";

import "./App.css";

function App() {
  const [user, setUsser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUsser);

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
    </div>
  );
}

export default App;
