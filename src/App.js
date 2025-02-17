// import logo from "./logo.svg";
import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthSerivice";
import LoginForm from "./components/LoginForm";
import AddEditRecipesForm from "./components/AddEditRecipesForm";

import "./App.css";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

function App() {
  const [user, setUser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  async function handleAddRecipe(newRecipe) {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );

      //todo

      alert(`Succesfully created recipe with ID = ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="App">
        <div className="title-row">
          <h1 className="title">Firebase Recipes</h1>
          <LoginForm existingUser={user}></LoginForm>
        </div>
        <div className="main">
          {
            user ? (
              <AddEditRecipesForm handleAddRecipe={handleAddRecipe} />
            ) : null
          }
        </div>
      </div>
    </>
  );
}

export default App;
