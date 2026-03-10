import React, { useRef } from 'react'
import mailVideo from '../assets/Videos/male-ai.mp4'
import femaleVideo from '../assets/Videos/female-ai.mp4'
import Timer from './Timer'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import { motion } from 'motion/react'
import { useState } from 'react'
import axios from 'axios'
import { ServerURL } from '../App'
import { useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
const Step2Interview = ({ interviewData, onFinish }) => {
  const { interviewId, questions, userName } = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
  const [feedback, setFeedback] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");
  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];



  // load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      //try known female voices first
      const femaleVoices = voices.find(v => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes(" zira") || v.name.toLowerCase().includes("samantha"));

      if (femaleVoices) {
        setSelectedVoice(femaleVoices);
        setVoiceGender("female");
        return;

      }
      const maleVoices = voices.find(v => v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes(" david") || v.name.toLowerCase().includes(" mark"));

      if (maleVoices) {
        setSelectedVoice(maleVoices);
        setVoiceGender("male");
        return;

      }

      //fallback to any voice
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [])

  const videoSource = voiceGender === "male" ? mailVideo : femaleVideo;

  // speak function
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!selectedVoice || !window.speechSynthesis) {
        console.error("No voice selected");
        resolve();
        return;
      }
      window.speechSynthesis.cancel(); // stop any ongoing speech
      //add natural pauses after commas and periods
      const humanText = text.replace(/,/g, ",...").replace(/\./g, "...");
      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;
      //human like pacing
      utterance.rate = 0.92; //slightly slower than normal
      utterance.pitch = 1.05;//small warmth
      utterance.volume = 1;
      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      }
      utterance.onend = () => {
        setIsAIPlaying(false);
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;

        if (isMiceOn) {
          startMic();
        }
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };
      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  }

  useEffect(() => {
    if (!selectedVoice) return;
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(`Hello ${userName},it's great to meet you today.I hope you are feeling confident and ready for this interview.`);
        await speakText("I will be asking you a few questions.just answer naturally,and take your time .Let's begin .");
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise(resolve => setTimeout(resolve, 800)); // small pause before next question
        //if last question (hard level)
        if (currentIndex === questions.length - 1) {
          await speakText("Alright ,this one might be a bit more challenging.");
        }
        await speakText(currentQuestion.question);
        if (isMiceOn) {
          startMic();
        }
      }

    }
    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);


  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;
    if (isSubmitting) return;
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);

          return 0;
        }
        return prev - 1;
      })
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex, isIntroPhase, isSubmitting, timeLeft]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech Recognition not supported");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;;
      setAnswer(transcript);
    }
    recognitionRef.current = recognition;
  }, [])

  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
        setIsMicOn(true);
      } catch (err) {
        console.error("Speech recognition error:", err);
      }
    }
  }
  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsMicOn(false);
    }
  }
  const toggleMic = () => {
    if (isMiceOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMiceOn);
  }

  useEffect(() => {
    if (!currentQuestion) return;
    setTimeLeft(currentQuestion.timeLimit || 60);
  }, [currentIndex]);

  const submitAnswer = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    stopMic();
    try {
      const result = await axios.post(ServerURL + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken: currentQuestion.timeLimit - timeLeft
      }, { withCredentials: true });

      setFeedback(result.data.feedback);
      speakText(result.data.feedback);
      setIsSubmitting(false);
    } catch (err) {
      console.error("Error submitting answer:", err);
      setIsSubmitting(false);
    }
  }
  const handleNext = async () => {
    setFeedback("");
    setAnswer("");
    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Great, let's move on to the next question.");
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMiceOn) {
        startMic();
      }
    }, 500);

  }
  const finishInterview = async () => {
    try {
      const result = await axios.post(
        ServerURL + "/api/interview/finish",
        { interviewId },
        { withCredentials: true }
      );

      console.log("API Response:", result.data);

      if (!result.data) {
        console.error("Report missing in response");
        return;
      }

      onFinish(result.data);

    } catch (err) {
      console.error("Error finishing interview:", err);
    }
  };
  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;
    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer();
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();

    }
  }, [])
  return (

    <div className='min-h-screen 
   bg-gradient-to-br from-emerald-50
    via-white to-teal-100
    flex items-center justify-center p-4 sm:p-6 '>
      <div className=' max-w-[1350px] w-full min-h-[80vh] 
      bg-white rounded-3xl shadow-2xl border 
      border-gray-200 flex flex-col lg:flex-row 
       overflow-hidden'>
        {/* video section */}
        <div className='w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200'>
          <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-xl'>

            <video src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload='auto'
              className='w-full h-auto object-cover' />

          </div>
          {/* subtitle  */}
          {
            subtitle && (
              <div className='w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm'>
                <p className='text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed'>{subtitle}</p>
              </div>
            )
          }
          {/* timer area */}
          <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-500'>
                Interview Status
              </span>
              {isAIPlaying && <span className='text-sm font-semibold text-emerald-600'>
                {isAIPlaying ? "AI Speaking..." : ""}

              </span>
              }
            </div>
            <div className='h-px bg-gray-200'>  </div>
            <div className='flex justify-center '>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit || 60} />
            </div>
            <div className='h-px bg-gray-200'>  </div>
            <div className='grid grid-cols-2 gap-6 text-center'>
              <div>
                <span className='text-2xl font-bold text-emerald-600'>
                  {currentIndex + 1}
                </span>
                <span className='text-xs text-gray-400'>
                  Current Question
                </span>
              </div>
              <div>
                <span className='text-2xl font-bold text-emerald-600'>
                  {questions.length}
                </span>
                <span className='text-xs text-gray-400'>
                  Total Questions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* text section */}
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8'>

          <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 mb-6'>
            AI Smart Interview
          </h2>

          <div className='flex flex-col flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm'>
            {!isIntroPhase && (
              <div className='relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm'>
                <p className='text-xs sm:text-sm text-gray-400 mb-2'>
                  Question {currentIndex + 1} of {questions.length}
                </p>

                <div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed'>
                  {currentQuestion?.question}
                </div>
              </div>)}
            <textarea
              placeholder="Type your answer here..."
              onChange={(e) => { setAnswer(e.target.value) }}
              value={answer}
              className='w-full flex-1 mt-4 bg-gray-100 p-4 resize-none border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500'
            />

            {!feedback ? (<div className='flex items-center gap-4 mt-4'>
              <motion.button
                onClick={toggleMic}
                className='w-14 h-14 flex items-center justify-center rounded-full bg-black text-white'
                whileTap={{ scale: 0.9 }}
              >
                {isMiceOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                className='flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-4 rounded-2xl shadow-lg disabled:bg-gray-500'
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>
            </div>) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm'>
                <p className='text-emerald-700 font-medium mb-4'>
                  {feedback}
                </p>
                <button
                  onClick={handleNext}
                  className='w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-1'>
                  Next Question <BsArrowRight />
                </button>
              </motion.div>
            )}

          </div>
        </div>
      </div>

    </div>
  )
}

export default Step2Interview
