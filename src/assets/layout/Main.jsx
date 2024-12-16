import { UseMovieTvContext } from "../contexts/MovieTvContext";

export default function Main() {
  const { movies, series } = UseMovieTvContext();

  return (
    <main>
      {/* Movie or TV Series Exists? */}
      {(!series.results || series.results.length === 0) && (
        <h2>No TV Series Found</h2>
      )}
      {(!movies.results || movies.results.length === 0) && (
        <h2>No Movies Found</h2>
      )}

      {/* Movie Output */}
      {movies.results && (
        <>
          <h1>Movies</h1>
          <ul>
            {movies.results.map((movie) => (
              <li key={movie.id}>
                <p>{movie.title}</p>
                <p>{movie.original_title}</p>
                <p>{movie.original_language}</p>
                <p>{movie.vote_average}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* TV Series Output */}
      {series.results && (
        <>
          <h1>TV Series</h1>
          <ul>
            {series.results.map((serie) => (
              <li key={serie.id}>
                <p>{serie.name}</p>
                <p>{serie.original_name}</p>
                <p>{serie.original_language}</p>
                <p>{serie.vote_average}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
