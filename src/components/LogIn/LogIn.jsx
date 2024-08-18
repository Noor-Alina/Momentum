import "./LogIn.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LogIn = () => {
    const { logIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogIn = async (event) => {
        event.preventDefault();

        try {
            await logIn(email, password); 
            navigate('/Workouts');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="LogIn">
        <div className="LogIn__container">
            <div className="LogIn__container-background"></div>
            <div className="LogIn__container-form">
                <div className="LogIn__container-form-form">
                    <h1 className="LogIn__heading">Welcome Back!</h1>
                    <form className="LogIn__form" onSubmit={handleLogIn}>

                        <input className="LogIn__form-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input className="LogIn__form-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button  className="LogIn__form-button" type="submit">Log In</button>

                    </form>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    </div>
    );
};

export default LogIn;