import { createContext, useContext, useEffect, useState } from "react";

// # Context Consumer
const MovieTvContext = createContext();
export const UseMovieTvContext = () => useContext(MovieTvContext);

// # Context Provider
export function MovieTvContextProvider({ children }) {
  const movieUrl = import.meta.env.VITE_API_URL_MOVIE;
  const movieGenreUrl = import.meta.env.VITE_API_URL_MOVIE_GENRE;
  const serieUrl = import.meta.env.VITE_API_URL_SERIE;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };

  const [movieTvData, setMovieTvData] = useState({
    movies: [],
    getMovies: function (term, category) {
      fetch(`${movieUrl}?query=${term}`, options)
        .then((res) => res.json())
        .then((data) => {
          const filteredMovies = data.results.filter((dato) =>
            dato.genre_ids.includes(category)
          );

          setMovieTvData((movieTvData) => ({
            ...movieTvData,
            movies: filteredMovies,
          }));
        })
        .catch((err) => console.error(err));
    },

    series: [],
    getSeries: function (term, category) {
      fetch(`${serieUrl}?query=${term}`, options)
        .then((res) => res.json())
        .then((data) => {
          const filteredSeries = data.results.filter((dato) =>
            dato.genre_ids.includes(category)
          );

          setMovieTvData((movieTvData) => ({
            ...movieTvData,
            series: filteredSeries,
          }));
        })
        .catch((err) => console.error(err));
    },

    genres: [],
    getGenres: function () {
      fetch(movieGenreUrl, options)
        .then((res) => res.json())
        .then((data) =>
          setMovieTvData((movieTvData) => ({
            ...movieTvData,
            genres: data,
          }))
        )
        .catch((err) => console.error(err));
    },
  });

  useEffect(() => movieTvData.getGenres(), []);

  return (
    <MovieTvContext.Provider value={movieTvData}>
      {children}
    </MovieTvContext.Provider>
  );
}
