import React, { useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import { useSelector } from 'react-redux'
import { HiSparkles } from 'react-icons/hi'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import AuthModel from '../components/AuthModel.jsx'

const companies = [
  { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'Apple', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg' },
  { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg' },
  { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
  { name: 'Netflix', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
]

const features = [
  { icon: '🎯', title: 'Role-Based Questions', desc: 'Tailored questions for your specific job title, industry, and experience level.' },
  { icon: '🤖', title: 'Smart Follow-Ups', desc: 'AI adapts in real-time based on your answers — just like a real interviewer.' },
  { icon: '📈', title: 'Adaptive Difficulty', desc: 'Questions get harder or easier based on your performance to keep you challenged.' },
  { icon: '📊', title: 'Performance Analytics', desc: 'Detailed feedback on confidence, clarity, and keyword usage after every session.' },
]

const steps = [
  { step: '01', title: 'Choose Your Role', icon: '💼', desc: 'Select your target job title, industry, and experience level.' },
  { step: '02', title: 'Interview Type', icon: '🗂️', desc: 'Pick from technical, behavioral, HR, or mixed formats.' },
  { step: '03', title: 'Analyze Resume', icon: '📄', desc: 'Upload your resume and let AI tailor questions to your profile.' },
  { step: '04', title: 'Start Interview', icon: '🎙️', desc: 'Answer questions as the AI adapts in real-time.' },
  { step: '05', title: 'Get Feedback', icon: '✅', desc: 'Instant feedback on clarity, confidence, and keywords.' },
  { step: '06', title: 'Full Report', icon: '📊', desc: 'Download a detailed report with scores and tips.' },
]

const Home = () => {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const [activeStep, setActiveStep] = useState(null)
  const navigate = useNavigate()

  const handleProtected = (path) => {
    if (!userData) { setShowAuth(true); return }
    navigate(path)
  }

  return (
    <div className='min-h-screen flex flex-col bg-[#f3f3f3]'>
      <NavBar />

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ripple {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes ripple2 {
          0%   { transform: scale(1);   opacity: 0.3; }
          100% { transform: scale(2.1); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ring1 { animation: ripple  1.6s ease-out infinite; }
        .ring2 { animation: ripple2 1.6s ease-out infinite 0.5s; }
        .orbit { animation: spin-slow 6s linear infinite; }
      `}</style>

      {/* ── HERO ── */}
      <div className='flex-1 px-6 py-20'>
        <div className='flex justify-center mb-6'>
          <div className='bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2'>
            <HiSparkles size={16} className='text-green-600' />
            AI Powered Smart Interview Platform
          </div>
        </div>

        <div className='text-center mb-20'>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto'
          >
            Practice Interview With
            <span className='relative inline-block mt-5'>
              <span className='bg-green-100 text-green-600 px-5 py-1 rounded-full'>AI Intelligence</span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='text-gray-500 mt-6 max-w-2xl mx-auto text-lg'
          >
            Role based mock interviews with smart follow-ups, adaptive difficulty and real time performance evaluation.
          </motion.p>
          <div className='flex flex-wrap justify-center gap-4 mt-10'>
            <motion.button onClick={() => handleProtected('/interview')} whileHover={{ opacity: 0.9, scale: 1.03 }} whileTap={{ scale: 0.98 }} className='bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md'>
              Start Interview
            </motion.button>
            <motion.button onClick={() => handleProtected('/history')} whileHover={{ opacity: 0.9, scale: 1.03 }} whileTap={{ scale: 0.98 }} className='border border-gray-300 px-10 py-3 rounded-full hover:bg-gray-100 transition'>
              View History
            </motion.button>
          </div>
        </div>

        {/* ── COMPANY LOGO MARQUEE ── */}
        <div className='max-w-5xl mx-auto mb-24 overflow-hidden'>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className='text-center text-sm text-gray-400 mb-6 tracking-wide uppercase'>
            Trusted by candidates hired at
          </motion.p>
          <div className='relative'>
            <div className='absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f3f3f3] to-transparent z-10 pointer-events-none' />
            <div className='absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f3f3f3] to-transparent z-10 pointer-events-none' />
            <div className='flex gap-10 w-max' style={{ animation: 'marquee 22s linear infinite' }}>
              {[...companies, ...companies].map((c, i) => (
                <motion.div key={i} whileHover={{ scale: 1.12 }} transition={{ type: 'spring', stiffness: 300 }} className='flex flex-col items-center gap-2 cursor-default select-none'>
                  <div className='w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-3'>
                    <img src={c.logo} alt={c.name} className='w-full h-full object-contain grayscale hover:grayscale-0 transition duration-300' />
                  </div>
                  <span className='text-xs text-gray-400 font-medium'>{c.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div className='max-w-5xl mx-auto mb-24'>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className='text-3xl font-semibold text-center mb-12'>
            Everything You Need to{' '}
            <span className='bg-green-100 text-green-600 px-3 py-0.5 rounded-full'>Ace It</span>
          </motion.h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(0,0,0,0.09)' }} className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm cursor-default'>
                <div className='text-3xl mb-3'>{f.icon}</div>
                <div className='font-semibold text-gray-800 text-lg mb-1'>{f.title}</div>
                <div className='text-gray-500 text-sm leading-relaxed'>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── HOW IT WORKS — STEPPER CIRCLES ONLY ── */}
        <div className='max-w-5xl mx-auto mb-24'>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className='text-3xl font-semibold text-center mb-2'>
            How It Works
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className='text-center text-gray-400 text-sm mb-14'>
            Tap a step to explore
          </motion.p>

          {/* ── circles + connectors ── */}
          <div className='flex items-center justify-center flex-wrap gap-0'>
            {steps.map((s, i) => (
              <div key={i} className='flex items-center'>

                {/* Circle node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.1 }}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                  className='relative flex flex-col items-center cursor-pointer'
                  style={{ width: 80 }}
                >
                  {/* Ripple rings — only on active */}
                  {activeStep === i && (
                    <>
                      <span className='ring1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-green-400 pointer-events-none' style={{ marginTop: -4 }} />
                      <span className='ring2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-green-300 pointer-events-none' style={{ marginTop: -4 }} />
                    </>
                  )}

                  {/* Spinning dashed orbit ring */}
                  {activeStep === i && (
                    <svg className='orbit absolute' width='72' height='72' style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(0deg)', marginTop: -4 }} viewBox='0 0 72 72'>
                      <circle cx='36' cy='36' r='33' fill='none' stroke='#16a34a' strokeWidth='1.5' strokeDasharray='6 5' opacity='0.5' />
                    </svg>
                  )}

                  {/* Main circle */}
                  <motion.div
                    animate={{
                      backgroundColor: activeStep === i ? '#16a34a' : activeStep !== null && activeStep > i ? '#f0fdf4' : '#ffffff',
                      borderColor: activeStep === i ? '#16a34a' : activeStep !== null && activeStep > i ? '#86efac' : '#e5e7eb',
                      scale: activeStep === i ? 1.18 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className='w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl shadow-sm relative z-10'
                  >
                    {/* Checkmark overlay for completed steps */}
                    {activeStep !== null && activeStep > i ? (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className='text-green-500 text-lg font-bold'>✓</motion.span>
                    ) : (
                      s.icon
                    )}
                  </motion.div>

                  {/* Step number + title below */}
                  <motion.p
                    animate={{ color: activeStep === i ? '#16a34a' : '#9ca3af' }}
                    className='text-xs font-bold mt-2 text-center leading-tight px-1'
                  >
                    {s.step}
                  </motion.p>
                  <motion.p
                    animate={{ color: activeStep === i ? '#111827' : '#6b7280' }}
                    className='text-xs text-center leading-tight mt-0.5 px-1 font-medium'
                    style={{ fontSize: '10px' }}
                  >
                    {s.title}
                  </motion.p>
                </motion.div>

                {/* Animated SVG connector */}
                {i < steps.length - 1 && (
                  <div className='flex items-center' style={{ marginBottom: 28 }}>
                    <svg width='36' height='10' viewBox='0 0 36 10'>
                      {/* grey base */}
                      <path d='M0 5 Q9 1 18 5 Q27 9 36 5' fill='none' stroke='#e5e7eb' strokeWidth='1.5' strokeLinecap='round' />
                      {/* green fill as steps activate */}
                      <motion.path
                        d='M0 5 Q9 1 18 5 Q27 9 36 5'
                        fill='none'
                        stroke='#16a34a'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: activeStep !== null && activeStep > i ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                      />
                      {/* arrowhead */}
                      <motion.polygon
                        points='30,2 36,5 30,8'
                        animate={{ fill: activeStep !== null && activeStep > i ? '#16a34a' : '#e5e7eb' }}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Detail panel ── */}
          <AnimatePresence mode='wait'>
            {activeStep !== null && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className='mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-6 flex items-center gap-5 max-w-xl mx-auto'
              >
                <div className='w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-md'>
                  {steps[activeStep].icon}
                </div>
                <div>
                  <span className='text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full'>Step {steps[activeStep].step}</span>
                  <p className='font-semibold text-gray-800 mt-1'>{steps[activeStep].title}</p>
                  <p className='text-gray-500 text-sm mt-0.5 leading-relaxed'>{steps[activeStep].desc}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── CTA BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='max-w-3xl mx-auto bg-black text-white rounded-3xl px-10 py-14 text-center mb-16 shadow-lg'
        >
          <HiSparkles size={28} className='text-green-400 mx-auto mb-4' />
          <h3 className='text-3xl font-semibold mb-3'>Ready to Land Your Dream Job?</h3>
          <p className='text-gray-400 text-base mb-8 max-w-lg mx-auto'>
            Start your first AI-powered mock interview for free — no credit card required.
          </p>
          <motion.button
            onClick={() => handleProtected('/interview')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className='bg-green-500 hover:bg-green-400 transition text-white font-medium px-10 py-3 rounded-full shadow-md'
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Home