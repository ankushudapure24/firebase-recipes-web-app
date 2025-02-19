// import logo from "./logo.svg";
import { useEffect, useState } from "react";
import FirebaseAuthService from "./FirebaseAuthSerivice";
import LoginForm from "./components/LoginForm";
import AddEditRecipesForm from "./components/AddEditRecipesForm";

import "./App.css";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes()
      .then((fetchedRecipes) => {
        setRecipes(fetchedRecipes);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  }, [user]);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  // async function fetchRecipes() {
  //   let fetchedRecipes = [];

  //   try {
  //     const response = await FirebaseFirestoreService.readDocuments("recipes");

  //     const newRecipes = response.docs.map((recipeDoc) => {
  //       const id = recipeDoc.id;
  //       const data = recipeDoc.data();
  //       data.publishDate = new Date(data.publishDate.seconds * 1000);
  //       return { ...data, id };
  //     });

  //     fetchedRecipes = [...newRecipes];
  //   } catch (error) {
  //     console.error(error.message);
  //     throw error;
  //   }
  //   return fetchedRecipes;
  // }

  async function fetchRecipes() {
    let fetchedRecipes = [];

    try {
      const response = await FirebaseFirestoreService.readDocuments("recipes");

      if (response && response.docs) {
        const newRecipes = response.docs.map((recipeDoc) => {
          const id = recipeDoc.id;
          const data = recipeDoc.data();
          data.publishDate = new Date(data.publishDate.seconds * 1000);
          return { ...data, id };
        });

        fetchedRecipes = [...newRecipes];
      } else {
        console.warn("No documents found or response is undefined.");
      }
    } catch (error) {
      console.error("Failed to fetch recipes:", error.message);
      throw error;
    }

    return fetchedRecipes;
  }



  async function handleFetchRecipes() {
    try {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  } 

  async function handleAddRecipe(newRecipe) {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );

      handleFetchRecipes();

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
          <div className="center">
            <div className="recipe-list-box">
              {
                recipes && recipes.length > 0 ? (
                  <div className="recipe-list">
                    {
                      recipes.map((recipe) => {
                        return(
                          <div className="recipe-card" key={recipe.id}>
                            <div className="recipe-name">{recipe.name}</div>
                            <div className="recipe-field">Category:{recipe.category}</div>
                            <div className="recipe-field">Publish Date:{recipe.publishDate.toString()}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                ) : <p>No recipes found</p>
              }
            </div>
          </div>
          {user ? (
            <AddEditRecipesForm handleAddRecipe={handleAddRecipe} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
