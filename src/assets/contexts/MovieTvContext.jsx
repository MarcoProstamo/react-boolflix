import { createContext, useContext, useEffect, useState } from "react";

// # Context Consumer
const MovieTvContext = createContext();
export const UseMovieTvContext = () => useContext(MovieTvContext);

// # Context Provider
export function MovieTvContextProvider({ children }) {
  const movieUrl = import.meta.env.VITE_API_URL_MOVIE;
  const movieDetailUrl = import.meta.env.VITE_API_URL_MOVIE_DETAILS;
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
    getMovies: function (term) {
      fetch(`${movieUrl}?query=${term}`, options)
        .then((res) => res.json())
        .then((data) => {
          //   movieTvData.getMovieOriginCountry(data.results.id);
          setMovieTvData((movieTvData) => ({
            ...movieTvData,
            movies: data,
            // origin_country: movieTvData.movieOriginCountry,
          }));
        })
        .catch((err) => console.error(err));
    },
    // movieOriginCountry: "",
    // getMovieOriginCountry: function (movieId) {
    //   fetch(`${movieDetailUrl}/${movieId}`, options)
    //     .then((res) => res.json())
    //     .then((data) =>
    //       setMovieTvData((movieTvData) => ({
    //         ...movieTvData,
    //         movieOriginCountry: data.origin_country,
    //       }))
    //     )
    //     .catch((err) => console.error(err));
    // },
    series: [],
    getSeries: function (term) {
      fetch(`${serieUrl}?query=${term}`, options)
        .then((res) => res.json())
        .then((data) =>
          setMovieTvData((movieTvData) => ({ ...movieTvData, series: data }))
        )
        .catch((err) => console.error(err));
    },
  });

  return (
    <MovieTvContext.Provider value={movieTvData}>
      {children}
    </MovieTvContext.Provider>
  );
}
