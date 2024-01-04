import React from "react";
import { useState } from "react";
import '../css/Login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Header.jsx";

function Login() {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [status, setStatus] = useState(undefined);

    const {uname, pass} = inputs;

    const handleChange = (e) => {
        setInputs({...inputs, [e.target.name]:[e.target.value]})
    }

    // allow the password typed to be shown or hidden
    const [showPassword, setShowPassword] = useState(false);

    // function to change password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);

        //backend section
        try {
            const response = await axios.post('/api/login', inputs);
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('userID', response.data.user._id);
            console.log(response)
            setInputs(response.data)
            const {user,  token} = response.data;
            console.log('Received user:', user._id, 'Recieved token: ', token);


            // If an auth token was sent back
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    // The response was a JSON object (with an access token)
                    setStatus({ type: 'success' });

                    // data has access token
                    // sends to profile dashboard page, but I didn't develop it so files for it not added
                    navigate('/profiledashboard', { state: { token, userID: user._id } });
            } else {
                   //Else block
                }
            } catch (e) {
                // Handle errors related to getting the response header
                setStatus({ type: 'error' });
                console.log("Cannot get the header for the form response");
            }
        } catch (error) {
            // Handle other errors during the authentication process
            setStatus({ type: 'error' });
            console.error("Error with posting login details");
        }

    }

    let navigate = useNavigate();

    // Function to change route to the registration page
    const routeChange = () => {
        let path = '/register';
        navigate(path);
    }

    return (
        <>
            <Header />  {/* Display the header component */}

            <main>
                <div className="login-container" >
                    <form onSubmit={handleSubmit}>
                        <div className="inputRow">
                            <label>User Name</label>
                            {/* Set max length for username and password to 15 characters */}
                            <input type="text" name="username" data-testid="username-input" value={uname} onChange={handleChange} {...{ required: true, maxLength: 15 }} />
                        </div>
                        <div className="inputRow">
                            <label>Password</label>
                            <input type={showPassword ? 'text' : 'password'} name="password" data-testid="password-input" value={pass} onChange={handleChange} {...{ required: true }} />

                        </div>
                        {/* toggle visibility of password */}
                        <div className="inputRow">
                            <span onClick={togglePasswordVisibility}
                                  className="password-toggle">
                            {showPassword ? 'Hide Password' : 'Show Password'}
                            </span>
                        </div>
                        <div className="inputRow">
                            <input type="submit" value="Login" />
                            <button type="button" onClick={routeChange}>Register</button>
                        </div>
                    </form>
                    {/* Display unique error messages from error handling */}
                    {status?.type === 'success' && <p>Successful Login!</p>}
                    {status?.type === 'error' && <p>Incorrect username or password, try again!</p>}

                    <div className="ForgotPasswordContainer">
                        <h4>Forgot password? contact (email here)</h4>
                    </div>
                    <br/>
                </div>
            </main>

        </>
    );
}

export default Login;  // Export the Login component
