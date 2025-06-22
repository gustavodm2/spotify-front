export const getQuestions = async () => {
  const response = await fetch('http://localhost:3000/api/recommendations/questions');
  return response.json();
};

export const submitPreferences = async (preferences, token) => {
  const response = await fetch('http://localhost:3000/api/recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(preferences)
  });
  return response.json();
};