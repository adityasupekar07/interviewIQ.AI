import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'motion/react'
import { BsRobot, BsCoin } from 'react-icons/bs'
import { HiOutlineLogout } from 'react-icons/hi'
import { FaUserAstronaut } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ServerURL } from '../App';
import { setUserData } from '../redux/userSlice.js';
import AuthModel from './AuthModel.jsx';
const NavBar = () => {

    const { userData } = useSelector((state) => state.user);
    const [showCreditPopUp, setShowCreditPopUp] = useState(false);
    const [showUserPopUp, setshowUserPopUp] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.get(ServerURL + '/api/auth/logout', { withCredentials: true });
            dispatch(setUserData(null));
            setShowCreditPopUp(false);
            setshowUserPopUp(false);
            navigate('/');
        }
        catch (err) {
            console.log('logout error' + err);
        }
    }
    return (
        <div className=' bg-[#f3f3f3] flex  justify-center px-4 pt-6'>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='w-full max-w-6xl mx-auto flex items-center 
                justify-between bg-white px-8 py-4 rounded-[24px] shadow-sm border 
                border-gray-200 relative' >
                <div className='flex items-center gap-3 cursor-pointer'>
                    <div className='bg-black text-white p-2 rounded-lg'>
                        <BsRobot size={18} />
                    </div>
                    <h1 className='font-semibold hidden md:block text-lg'>
                        interviewIQ.AI</h1>
                </div>
                <div className='flex item-center gap-6 relative'>
                    <div className='relative'>
                        <button onClick={() => {
                            if (!userData) {
                                setShowAuth(true);
                                return;
                            };
                            setShowCreditPopUp(!showCreditPopUp),
                                setshowUserPopUp(false)
                        }}
                            className='flex items-center gap-2 bg-gray-100 px-4 py-2 hover:bg-gray-200  rounded-full text-md transition'>
                            <BsCoin size={20} />
                            {userData ? userData.credits : 0}
                        </button>
                        {showCreditPopUp && (
                            <div className='absolute   right-[-50px] w-68 mt-3 bg-white border border-gray-200 rounded-lg shadow-xl p-5 z-50'>
                                <p className='text-sm text-gray-600 mb-4'>Need more Credits, to continue Interviews?</p>
                                <button onClick={() => navigate('/pricing')} className='w-full bg-black text-white py-2 rounded-lg  text-sm'>Buy Credits</button>
                            </div>
                        )}
                    </div>
                    <div className='relative'>
                        <button onClick={() => {
                            if (!userData) {
                                setShowAuth(true)
                                return;
                            };
                            setshowUserPopUp(!showUserPopUp), setShowCreditPopUp(false)
                        }}
                            className=' w-9 h-9 flex items-center  bg-black text-white    rounded-full justify-center font-semibold'>
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={16} />}
                        </button>
                        {showUserPopUp && (
                            <div className='absolute right-0 w-48 mt-3 bg-white border border-gray-200 rounded-lg shadow-xl p-5 z-50'>
                                <p className='text-md text-blue-600 font-medium mb-1'>{userData?.name}</p>
                                <button onClick={() => navigate('/history')} className='w-full bg-gray-100 text-gray-800 py-2 rounded-lg  text-sm mb-2 hover:bg-gray-200 transition'>History</button>
                                <button onClick={handleLogout} className='w-full bg-red-500 text-white py-2 rounded-lg  text-sm hover:bg-red-600 transition flex items-center justify-center gap-2'><HiOutlineLogout size={16} /> Logout</button>
                            </div>
                        )}
                    </div>
                    <div className='flex items-center gap-1 text-gray-600'>

                    </div>
                </div>
            </motion.div>
            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default NavBar
