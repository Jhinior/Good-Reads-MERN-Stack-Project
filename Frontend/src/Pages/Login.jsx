

// import React, { useState } from 'react';
// import './index.css'; 
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons
// import axios from 'axios';

// function Login({ setProfile }) {
//     const [isLogin, setIsLogin] = useState(true);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [profilePicture, setProfilePicture] = useState('');
//     const [birthDate, setBirthDate] = useState('');
//     const [gender, setGender] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');
//     const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const validatePassword = (password) => {
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//         return passwordRegex.test(password);
//     };

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//         if (!validateEmail(e.target.value)) {
//             setEmailError('Invalid email format');
//         } else {
//             setEmailError('');
//         }
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//         if (!validatePassword(e.target.value)) {
//             setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character');
//         } else {
//             setPasswordError('');
//         }
//     };

//     const handleConfirmPasswordChange = (e) => {
//         setConfirmPassword(e.target.value);
//         if (e.target.value !== password) {
//             setConfirmPasswordError('Passwords do not match');
//         } else {
//             setConfirmPasswordError('');
//         }
//     };

//     const handleProfilePictureChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setProfilePicture(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (emailError || passwordError || confirmPasswordError) {
//             alert('Please fix the errors before submitting');
//             return;
//         }

//         const profile = {
//             email,
//             profilePicture,
//             birthDate,
//             gender
//         };

//         try {
//             if (isLogin) {
//                 const response = await axios.post('https://yourapi.com/api/login', { email, password });
//                 // Process login response
//                 setProfile(response.data);
//                 alert('Logged in successfully');
//             } else {
//                 const response = await axios.post('https://yourapi.com/api/register', { email, password, profilePicture, birthDate, gender });
//                 // Process registration response
//                 setProfile(response.data);
//                 alert('Registered successfully');
//             }
//         } catch (error) {
//             console.error(error);
//             alert('An error occurred. Please try again.');
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };

//     return (
//         <div className="login-container2">
//             <div className="login-pic2">
//                 <img src="./src/assets/goodReads.jpg" alt="Login" />
//             </div>
//             <div className="login-form2">
//                 <h2>{isLogin ? 'Login' : 'Register'}</h2>
//                 <form onSubmit={handleSubmit}>
//                     {!isLogin && (
//                         <>
//                             <div className="form-group2">
//                                 <label>First Name:</label>
//                                 <input type="text" name="firstName" required />
//                             </div>
//                             <div className="form-group2">
//                                 <label>Last Name:</label>
//                                 <input type="text" name="lastName" required />
//                             </div>
//                             <div className="form-group2">
//                                 <label>Profile Picture:</label>
//                                 <input type="file" onChange={handleProfilePictureChange} />
//                                 {profilePicture && <img src={profilePicture} alt="Profile" className="preview-img" />}
//                             </div>
//                             <div className="form-group2">
//                                 <label>Birth Date:</label>
//                                 <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
//                             </div>
//                             <div className="form-group2">
//                                 <label>Gender:</label>
//                                 <select value={gender} onChange={(e) => setGender(e.target.value)} required>
//                                     <option value="">Select Gender</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                             </div>
//                         </>
//                     )}
//                     <div className="form-group2">
//                         <label>Email:</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={email}
//                             onChange={handleEmailChange}
//                             required
//                         />
//                         {emailError && <p className="error">{emailError}</p>}
//                     </div>
//                     <div className="form-group2">
//                         <label>Password:</label>
//                         <div className="password-container">
//                             <input
//                                 type={passwordVisible ? 'text' : 'password'}
//                                 name="password"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                                 required
//                             />
//                             <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
//                                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                             </span>
//                         </div>
//                         {passwordError && <p className="error">{passwordError}</p>}
//                     </div>
//                     {!isLogin && (
//                         <div className="form-group2">
//                             <label>Confirm Password:</label>
//                             <div className="password-container2">
//                                 <input
//                                     type={passwordVisible ? 'text' : 'password'}
//                                     name="confirmPassword"
//                                     value={confirmPassword}
//                                     onChange={handleConfirmPasswordChange}
//                                     required
//                                 />
//                                 <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
//                                     {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                                 </span>
//                             </div>
//                             {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
//                         </div>
//                     )}
//                     <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
//                 </form>
//                 <div className="create-account2">
//                     {isLogin ? (
//                         <p>
//                             Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Create one</a>
//                         </p>
//                     ) : (
//                         <p>
//                             Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login here</a>
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;
import React, { useState } from 'react';
import '../Styles/Login.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons
import axios from 'axios';

function Login({ setProfile }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

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
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError || passwordError || confirmPasswordError) {
            alert('Please fix the errors before submitting');
            return;
        }

        const profile = {
            email,
            profilePicture,
            birthDate,
            gender
        };

        try {
            if (isLogin) {
                const response = await axios.post('http://localhost:5000/login', { email, password });
                // Process login response
                setProfile(response.data);
                alert('Logged in successfully');
            } else {
                const response = await axios.post('http://localhost:5000/register', { email, password, profilePicture, birthDate, gender });
                // Process registration response
                setProfile(response.data);
                alert('Registered successfully');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
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
                                <input type="text" name="firstName" required />
                            </div>
                            <div className="form-group-unique">
                                <label>Last Name:</label>
                                <input type="text" name="lastName" required />
                            </div>
                            <div className="form-group-unique">
                                <label>Profile Picture:</label>
                                <input type="file" onChange={handleProfilePictureChange} />
                                {profilePicture && <img src={profilePicture} alt="Profile" className="preview-img-unique" />}
                            </div>
                            <div className="form-group-unique">
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
                            </div>
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
