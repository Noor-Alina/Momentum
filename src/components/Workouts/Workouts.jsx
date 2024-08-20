import "./Workouts.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Workouts = () => {

    const [workouts, setWorkouts] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);
    const [workoutType, setWorkoutType] = useState('');
    const [workoutDifficulty, setWorkoutDifficulty] = useState('');
    const [error, setError] = useState('');


    const fetchAllWorkouts = async () => {
        try {
            const response = await axios.get(`${API_URL}/workouts/all`)
            const data = response.data;
            
            setWorkouts(data);
            setFilteredWorkouts(data);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const filterWorkouts = async () => {
        try {
            const response = await axios.get(`${API_URL}/workouts`, {
                params: {
                    workout_type: workoutType, 
                    difficulty: workoutDifficulty,
                }
            });

            const data = response.data;
            setFilteredWorkouts(data);
            setError('');

        } catch (error) {
            setError(error.response.data.error);
        }
    };


    useEffect(() => {
        fetchAllWorkouts();
    }, []);

 
    const handleFilter = () => {
        filterWorkouts();
    };

    return(
        <>
            
            <div className="Workouts">
            <h2 className="Workouts__heading">Build Your Workout Plan</h2>
                <div className="Workouts__filter-container">
                    <label className="Workouts__filter-label" htmlFor="workoutTypeDropdown">Workout Type</label>
                    <select className="Workouts__filter-dropdown"
                        id="workoutTypeDropdown"
                        value={workoutType}
                        onChange={e => setWorkoutType(e.target.value)}
                    >

                        <option value="">All</option>
                        <option value="Strength">Strength</option>
                        <option value="Core">Core</option>
                        <option value="Cardio">Cardio</option>

                    </select>

                    <label className="Workouts__filter-label" htmlFor="difficultyDropdown">Difficulty</label>
                    <select className="Workouts__filter-dropdown"
                        id="difficultyDropdown"
                        value={workoutDifficulty}
                        onChange={e => setWorkoutDifficulty(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    <button className="Workouts__filter-button" onClick={handleFilter}>Filter</button>

                </div>
                <div className="Workouts__content-container">
                <div className="Workouts__content-workoutList">
                    {filteredWorkouts.map(workout => (
                        <div key={workout.workout_id} className="Workouts__content-workout">
                            <h3 className="Workouts__content-workout--heading">{workout.workout_name}</h3>
                            <img className="Workouts__content-workout--image" src={`${API_URL}${workout.image_path}`} alt={workout.workout_name} />
                            <p className="Workouts__content-workout--type">Type: {workout.workout_type}</p>
                            <p className="Workouts__content-workout--type">Muscle: {workout.muscle}</p>
                            <p className="Workouts__content-workout--difficulty">Difficulty: {workout.difficulty}</p>
                            <p className="Workouts__content-workout--instructions">Instructions: {workout.instructions}</p>
                        </div>
                    ))}
                </div>
                </div>

            </div>
        </>
    )


};
export default Workouts;