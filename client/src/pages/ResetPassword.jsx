import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const emailFromUrl = searchParams.get('email');
    const navigate = useNavigate();

    useEffect(() => {
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        }
    }, [emailFromUrl]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        if (!token || !email) {
            toast.error("Invalid or missing token or email. Please check the link.");
            return;
        }

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password`,
                {
                    email,
                    token,
                    newPassword: password,
                }
            );

            if (data.success) {
                toast.success("Password reset successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                toast.error(data.message || "Failed to reset password");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <motion.form
                onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-white p-10 rounded-xl text-slate-500 border-2 border-yellow-500 w-[400px]"
            >
                <h1 className="text-center text-2xl text-neutral-700 font-medium">Reset Password</h1>
                <p className="text-sm mt-4 mb-6 text-center">
                    Enter your new password to reset your account
                </p>

                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 relative">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        className="outline-none text-sm w-full"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEye}
                        className="absolute right-4 cursor-pointer"
                        style={{ color: '#b9b9b9' }}
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                </div>

                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 relative">
                    <input
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        className="outline-none text-sm w-full"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <FontAwesomeIcon
                        icon={confirmPasswordVisible ? faEyeSlash : faEye}
                        className="absolute right-4 cursor-pointer"
                        style={{ color: '#b9b9b9' }}
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 w-full text-white py-2 mt-6 rounded-full hover:bg-gradient-to-r from-yellow-500 to-orange-400">
                    Reset Password
                </button>
            </motion.form>
        </div>
    );
};

export default ResetPassword;
