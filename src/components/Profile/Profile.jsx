import "./Profile.scss";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        password: ''
    });

    const fetchUserProfile = async () => {
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.get(`${API_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
                setUser(response.data); 
                setFormData({
                    user_name: response.data.user_name,
                    user_email: response.data.user_email,
                    password: '' 
                });

        } catch (error) {
            setError("Error fetching User profile", error);
        } 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.put(`${API_URL}/user/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                alert('Profile updated successfully!');
                fetchUserProfile(); 
            }else{
                alert('Failed to update profile.');
            }
        }catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        fetchUserProfile(); 
    }, []);


    return (
        <div className="profile">
            {user && (
                <>
                    <div className="profile__info">
                        <h2 className="profile__info-header">Welcome {user.user_name}!</h2>
                    </div> 

                    <div className="profile__update">
                        <form className="profile__form" onSubmit={handleUpdate}>
                            <label className="profile__form-input-label" htmlFor="user_name">Name:</label>
                            <input className="profile__form-input"
                                type="text"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleChange}
                                required
                            /><br />

                            <label className="profile__form-input-label" htmlFor="user_email">Email:</label>
                            <input className="profile__form-input"
                                type="email"
                                name="user_email"
                                value={formData.user_email}
                                onChange={handleChange}
                                required
                            /><br />

                            <label className="profile__form-input-label" htmlFor="password">Password:</label>
                            <input className="profile__form-input"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                            /><br />

                            <div className="profile__form-button-container">
                                <button className="profile__form-button" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};
export default Profile;