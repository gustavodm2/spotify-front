export const fetchQuestions = async () => {
  const response = await fetch('http://localhost:3000/api/questions');
  if (!response.ok) {
    throw new Error('Erro ao buscar perguntas');
  }
  return response.json();
};

export const submitPreferences = async (preferences) => {
  const token = localStorage.getItem('spotify_token');
  const response = await fetch('http://localhost:3000/api/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(preferences)
  });
  if (!response.ok) {
    throw new Error('Erro ao enviar preferências');
  }
  return response.json();
};