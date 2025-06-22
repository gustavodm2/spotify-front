import React, { useState } from 'react';

const QuestionForm = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [recommendationType, setRecommendationType] = useState('tracks');

  const handleChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...answers,
      recommendationType
    });
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <div className="form-group">
        <label>Você prefere recomendações de:</label>
        <div className="radio-group">
          <label>
            <input 
              type="radio" 
              name="recommendationType" 
              value="tracks" 
              checked={recommendationType === 'tracks'} 
              onChange={() => setRecommendationType('tracks')} 
            />
            Músicas
          </label>
          <label>
            <input 
              type="radio" 
              name="recommendationType" 
              value="artists" 
              checked={recommendationType === 'artists'} 
              onChange={() => setRecommendationType('artists')} 
            />
            Artistas
          </label>
        </div>
      </div>

      {questions.map((question) => (
        <div key={question.id} className="form-group">
          <label htmlFor={question.id}>{question.question}</label>
          
          {question.options ? (
            <select 
              id={question.id}
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              required={!question.optional}
            >
              <option value="">Selecione...</option>
              {question.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={question.type || 'text'}
              id={question.id}
              value={answers[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              required={!question.optional}
            />
          )}
        </div>
      ))}

      <button type="submit" className="submit-btn">
        Obter Recomendações
      </button>
    </form>
  );
};

export default QuestionForm;