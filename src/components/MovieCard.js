import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <img className="poster" src={movie.poster} alt={`${movie.title} poster`} />
      </Link>
      <div className="card-body">
        <h3 className="title"><Link to={`/movies/${movie.id}`}>{movie.title}</Link></h3>
        <div className="meta">{movie.year} • {movie.genres && movie.genres.join(', ')}</div>
        <div className="rating">⭐ {movie.rating}</div>
      </div>
    </article>
  );
}
