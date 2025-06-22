import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SpotifyAuth = () => {
  const [error, setError] = useState(null);
  const BACKEND_URL = "http://localhost:3000";
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const width = 450;
      const height = 730;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const authWindow = window.open(
        `${BACKEND_URL}/auth/login`,
        "Spotify",
        `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`
      );

      // Verifica periodicamente se o token foi armazenado
      const checkAuthStatus = setInterval(() => {
        const token = localStorage.getItem("spotify_token");
        console.log("Token no localStorage:", token); // Debug

        if (token) {
          clearInterval(checkAuthStatus);
          if (authWindow) authWindow.close();
          navigate('/questions');
        }
      }, 500);

      // Verifica se a janela foi fechada manualmente
      const checkWindowClosed = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkWindowClosed);
          clearInterval(checkAuthStatus);
          const token = localStorage.getItem("spotify_token");
          if (!token) {
            setError("O login foi cancelado ou não foi concluído");
          }
        }
      }, 500);
    } catch (err) {
      setError("Erro ao iniciar o processo de autenticação");
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    const expiresAt = localStorage.getItem("spotify_token_expires_at");

    if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
      navigate('/questions');
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Login com Spotify</h2>
      <p>
        Para obter recomendações personalizadas, faça login com sua conta do
        Spotify.
      </p>

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