import "./SignUp.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {

    const {logIn} = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/auth/SignUp`, {user_name: name, user_email: email, password: password});

            if (response.status === 201){
                await logIn(email, password);
                navigate('/Workouts');
            }
        } catch (error) {
            setError(error.response ? error.response.data.error : 'An error occurred. Please SignUp again.');
        }
        
    }

    return(
        <div className="SignUp">
            <div className="SignUp__container">
                <div className="SignUp__container-background"></div>
                <div className="SignUp__container-form">
                    <div className="SignUp__container-form-form">
                        <h1 className="SignUp__heading">Welcome!</h1>
                        <form className="SignUp__form" onSubmit={handleSignUp}>

                            <input className="SignUp__form-input"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <input className="SignUp__form-input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input className="SignUp__form-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button  className="SignUp__form-button" type="submit">Sign Up</button>

                        </form>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default SignUp;