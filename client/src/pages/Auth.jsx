import React from 'react'
import { FaRobot } from "react-icons/fa";
import { motion } from "motion/react"
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/FireBase';
import { ServerURL } from '../App';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
const Auth = ({ isModel = false }) => {
    const dispatch = useDispatch();

    const handleGoogleSignIn = async () => {
        try {
            const responce = await signInWithPopup(auth, provider);
            let user = responce.user;
            let email = user.email;
            let name = user.displayName;
            const result = await axios.post(ServerURL + '/api/auth/google', { email, name }, { withCredentials: true });
            dispatch(setUserData(result.data.user));
            console.log(result.data);

        } catch (err) {
            console.log(`google sign in error ${err}`)
            dispatch(setUserData(null));
        }
    }



    return (
        <div
            className={`w-full ${isModel
                ? "py-4"
                : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"
                }`}               >
            <motion.div
                className='w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200 '
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05, ease: "easeInOut" }}
            >
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='text-white bg-black p-2 rounded-lg'>
                        <FaRobot />
                    </div>
                    <h2 className='font-semibold text-lg'>interviewIQ.AI</h2>
                </div>
                <h1 className='text-center md-text-3xl text-2xl font-semibold mb-4 leading-snug '>
                    Continue With
                    <span className='text-green-600 bg-green-100 px-3 py-1 rounded-full inline-flex items-center  gap-2'> <IoSparkles size={16} />
                        AI Smart Interview </span>
                </h1>
                <p className='text-center text-gray-600 text-sm md:text-base leading-relaxed mb-8'>Sign In to Experience the future of interviews powered by AI,track your progress and unlock detailed performance insights.</p>
                <motion.button
                    onClick={handleGoogleSignIn}
                    whileHover={{ opacity: 0.9, scale: 1.03 }}
                    whileTap={{ opacity: 1, scale: 0.98 }}
                    className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2'>
                    <FcGoogle size={20} /> Sign in with Google
                </motion.button>
            </motion.div>
        </div>
    )
}

export default Auth
