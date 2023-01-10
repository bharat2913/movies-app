import { useEffect, useState } from 'react';
import Movie from './compoments/Movie';

const MOVIE_API =
  'https://api.themoviedb.org/3/movie/popular?api_key=8752accf3bdf50d86a56668c371ce63e&page=1';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=8752accf3bdf50d86a56668c371ce63e&query=';
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  useEffect(() => {
    getMovies(MOVIE_API);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('');
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <h2>Movie Finder</h2>
        <form onSubmit={handleOnSubmit}>
          <input
            className='search'
            type='text'
            placeholder='Search..'
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className='movie-container'>
        {movies?.length > 0 &&
          movies?.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
