import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const Step3Report = ({ report }) => {
  if (!report) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500'>Loading report...</p>
      </div>
    )
  }

  const {
    finalScore = 0,
    confidence = 0,
    correctness = 0,
    communication = 0,
    questionWiseScore = [],
  } = report;
  
  return (
    <div></div>
  )
}

export default Step3Report
