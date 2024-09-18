import './MealPlanDisplay.scss';
import React from 'react';


const MealPlanDisplay = ({ mealPlan }) => {

    if (!mealPlan || mealPlan.length === 0) {
        console.log("No meal plan");
        return <p>No meal plans available.</p>;
    }

    return (
        <div className="Meal-plan-display">
            {mealPlan.map((dayData, dayIndex) => (
                <div key={dayIndex}  className="Meal-plan-display__day">
                    <h2 className="Meal-plan-display__day-heading">Meal Plan for {dayData.day.charAt(0).toUpperCase() + dayData.day.slice(1)}</h2>
                    <div className="Meal-plan-display__meals">
                        {dayData.meals.map((meal, mealIndex) => (
                            <div key={mealIndex} className="Meal-plan-display__meal">
                                <h3 className="Meal-plan-display__meal-type">{meal.meal.charAt(0).toUpperCase() + meal.meal.slice(1)}</h3>
                                <p className="Meal-plan-display__meal-content"><strong>Name:</strong> {meal.name}</p>
                                <p className="Meal-plan-display__meal-content"><strong>Ingredients:</strong></p>
                                <ul className="Meal-plan-display__meal-ingrediant-list">
                                    {meal.ingredients.map((ingredient, itemIndex) => (
                                        <li className="Meal-plan-display__meal-ingrediant-item" key={itemIndex}>{ingredient}</li>
                                    ))}
                                </ul>  
                            </div> 
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

};
export default MealPlanDisplay;