import React, { useState, useEffect } from 'react';

const CLIENT_ID = 'seu-client-id-do-spotify'; // Substitua pelo seu Client ID
const REDIRECT_URI = 'http://localhost:3000/callback'; // Deve corresponder ao configurado no Spotify Dashboard
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'user-top-read playlist-modify-private'; // Escopos necessários

const SpotifyAuth = ({ onAuthenticated }) => {
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const url = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}`;

    window.open(
      url,
      'Spotify',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`
    );
  };

  useEffect(() => {
    // Função para lidar com a mensagem do popup
    const handleMessage = (event) => {
      // Verificar a origem da mensagem para segurança
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'spotify-auth-success') {
        const { access_token, expires_in } = event.data;
        localStorage.setItem('spotify_token', access_token);
        
        // Definir tempo de expiração (opcional)
        const expiresAt = Date.now() + expires_in * 1000;
        localStorage.setItem('spotify_token_expires_at', expiresAt.toString());
        
        onAuthenticated();
      } else if (event.data.type === 'spotify-auth-error') {
        setError(event.data.error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onAuthenticated]);

  return (
    <div className="auth-container">
      <h2>Login com Spotify</h2>
      <p>Para obter recomendações personalizadas, faça login com sua conta do Spotify.</p>
      
      <button onClick={handleLogin} className="spotify-login-btn">
        Conectar com Spotify
      </button>
      
      {error && <div className="error">{error}</div>}
      
      <p className="auth-help">
        Você será redirecionado para o site do Spotify para autorizar o acesso.
      </p>
    </div>
  );
};

export default SpotifyAuth;