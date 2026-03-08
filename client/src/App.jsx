import React, { use } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice.js'
import InterviewPage from './pages/InterviewPage.jsx'
import InterviewHistory from './pages/InterviewHistory.jsx'
import Pricing from './pages/Pricing.jsx'
import InterviewReport from './pages/InterviewReport.jsx'
export const ServerURL = "http://localhost:8000";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {

    const getUser = async () => {
      try {
        const responce = await axios.get(ServerURL + "/api/user/current-user", {

          withCredentials: "true"
        });
        dispatch(setUserData(responce.data));
        console.log(responce.data);
      }
      catch (err) {
        dispatch(setUserData(null));

        console.log('user error' + err);
      }
    }
    getUser();



  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/report/:id" element={<InterviewReport />} />

      <Route path="/history" element={<InterviewHistory />} />

    </Routes>
  )
}

export default App
