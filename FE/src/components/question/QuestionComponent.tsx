import React from 'react';
import { atom, useAtom } from 'jotai';
import './QuestionComponent.css';

interface ResponseType {
  question: string;
  answer: string;
}

// Atoms for state management
const questionAtom = atom<string>('');
const responsesAtom = atom<ResponseType[]>([]);
const errorAtom = atom<string | null>(null);
const loadingAtom = atom<boolean>(false);

const QuestionComponent: React.FC = () => {
  const [question, setQuestion] = useAtom(questionAtom);
  const [responses, setResponses] = useAtom(responsesAtom);
  const [error, setError] = useAtom(errorAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const clearInput = () => {
    setQuestion('');
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data: ResponseType = await res.json();
      setResponses((prevResponses) => [data, ...prevResponses]);
    } catch (err) {
      setError('Failed to fetch the answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError('Error occurred in recognition: ' + event.error);
    };

    recognition.start();
  };

  return (
    <div className="question-form-container">
      <form onSubmit={handleSubmit} className="question-form">
        <label htmlFor="question">Ask a question about your CLS?</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={handleInputChange}
          required
        />
        <div className="button-container">
          <button
            type="submit"
            disabled={!question.trim()}
            className="submit-btn"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={clearInput}
            disabled={!question.trim()}
            className="button-clear"
          >
            Clear Input
          </button>
          <button
            type="button"
            onClick={handleVoiceInput}
            className="button-voice"
          >
            Use Voice Input
          </button>
        </div>
      </form>

      <div className="responses-container">
        {loading && <div className="spinner"></div>}
        {error && <p className="error">{error}</p>}
        <div className="responses">
          {responses.map((response, index) => (
            <div key={index} className="response">
              <h3>Question: {response.question}</h3>
              <p>Answer: {response.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
