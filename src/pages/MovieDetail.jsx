import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOVIES_URL } from '../api';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetch(MOVIES_URL)
      .then(response => response.ok ? response.json() : Promise.reject('fetch error'))
      .then(data => {
        const movArr = Array.isArray(data) ? data : data.movies || [];
        const movData = movArr.find(movie => String(movie.id) === String(id));
        // simulating delay
        setTimeout(() => {
          if (!mounted) return;
          setMovie(movData || null);
          setLoading(false);
        }, 700);
      })
      .catch(err => {
        console.error(err);
        setTimeout(() => {
          if (!mounted) return;
          setMovie(null);
          setLoading(false);
        }, 700);
      });

    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="spinner">Loading movie…</div>;
  if (!movie) return <div className="muted">Movie not found. <button className="btn" onClick={() => navigate(-1)}>Back</button></div>;

  return (
    <div className="detail">
      <button className="btn" onClick={() => navigate(-1)}>Back</button>
      <div className="detail-grid">
        <img className="poster-large" src={movie.poster} alt={`${movie.title} poster`} />
        <div>
          <h2>{movie.title} <small>({movie.year})</small></h2>
          <p className="meta">Directed by <strong>{movie.director}</strong> • Rating: {movie.rating}</p>
          <p className="genres">{(movie.genres || []).join(' • ')}</p>
          <h3>Synopsis</h3>
          <p>{movie.synopsis}</p>
        </div>
      </div>
    </div>
  );
}
