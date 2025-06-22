import React, { useState } from 'react';
import QuestionForm from './components/QuestionForm';
import Recommendations from './components/Recommendations';
import SpotifyAuth from './components/SpotifyAuth';
import './styles/App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/recommendations/questions');
      const data = await response.json();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar perguntas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPreferences = async (answers) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('spotify_token');
      
      const response = await fetch('http://localhost:3000/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(answers)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar preferências');
      }

      const data = await response.json();
      setRecommendations(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Spotify Recommendations</h1>
      
      {!isAuthenticated ? (
        <SpotifyAuth 
          onAuthenticated={() => {
            setIsAuthenticated(true);
            fetchQuestions();
          }} 
        />
      ) : (
        <>
          {loading && <div className="loading">Carregando...</div>}
          {error && <div className="error">{error}</div>}
          
          {!recommendations ? (
            <QuestionForm 
              questions={questions} 
              onSubmit={handleSubmitPreferences} 
            />
          ) : (
            <Recommendations 
              data={recommendations} 
              onBack={() => setRecommendations(null)} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;