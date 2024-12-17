import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { backendUrl, setShowLogin, setToken, setUser } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Login') {
                const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                } else {
                    toast.error(data.message);
                }
            } else if (state === 'Sign Up') {
                const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                } else {
                    toast.error(data.message);
                }
            } else if (state === 'Forgot Password') {
                const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
                if (data.success) {
                    toast.success('Reset password email sent!');
                    setState('Login');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <motion.form
                onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-white p-10 rounded-xl text-slate-500 border-2 border-yellow-500">
                <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
                <p className="text-sm mt-4 mb-2">
                    You're welcome! Please <span>{state}</span> to continue
                </p>

                {state === 'Sign Up' && (
                    <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                        <FontAwesomeIcon icon={faUser} style={{ color: '#b9b9b9' }} />
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            className="outline-none text-sm"
                            placeholder="First Name"
                            required
                        />
                    </div>
                )}

                {(state === 'Sign Up' || state === 'Login' || state === 'Forgot Password') && (
                    <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#b9b9b9' }} />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            className="outline-none text-sm"
                            placeholder="Email id"
                            required
                        />
                    </div>
                )}

                {(state === 'Sign Up' || state === 'Login') && (
                    <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 relative">
                        <FontAwesomeIcon icon={faLock} style={{ color: '#b9b9b9' }} />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type={passwordVisible ? 'text' : 'password'}
                            className="outline-none text-sm w-full"
                            placeholder="Password"
                            required
                        />
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEyeSlash : faEye}
                            className="absolute right-4 cursor-pointer"
                            style={{ color: '#b9b9b9' }}
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                )}

                {state === 'Login' && (
                    <p className="text-sm text-yellow-500 my-4 cursor-pointer" onClick={() => setState('Forgot Password')}>
                        Forgot password
                    </p>
                )}

                <button className="bg-yellow-500 w-full text-white py-2 mt-4 rounded-full hover:bg-gradient-to-r from-yellow-500 to-orange-400">
                    {state === 'Login' ? 'Login' : state === 'Sign Up' ? 'Create Account' : 'Send Reset Link'}
                </button>

                {state === 'Login' ? (
                    <p className="mt-5 text-center">
                        Don't have an account?{' '}
                        <span className="text-yellow-500 cursor-pointer" onClick={() => setState('Sign Up')}>
                            Sign up
                        </span>
                    </p>
                ) : state === 'Sign Up' ? (
                    <p className="mt-5 text-center">
                        Already have an account?{' '}
                        <span className="text-yellow-500 cursor-pointer" onClick={() => setState('Login')}>
                            Login
                        </span>
                    </p>
                ) : (
                    <p className="mt-5 text-center">
                        Remembered your password ?{' '}
                        <span className="text-yellow-500 cursor-pointer" onClick={() => setState('Login')}>
                            Login
                        </span>
                    </p>
                )}

                <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: '#b9b9b9' }}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => setShowLogin(false)}
                />
            </motion.form>
        </div>
    );
};

export default Login;