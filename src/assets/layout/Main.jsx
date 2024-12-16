import { UseMovieTvContext } from "../contexts/MovieTvContext";
import Card from "../components/Card";
export default function Main() {
  const { movies, series, getMovieOriginCountry, movieOriginCountry } =
    UseMovieTvContext();

  return (
    <main>
      <div className="container">
        {/* Movie or TV Series Exists? */}
        <div className="mt-5 d-flex justify-content-center align-items-center flex-column">
          {(!series.results || series.results.length === 0) && (
            <h2 className="fw-semibold text-terziary">No TV Series Found</h2>
          )}
          {(!movies.results || movies.results.length === 0) && (
            <h2 className="fw-semibold text-terziary">No Movies Found</h2>
          )}
        </div>

        {/* Movie Output */}
        {movies.results && series.results.length > 0 && (
          <section className="my-5">
            <h2 className="fs-1 text-center fw-semibold">Movies</h2>
            <div className="row row-cols-3 gap-1">
              {movies.results.map((movie) => (
                <Card key={movie.id} item={movie} />
              ))}
            </div>
          </section>
        )}

        {/* TV Series Output */}
        {series.results && series.results.length > 0 && (
          <section className="my-5">
            <h2 className="fs-1 text-center fw-semibold">TV Series</h2>
            <div className="row row-cols-3 gap-1">
              {series.results.map((serie) => (
                <Card key={serie.id} item={serie} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
