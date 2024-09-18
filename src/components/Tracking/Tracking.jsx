import "./Tracking.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


const Tracking = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async (accessToken) => {

        try {
            const response = await axios.get(`${API_URL}/fitbit/data?access_token=${accessToken}`);

            setData(response.data);
        } catch (error) {
            console.error("Failed to fetch data from Fitbit", error);
            setError("Failed to fetch data from Fitbit");
        } finally{
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');

        if (accessToken){
            fetchData(accessToken);
        }else{
            window.location.href = `${API_URL}/fitbit/auth`; 
        }
        
    }, []);

    if (loading) {
        return <p  className="Tracking__loading-message">Accessing Data...</p>;
    }
    
    if (error) {
        return <p className="Tracking__error-message">{error}</p>;
    }


    return (
      <div className="Tracking">
          <div className="Tracking__container">
              <h2 className="Tracking__heading">Track Your Fitness Progress</h2>
  
              <section className="Tracking__profile-card">
                  <div className="Tracking__profile-avatar">
                      {data.profile.user.fullName.charAt(0)}
                  </div>
                  <div className="Tracking__profile-info">
                      <h4 className="Tracking__profile-name">{data.profile.user.fullName}</h4>
                      <p className="Tracking__profile-details">
                          {data.profile.user.gender} | {data.profile.user.age} years | {data.profile.user.height} cm | {data.profile.user.weight} kg
                      </p>
                  </div>
              </section>
  
              <div className="Tracking__fitness-grid">
                  <section className="Tracking__section">
                      <h3 className="Tracking__section-title">Activity</h3>
                      <div className="Tracking__stat">
                          <span className="Tracking__stat-label">Steps</span>
                          <span className="Tracking__stat-value">{data.activity.summary.steps}</span>
                      </div>
                      <div className="Tracking__stat">
                          <span className="Tracking__stat-label">Distance</span>
                          <span className="Tracking__stat-value">{data.activity.summary.distances[0]?.distance} km</span>
                      </div>
                      <div className="Tracking__stat">
                          <span className="Tracking__stat-label">Calories Burned</span>
                          <span className="Tracking__stat-value">{data.activity.summary.caloriesOut} kcal</span>
                      </div>
                      <div className="Tracking__stat">
                          <span className="Tracking__stat-label">Active Minutes</span>
                          <span className="Tracking__stat-value">{data.activity.summary.activeMinutes} 1 minute</span>
                      </div>
                  </section>
  
                  <section className="Tracking__section">
                      <h3 className="Tracking__section-title">Nutrition</h3>
                      <div className="Tracking__stat">
                          <span className="Tracking__stat-label">Calories Consumed</span>
                          <span className="Tracking__stat-value">{data.nutrition.summary.calories} kcal</span>
                      </div>
                      <div className="Tracking__stat">
                          <span className="Tracking__stat-label">Carbohydrates</span>
                          <span className="Tracking__stat-value">{data.nutrition.summary.carbs} g</span>
                      </div>
                      <div className="Tracking__stat">
                          <span className="Tracking__stat-label">Protein</span>
                          <span className="Tracking__stat-value">{data.nutrition.summary.protein} g</span>
                      </div>
                      <div className="Tracking__stat">
                          <span className="Tracking__stat-label">Fat</span>
                          <span className="Tracking__stat-value">{data.nutrition.summary.fat} g</span>
                      </div>
                  </section>
  
                  <section className="Tracking__section">
                      <h3 className="Tracking__section-title">Food Log</h3>
                      {data.nutrition.foods.length > 0 ? (
                          <ul className="Tracking__food-list">
                              {data.nutrition.foods.map((food, index) => (
                                  <li key={index} className="Tracking__food-item">
                                      <span className="Tracking__food-name">{food.foodName}</span>
                                      <span className="Tracking__food-calories">{food.calories} kcal</span>
                                  </li>
                              ))}
                          </ul>
                      ) : (
                          <p>No food logged for today.</p>
                      )}
                  </section>
              </div>
          </div>
      </div>
  );
};

export default Tracking;
