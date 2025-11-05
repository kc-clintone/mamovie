import React, { useState, useEffect, useMemo } from 'react';
import { MOVIES_URL } from '../api';
import MovieCard from '../components/MovieCard';

export default function Gallery() {
  //storing fetched movies imside a state variable of usestate
  const [movies, setMovies] = useState([]);
  //simole loading state
  const [loading, setLoading] = useState(true);
  //genre tracking usinv usestate
  const [selectedGenre, setSelectedGenre] = useState('All');
  //anf a simple search
  const [search, setSearch] = useState('');

  //fetching the api inside the useEffect
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    //uding the simple fetch funtion ti fetch the movie content
    fetch(MOVIES_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch movies');
        return res.json();
      })
      .then(data => {
        const fetchedData = Array.isArray(data) ? data : data.movies || [];
        // simulate network latency (simple delay)
        setTimeout(() => {
          if (!mounted) return;
          setMovies(fetchedData);
          setLoading(false);
        }, 800);
      })
      .catch(err => {
        console.error(err);
        setTimeout(() => {
          if (!mounted) return;
          setMovies([]);
          setLoading(false);
        }, 800);
      });

    return () => { mounted = false; };
  }, []);

  // genre list
  const genres = useMemo(() => {
    const genre = new Set();
    movies.forEach(movie => (movie.genres || []).forEach(movieGenre => genre.add(movieGenre)));
    return ['All', ...Array.from(genre).sort()];
  }, [movies]);

  const filtered = useMemo(() => {
    return movies.filter(mov => {
      const matchesGenre = selectedGenre === 'All' || (mov.genres || []).includes(selectedGenre);
      const matchesSearch = !search || mov.title.toLowerCase().includes(search.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [movies, selectedGenre, search]);

  return (
    <div className="gallery">
      <div className="toolbar">
        <div>
          <label className="small">
            Genre:
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
              {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
            </select>
          </label>
          <label className="small" style={{marginLeft: 12}}>
            Search:
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Title..." />
          </label>
        </div>
        <div className="small muted">{loading ? 'Loading movies…' : `${filtered.length} shown`}</div>
      </div>

      {loading ? (
        <div className="spinner">Loading…</div>
      ) : (
        <div className="card-grid">
          {filtered.length === 0 ? (
            <div className="muted">No movies found.</div>
          ) : (
            filtered.map(movie => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      )}
    </div>
  );
}
