import React, { useState } from "react";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState(''); // Removed 'any' default
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipe, setRecipe] = useState('');

    const createRecipe = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/generate-recipe?ingredients=${ingredients}&dietaryRestrictions=${dietaryRestrictions}&cuisine=${cuisine}`
            );
            const data = await response.text();
            setRecipe(data);
        } catch (error) {
            console.error("Error generating recipe: ", error);
        }
    };

    return (
        <div className="recipe-generator">
            <h2>Let's Get Cooking!</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="What's in your fridge? (comma separated)"
                    className="recipe-input"
                />
            </div>

            <div className="input-group">
                <input
                    type="text"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder="What cuisine? (Italian, Mexican, etc.)"
                    className="recipe-input"
                />
            </div>

            <div className="input-group">
                <input
                    type="text"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    placeholder="Any dietary needs? (vegan, gluten-free, etc.)"
                    className="recipe-input"
                />
            </div>

            <button 
                onClick={createRecipe} 
                className="cook-button"
                disabled={!ingredients} // Disable if no ingredients
            >
                🍳 Cook This Up!
            </button>

            {recipe && (
                <div className="output">
                    <h3>✨ Your Custom Recipe ✨</h3>
                    <pre className="recipe-text">{recipe}</pre>
                </div>
            )}
        </div>
    );
}

export default RecipeGenerator;