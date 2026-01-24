import { useState, useEffect } from 'react';

const useSpeechRecognition = (language = 'en-US') => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Инициализация распознавания речи
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = language; // Устанавливаем язык
      recog.interimResults = false; // Промежуточные результаты не нужны
      recog.maxAlternatives = 1; // Один результат
      setRecognition(recog);
    } else {
      console.error("Web Speech API is not supported in this browser.");
    }
  }, [language]);

  // Обработка результатов распознавания
  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event) => {
      const result = event.results[0][0].transcript; // Получаем распознанный текст
      setTranscript(result); // Обновляем состояние текста
    };

    recognition.onresult = handleResult;
    recognition.onend = () => setIsListening(false); // Завершение записи
    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: " + event.error);
    };
  }, [recognition]);

  // Функция для запуска или остановки записи
  const toggleListening = () => {
    if (!recognition) {
      alert("Voice input is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognition.stop(); // Остановить запись
    } else {
      recognition.start(); // Начать запись
      setIsListening(true);
    }
  };

  return {
    isListening,
    transcript,
    toggleListening
  };
};

export default useSpeechRecognition;
