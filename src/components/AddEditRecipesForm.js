import { useState, useEffect } from "react";

function AddEditRecipesForm({
  existingRecipe,
  handleAddRecipe,
  handleUpdateRecipe,
  handleEditRecipeCancel,
  handleDeleteRecipe,
}) {
  useEffect(() => {
    if(existingRecipe) {
      setName(existingRecipe.name);
      setCategory(existingRecipe.category);
      setDirections(existingRecipe.directions);
      // setPublishDate(existingRecipe.publishDate.toISOString().split("T")[0]);
      setIngredients(existingRecipe.ingredients);
    } else {
      resetForm();
    }
  }, [existingRecipe]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");

  function handleRecipeFormSubmit(e) {
    e.preventDefault();

    if (ingredients.length === 0) {
      alert("Missing Ingredients field, please double check.");
      return;
    }

    // const isPublished = new Date(publishDate) <= new Date() ? true : false;

    const newRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      // isPublished,
      ingredients,
    };

    if(existingRecipe) {
      handleUpdateRecipe(newRecipe, existingRecipe.id);
    } else {
      handleAddRecipe(newRecipe);
    }

    resetForm();
  }

  function handleAddIngredient(e) {
    if (e.key && e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    if (!ingredientName) {
      alert("Missing Ingredient field, please double check.");
      return;
    }

    setIngredients([...ingredients, ingredientName]);
    setIngredientName("");
  }

  function resetForm() {
    setName("");
    setCategory("");
    setDirections("");
    setPublishDate("");
    setIngredients([]);
  }
  return (
    <form
      onSubmit={handleRecipeFormSubmit}
      className="add-edit-recipe-form-container"
    >
      {existingRecipe ? <h2>Update the recipe</h2> : <h2>Add new Reecipe</h2>}
      <div className="top-form-section">
        <div className="fields">
          <label className="recipe-label input-label">
            Recipe Name:
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="recipe-label input-label">
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select"
              required
            >
              <option value=""></option>
              <option value="breadsSandwitchesAndPizza">
                Breads, Sandwitches, and Pizza
              </option>
              <option value="eggsAndBreakfast">Eggs & Breakfast</option>
              <option value="desertsAndBakedGoods">
                Desert and Baked Gooods
              </option>
              <option value="fishAndSeaFood">Fish and Seafood</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </label>
          <label className="recipe-label input-label">
            Directions:
            <textarea
              required
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              className="input-text directions"
            ></textarea>
          </label>
          <label className="recipe-label input-label">
            Publish Date:
            <input
              type="date"
              value={publishDate}
              required
              onChange={(e) => setPublishDate(e.target.value)}
              className="input-text"
            />
          </label>
        </div>
      </div>
      <div className="ingredients-list">
        <h3 className="text-center">Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th className="table-header">Ingredient</th>
              <th className="table-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingredients && ingredients.length > 0
              ? ingredients.map((ingredient) => {
                  return (
                    <tr key={ingredient}>
                      <td className="table-data text-center">{ingredient}</td>
                      <td className="ingredient-delete-box">
                        <button
                          type="button"
                          className="secondary-button ingredient-delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {ingredients && ingredients.length === 0 ? (
          <h3 className="text-center no-ingredients">
            No Ingredients Added Yet
          </h3>
        ) : null}
        <div className="ingredient-form">
          <label className="ingredient-label">
            Ingredient:
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              onKeyPress={handleAddIngredient}
              className="input-text"
              placeholder="ex. One cup of Tea"
            />
          </label>
          <button
            type="button"
            className="primary-button add-ingredients"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
      </div>
      <div className="action-buttons">
        <button type="submit" className="primary-button action-button">
          {existingRecipe ? "Update Recipe" : "Create Recipe"}
        </button>
        {existingRecipe ? (
          <>
            <button
              type="button"
              onClick={handleEditRecipeCancel}
              className="primary-button action-button"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDeleteRecipe(existingRecipe.id)}
              className="primary-button action-button"
            >
              Delete Recipe
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
}

export default AddEditRecipesForm;
