import "./MealPlanning.scss";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealPlanDisplay from "../MealPlanDisplay/MealPlanDisplay";

const API_URL = import.meta.env.VITE_API_URL;

const MealPlanning = () => {
    const [dietType, setDietType] = useState('high protein');
    const [days, setDays] = useState(1);
    const [mealPreference, setMealPreference] = useState('none');
    const [mealPlan, setMealPlan] = useState([]); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedMealPlan = localStorage.getItem('lastMealPlan');
        if (storedMealPlan) {
            setMealPlan(JSON.parse(storedMealPlan)); 
        }
    }, []);

    const handleDietTypeChange = (e) => {
        setDietType(e.target.value);
    };

    const handleDaysChange = (e) => {
        setDays(e.target.value);
    };

    const handleMealPreferenceChange = (e) => {
        setMealPreference(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

         const requestData = {
            dietType,
            days,
            mealPreference
        };

        try {
            const response = await axios.post(`${API_URL}/gemini/generate-content`, requestData);
            console.log(response.data.content);
            const data = response.data.content;
            const parsedMealPlan = parseTextTOMealPlan(data);
            setMealPlan(parsedMealPlan);
            localStorage.setItem('lastMealPlan', JSON.stringify(parsedMealPlan));
            
        } catch (error) {
            console.error('Error generating meal plan:', error);
            setError('Failed to generate meal plan. Please try again.');
        }finally {
            setLoading(false);
        }
    };

    const parseTextTOMealPlan = (data) => {
        let cleanedData = data.replace(/```json|```/g, '')
                                .replace(/(\w+):/g, '"$1":') 
                                .replace(/:\s*'([^']+)'/g, ': "$1"') 
                                .replace(/:\s*"([^"]+)"/g, ': "$1"') 
                                .replace(/"(\d+)":\s*"(\d+)"\s*([AP]M)/g, '')
                                .replace(/:\s*([0-9]+)(g|%|ml)?/g, ': "$1$2"') 
                                .replace(/,\s*}/g, '}') 
                                .replace(/,\s*]/g, ']')
                                .replace(/:\s*"(\d+):(\d+)"\s*([AP]M)/g, ': "$1:$2 $3"')                           
                                .replace(/"time":\s*"[^"]*"(,?)/g, '')
                                .replace(/"(\d+)":\s*"(\d+)"\s*([AP]M)/g, '')
                                .replace(/"([^"]+)":\s*("[^"]*"|\d+g?|\d+%?|\d+ml?)(?=\s*"[a-zA-Z]+":)/g, '$&,')
                                .trim(); 
                
        const lastBraceIndex = cleanedData.lastIndexOf('}');
                
        if (lastBraceIndex !== -1) {
            cleanedData = cleanedData.substring(0, lastBraceIndex + 1);
        }
                
        if (!cleanedData.startsWith('[')) {
            cleanedData = '[' + cleanedData + ']';
        }

        try {
            const mealPlanObj = JSON.parse(cleanedData);
            return mealPlanObj;
        } catch (error) {
            console.error('Error parsing meal plan:', error);
            setError('Failed to generate meal plan. Please try again.');

        }                       
    };

    return (
        <div className="MealPlanning">
                <h2 className="MealPlanning__heading">Create Your Meal Plan</h2>
            <div className="MealPlanning__form-container">
                <form  className="MealPlanning__form" onSubmit={handleSubmit}>
                    <label className="MealPlanning__form-label">
                        Diet
                    </label>
                        <select className="MealPlanning__form-dropdown" value={dietType} onChange={handleDietTypeChange}>
                            <option value="high protein">High Protein</option>
                            <option value="low carb">Low Carb</option>
                            <option value="keto">Keto</option>
                            <option value="vegan">Vegan</option>
                            <option value="paleo">Paleo</option>
                
                        </select>
                    <label className="MealPlanning__form-label">
                        Number of Days
                    </label>
                        <input className="MealPlanning__form-input"
                            type="number"
                            value={days}
                            onChange={handleDaysChange}
                            min="1"
                            max="7"
                        />
                    <label className="MealPlanning__form-label">
                        Preference
                    </label>
                        <select className="MealPlanning__form-dropdown" value={mealPreference} onChange={handleMealPreferenceChange}>
                            <option value="none">None</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="gluten-free">Gluten-Free</option>
                            <option value="dairy-free">Dairy-Free</option>
                        </select>
                    <button className="MealPlanning__form-button" type="submit">Generate</button>
                </form>
            </div>
            {loading && <p className="MealPlanning__loading-message">Generating meal plan...</p>}
            {error && <p className="MealPlanning__error-message">{error}</p>}
            {!loading && mealPlan && mealPlan.length > 0 && <MealPlanDisplay mealPlan={mealPlan} />}
        </div>
    );
};

export default MealPlanning;