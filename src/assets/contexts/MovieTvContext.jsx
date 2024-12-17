import { createContext, useContext, useEffect, useState } from "react";

// # Context Consumer
const MovieTvContext = createContext();
export const UseMovieTvContext = () => useContext(MovieTvContext);

// # Context Provider
export function MovieTvContextProvider({ children }) {
  const VITE_API_URL_MOVIE = "https://api.themoviedb.org/3/search/movie";
  const VITE_API_URL_MOVIE_GENRE =
    "https://api.themoviedb.org/3/genre/movie/list";
  const VITE_API_URL_SERIE = "https://api.themoviedb.org/3/search/tv";
  const VITE_API_KEY =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWNlMzlkNjVkYjQ0NTljMGVmYmVhODMxZmQ3NGJkNyIsIm5iZiI6MTczNDM0NDcxNi45ODg5OTk4LCJzdWIiOiI2NzYwMDAwYzk2Y2ZkZGJmMTljY2Q2NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-zluL97uiaR_nGLE_BhZJ2Ijv8FCDyGxWVJJVo0LM5Q";

  const movieUrl = VITE_API_URL_MOVIE;
  const movieGenreUrl = VITE_API_URL_MOVIE_GENRE;
  const serieUrl = VITE_API_URL_SERIE;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: VITE_API_KEY,
    },
  };

  const [movieTvData, setMovieTvData] = useState({
    movies: [],
    getMovies: function (term, category) {
      fetch(`${movieUrl}?query=${term}`, options)
        .then((res) => res.json())
        .then((data) => {
          let filteredMovies;
          category === ""
            ? (filteredMovies = data.results)
            : (filteredMovies = data.results.filter((dato) =>
                dato.genre_ids.includes(category)
              ));

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
          let filteredSeries;
          category === ""
            ? (filteredSeries = data.results)
            : (filteredSeries = data.results.filter((dato) =>
                dato.genre_ids.includes(category)
              ));

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
