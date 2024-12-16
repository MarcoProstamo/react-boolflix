import { useEffect } from "react";
import { UseMovieTvContext } from "../contexts/MovieTvContext";

export default function Main() {
  const { movies, getMovies, series, getSeries } = UseMovieTvContext();
  useEffect(() => {
    getMovies("Natale");
    getSeries("Harry");
  }, []);
  if (movies.results) console.log(movies.results.map((res) => res.title));
  if (series.results) console.log(series.results.map((res) => res.name));

  return (
    <main>
      <h1>Main</h1>
    </main>
  );
}
