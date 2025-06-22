import React from 'react';

const Recommendations = ({ data, onBack }) => {
  return (
    <div className="recommendations">
      <h2>{data.message}</h2>
      
      {data.tracks ? (
        <div className="tracks-list">
          <h3>Músicas Recomendadas</h3>
          <ul>
            {data.tracks.map(track => (
              <li key={track.id} className="track-item">
                <h4>{track.name}</h4>
                <p>Artista: {track.artists.join(', ')}</p>
                <p>Álbum: {track.album}</p>
                <p>Lançamento: {track.release_date}</p>
                {track.preview_url && (
                  <audio controls src={track.preview_url}>
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                )}
                <a href={track.external_url} target="_blank" rel="noopener noreferrer">
                  Ouvir no Spotify
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="artists-list">
          <h3>Artistas Recomendados</h3>
          <ul>
            {data.artists.map(artist => (
              <li key={artist.id} className="artist-item">
                <h4>{artist.name}</h4>
                <p>Gêneros: {artist.genres.join(', ')}</p>
                <p>Popularidade: {artist.popularity}/100</p>
                <a href={artist.external_url} target="_blank" rel="noopener noreferrer">
                  Ver no Spotify
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={onBack} className="back-btn">
        Voltar
      </button>
    </div>
  );
};

export default Recommendations;