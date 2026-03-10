import React, { use } from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ServerURL } from '../App';
import Step3Report from '../components/Step3Report';
const InterviewReport = () => {

  const { id } = useParams();
  const [report, setReport] = useState(null);
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(ServerURL + "/api/interview/report/" + id, {
          withCredentials: true
        });
        setReport(result.data);
      }
      catch (err) {
        console.error("Error fetching report:", err);
      }
    }
    fetchReport();
  }, [id])
  if (!report) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500'>Loading report...</p>
      </div>
    )
  }
  return (
    <Step3Report report={report} />
  )
}

export default InterviewReport
