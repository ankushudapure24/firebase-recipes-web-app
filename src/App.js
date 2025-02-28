import { useEffect, useState } from "react";
import FirebaseAuthService from "./FirebaseAuthSerivice";
import LoginForm from "./components/LoginForm";
import AddEditRecipesForm from "./components/AddEditRecipesForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

 
  useEffect(() => {
    FirebaseAuthService.subscribeToAuthChanges(setUser);
  }, []);


  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
  }, [user, categoryFilter]);

  
  const fetchRecipes = async () => {
    try {
      console.log("Fetching recipes...");
      const fetchedRecipes = await FirebaseFirestoreService.readDocuments(
        "recipes"
      );

      console.log("Fetched recipes:", fetchedRecipes);
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Failed to fetch recipes:", error.message);
    }
  };

  //additional changes                                    
  // function handleFetchRecipes() {
  //   return fetchRecipes;
  // }


   
  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );
      console.log("Successfully created recipe with ID:", response.id);
      fetchRecipes(); // Refresh recipes after adding
    } catch (error) {
      console.error("Error adding recipe:", error.message);
    }
  };

  async function handleUpdateRecipe(newRecipe, recipeId) {
    try {
      await FirebaseFirestoreService.updateDocument(
        "recipes",
        recipeId,
        newRecipe
      );

      fetchRecipes(); // Refresh recipes after adding

      alert(`Succesfully updated recipe with ID = ${recipeId}`);
      setCurrentRecipe(null);
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }

  function handleEditRecipeClick(recipeId) {
    const selectedRecipe = recipes.find((recipe) => {
      return recipe.id === recipeId;
    });

    if(selectedRecipe) {
      setCurrentRecipe(selectedRecipe);
      window.scrollTo(0, document.body.scrollHeight);     
    }
  }

  function handleEditRecipeCancel() {
    setCurrentRecipe(null);
  }

  async function handleDeleteRecipe(recipeId) {
    const deleteConfirmation = window.confirm(
      "Are you sure you want to delete ?"
    );
    
    if(deleteConfirmation) {
      try {
        await FirebaseFirestoreService.deleteDocument("recipes", recipeId);

        fetchRecipes(); // Refresh recipes after delete

        setCurrentRecipe(null);

        window.scrollTo(0, 0);

        alert(`Succesfully deleted recipe with ID = ${recipeId}`);
      } catch (error) {
        alert(error.message);
        throw error;
      }
    }
  }

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
      <div className="main">
        <div className="center">
          <div className="recipe-list-box">
            {recipes.length > 0 ? (
              <div className="recipe-list">
                {recipes.map((recipe) => (
                  <div className="recipe-card" key={recipe.id}>
                    <div className="recipe-name">{recipe.name}</div>
                    <div className="recipe-field">
                      Category: {recipe.category}
                    </div>
                    <div className="recipe-field">
                      Publish Date:{" "}
                      {recipe.publishDate
                        ? new Date(
                            recipe.publishDate.seconds * 1000
                          ).toLocaleDateString("en-US")
                        : "N/A"}
                    </div>
                    {user ? (
                      <button
                        type="button"
                        onClick={() => handleEditRecipeClick(recipe.id)}
                        className="primary-button edit-button"
                      >
                        EDIT
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p>No recipes found</p>
            )}
          </div>
        </div>
        {user && (
          <AddEditRecipesForm
            existingRecipe={currentRecipe}
            handleAddRecipe={handleAddRecipe}
            handleUpdateRecipe={handleUpdateRecipe}
            handleEditRecipeCancel={handleEditRecipeCancel}
            handleDeleteRecipe={handleDeleteRecipe}
          />
        )}
      </div>
    </div>
  );
}

export default App;

// // import logo from "./logo.svg";
// import { useEffect, useState } from "react";
// import FirebaseAuthService from "./FirebaseAuthSerivice";
// import LoginForm from "./components/LoginForm";
// import AddEditRecipesForm from "./components/AddEditRecipesForm";

// import "./App.css";
// import FirebaseFirestoreService from "./FirebaseFirestoreService";

// function App() {
//   const [user, setUser] = useState(null);
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     console.log("Fetching recipes for user:", user);
//     fetchRecipes()
//       .then((fetchedRecipes) => {
//         console.log("Fetched recipes:", fetchedRecipes);
//         setRecipes(fetchedRecipes);
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error.message);
//       });
//   }, [user]);

//   FirebaseAuthService.subscribeToAuthChanges(setUser);

//   async function fetchRecipes() {
//     let fetchedRecipes = [];

//     try {
//       const response = await FirebaseFirestoreService.readDocuments("recipes");

//       if (response && response.docs) {
//         const newRecipes = response.docs.map((recipeDoc) => {
//           const id = recipeDoc.id;
//           const data = recipeDoc.data();
//           data.publishDate = new Date(data.publishDate.seconds * 1000);
//           return { ...data, id };
//         });

//         fetchedRecipes = [...newRecipes];
//       } else {
//         console.warn("No documents found or response is undefined.");
//       }
//     } catch (error) {
//       console.error("Failed to fetch recipes:", error.message);
//       throw error;
//     }

//     return fetchedRecipes;
//   }

//   async function handleFetchRecipes() {
//     try {
//       const fetchedRecipes = await fetchRecipes();
//       setRecipes(fetchedRecipes);
//     } catch (error) {
//       console.error(error.message);
//       throw error;
//     }
//   }

//   async function handleAddRecipe(newRecipe) {
//     try {
//       const response = await FirebaseFirestoreService.createDocument(
//         "recipes",
//         newRecipe
//       );

//       handleFetchRecipes();

//       alert(`Succesfully created recipe with ID = ${response.id}`);
//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   return (
//     <>
//       <div className="App">
//         <div className="title-row">
//           <h1 className="title">Firebase Recipes</h1>
//           <LoginForm existingUser={user}></LoginForm>
//         </div>
//         <div className="main">
//           <div className="center">
//             <div className="recipe-list-box">
//               {
//                 recipes && recipes.length > 0 ? (
//                   <div className="recipe-list">
//                     {
//                       recipes.map((recipe) => {
//                         return(
//                           <div className="recipe-card" key={recipe.id}>
//                             <div className="recipe-name">{recipe.name}</div>
//                             <div className="recipe-field">Category:{recipe.category}</div>
//                             <div className="recipe-field">Publish Date:{recipe.publishDate.toString()}</div>
//                           </div>
//                         )
//                       })
//                     }
//                   </div>
//                 ) : <p>No recipes found</p>
//               }
//             </div>
//           </div>
//           {user ? (
//             <AddEditRecipesForm handleAddRecipe={handleAddRecipe} />
//           ) : null}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
