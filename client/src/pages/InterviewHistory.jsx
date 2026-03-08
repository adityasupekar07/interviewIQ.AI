import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../App';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'
const InterviewHistory = () => {
    const [interviews, setInterviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerURL + "/api/interview/get-interview", {
                    withCredentials: true
                });
                setInterviews(result.data);

            } catch (err) {
                console.error("Error fetching interview history:", err);
                // Optionally, you can set an error state here to display an error message to the user
            }


        }
        getMyInterviews();
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 '>
            <div className='w-[90vw] lg:w-[70vw] mx-auto max-w-[90%]'>
                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-2 rounded-full bg-white shadow hover:shadow-md transition'
                    >
                        <FaArrowLeft className='text-gray-600' />
                    </button>
                    <div >
                        <h1 className='text-3xl font-bold text-gray-800'>Interview History</h1>
                        <p className='text-gray-500 mt-2'>Track your past interview experiences & performance reports</p>
                    </div>
                </div>
                {interviews.length === 0 ?
                    <div className='bg-white p-10 rounded-2xl shadow text-center'>
                        <p className='text-gray-500'>No interview Found. Start Your First Interview</p>

                    </div> :

                    <div className='grid gap-3'>
                        {interviews.map((item, index) => (
                            <div key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='bg-white p-6 rounded-2xl shadow-mf hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-800'>{item.role}</h3>
                                        <p className='text-gray-500 text-sm mt-1'>{item.experience} • {item.mode}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-400 mt-2'>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-6'>
                                        {/* score */}
                                        <div className='text-right'>
                                            <p className='text-xl font-bold text-emerald-600'>{item.finalScore || 0}/10</p>
                                            <p className='text-gray-400 text-xs'>overall Score</p>
                                        </div>
                                        {/* status badge */}

                                        <span className={'px-4 py-1 rounded-full text-xs font-medium ' + (item.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
                                            {item.status}
                                        </span>
                                    </div>


                                </div>
                            </div>
                        )
                        )}

                    </div>
                }
            </div>
        </div>
    )
}

export default InterviewHistory
