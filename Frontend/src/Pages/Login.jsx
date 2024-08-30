import React, { useState } from 'react';
import '../Styles/Login.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

import Cookies from 'js-cookie';




function Login({ setProfile }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate() 

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!validateEmail(e.target.value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleFirstNameChange = (e) => {
        setfirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setlastName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (!validatePassword(e.target.value)) {
            setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            setImage(file);
            // const formData = new FormData();
            // formData.append('profilePicture', file);
    
            // // Example of sending the file to the backend
            // axios.post('https://yourapi.com/api/uploadProfilePicture', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            // .then(response => {
            //     console.log('File uploaded successfully');
            //     // Handle response
            // })
            // .catch(error => {
            //     console.error('Error uploading file:', error);
            //     // Handle error
            // });
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (emailError || passwordError || confirmPasswordError) {
    //         alert('Please fix the errors before submitting');
    //         return;
    //     }
    //     const profile = {
    //         firstName,
    //         lastName,
    //         email,
    //         image,
    //         password
    //     };
    //     try {
    //         if (isLogin) {
    //             console.log(email , password)
    //             const response = await axios.post('http://localhost:5000/user/login', { email, password } ,   {withCredentials: true});
                
               
    //         } else {
    //             console.log(firstName , lastName , email , password , image)
    //             const response = await axios.post('http://localhost:5000/user/register', { email, password, image, firstName, lastName } , 
    //             {headers: { 'Content-Type': 'multipart/form-data' }});
    //             const token = Cookies.get('token');
    //         if (token) {
    //             const decodedToken = jwt_decode(token);
    //             console.log(decodedToken); 
    //         }

    //         navigate("/books");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         alert(error.response.data.message);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError || passwordError || confirmPasswordError) {
            alert('Please fix the errors before submitting');
            return;
        }
        
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        if (!isLogin) {
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            if (image) {
                formData.append('image', image);
            }
        }
    
        try {
            let response;
            if (isLogin) {
                console.log(email, password);
                response = await axios.post('http://localhost:5000/user/login', formData, { withCredentials: true });
            } else {
                console.log(firstName, lastName, email, password, image);
                response = await axios.post('http://localhost:5000/user/register', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                });
            }
    
            if (response && response.data) {
                const token = response.data.token;
                Cookies.set('token', token, { expires: 7 });
    
                const decodedToken = jwt_decode(token);
                console.log(decodedToken);
    
                navigate("/books");
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || error.message;
            alert(errorMessage);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-container-unique">
            <div className="login-pic-unique">
                <img src="./src/assets/goodReads.jpg" alt="Login" />
            </div>
            <div className="login-form-unique">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="form-group-unique">
                                <label>First Name:</label>
                                <input type="text" name="firstName" onChange={handleFirstNameChange} required />
                            </div>
                            <div className="form-group-unique">
                                <label>Last Name:</label>
                                <input type="text" name="lastName" onChange={handleLastNameChange} required />
                            </div>
                            <div className="form-group-unique">
                                <label>Profile Picture:</label>
                                <input type="file" onChange={handleProfilePictureChange} />
                                {/* {image && <img src={image} alt="Profile" className="preview-img-unique" />} */}
                            </div>
                            {/* <div className="form-group-unique">
                                <label>Birth Date:</label>
                                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                            </div>
                            <div className="form-group-unique">
                                <label>Gender:</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div> */}
                        </>
                    )}
                    <div className="form-group-unique">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        {emailError && <p className="error-unique">{emailError}</p>}
                    </div>
                    <div className="form-group-unique">
                        <label>Password:</label>
                        <div className="password-container-unique">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <span className="password-toggle-icon-unique" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {passwordError && <p className="error-unique">{passwordError}</p>}
                    </div>
                    {!isLogin && (
                        <div className="form-group-unique">
                            <label>Confirm Password:</label>
                            <div className="password-container-unique">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                />
                                <span className="password-toggle-icon-unique" onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {confirmPasswordError && <p className="error-unique">{confirmPasswordError}</p>}
                        </div>
                    )}
                    <button className='reg-btn' type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>
                <div className="create-account-unique">
                    {isLogin ? (
                        <p>
                            Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Create one</a>
                        </p>
                    ) : (
                        <p>
                            Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login here</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
