import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { useMovies } from "../hooks/useMovies";

const average = (arr) => arr.reduce((acc, cur) => acc + cur / arr.length, 0);

const KEY = "61b337c3";

const Home = () => {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectedMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => setSelectedId(null);

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <SearchSection>
        <SearchTitle />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </SearchSection>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

const Loader = () => <p className={style.loader}>Loading...</p>;

const ErrorMessage = ({ message }) => {
  return (
    <p className={style.error}>
      <span>⛔</span> {message}
    </p>
  );
};

const SearchSection = ({ children }) => (
  <nav className={style.searchSection}>{children}</nav>
);

const SearchTitle = () => {
  return (
    <div className={style.searchTitle}>
      <h1>Search your favorite movies</h1>
    </div>
  );
};

const Search = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

const NumResult = ({ movies }) => {
  return (
    <p className={style.numResults}>
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Main = ({ children }) => <main className={style.main}>{children}</main>;

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={style.box}>
      <button
        className={style.btnToggle}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <ul className={`${style.list} ${style.listMovies}`}>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li
      className={style.movieListItem}
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓️</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(
    function () {
      async function getMoviesDetais() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        console.log(data);
        setIsLoading(false);
      }
      getMoviesDetais();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "Movies & Popcorn";
      };
    },
    [title]
  );

  return (
    <div className={style.details}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className={style.btnBack} onClick={onCloseMovie}>
              &larr;
            </button>{" "}
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className={style.detailsOverview}>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>✨</span> {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className={style.rating}>
              {!isWatched ? (
                <>
                  <button className={style.btnAdd} onClick={handleAdd}>
                    + Add to List
                  </button>{" "}
                </>
              ) : (
                <p> You already added this movie </p>
              )}
            </div>
            <div className={style.movieDescription}>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring: {actors} </p>
              <p>Directed by {director}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(1);

  return (
    <div className={style.summary}>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className={style.list}>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie, onDeleteWatched }) => {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className={style.btnDelete}
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          x
        </button>
      </div>
    </li>
  );
};

export default Home;
