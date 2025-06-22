import React, { useEffect } from 'react';

const Callback = () => {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get('access_token');
    const expires_in = params.get('expires_in');
    const error = params.get('error');

    if (error) {
      window.opener.postMessage({
        type: 'spotify-auth-error',
        error: `Erro ao autenticar: ${error}`
      }, window.location.origin);
    } else if (access_token) {
      localStorage.setItem('spotify_token', access_token);
      localStorage.setItem('spotify_token_expires_at', Date.now() + expires_in * 1000);
      
      window.opener.postMessage({
        type: 'spotify-auth-success',
        access_token,
        expires_in
      }, window.location.origin);
    }

    window.close();
  }, []);

  return (
    <div className="callback-container">
      <h2>Processando login...</h2>
      <p>Por favor, aguarde enquanto você está sendo autenticado.</p>
    </div>
  );
};

export default Callback;