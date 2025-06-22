import React, { useState, useEffect } from 'react';
import QuestionForm from '../components/QuestionForm';
import { fetchQuestions } from '../services/api';

const QuestionsPage = ({ onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionsData = await fetchQuestions();
        setQuestions(questionsData);
      } catch (err) {
        setError('Erro ao carregar perguntas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) return <div>Carregando perguntas...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="questions-page">
      <h1>Preferências Musicais</h1>
      <p>Responda às perguntas para receber recomendações personalizadas</p>
      
      <QuestionForm questions={questions} onSubmit={onSubmit} />
    </div>
  );
};

export default QuestionsPage;