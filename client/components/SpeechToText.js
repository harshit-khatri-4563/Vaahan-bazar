// components/SpeechToText.js
import { useState, useEffect, useRef } from 'react';
import { IoMdMicOff, IoMdMic } from "react-icons/io";

const SpeechToText = ({ onTranscribe }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Please use Google Chrome.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      console.log("listening");
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      console.log("final transcript")
      setTranscript(finalTranscript);
      if (onTranscribe) {
        onTranscribe(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error detected: ' + event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("ended");
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscribe]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log(transcript)
    }
  };

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? <IoMdMicOff className='w-10 h-10' />: <IoMdMic className='w-10 h-10' />}
      </button>
    </div>
  );
};

export default SpeechToText;
