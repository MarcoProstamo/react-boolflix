import { UseMovieTvContext } from "../contexts/MovieTvContext";
import Card from "../components/Card";
export default function Main() {
  const { movies, series } = UseMovieTvContext();

  return (
    <main>
      <div className="container">
        {/* Movie or TV Series Exists? */}
        <div className="mt-5 d-flex justify-content-center align-items-center flex-column">
          {(!series || series.length === 0) && (
            <h2 className="fw-semibold text-terziary">No TV Series Found</h2>
          )}
          {(!movies || movies.length === 0) && (
            <h2 className="fw-semibold text-terziary">No Movies Found</h2>
          )}
        </div>

        {/* Movie Output */}
        {movies && movies.length > 0 && (
          <section className="my-5">
            <h2 className="fs-1 text-center fw-semibold">Movies</h2>
            <div className="row row-cols-auto gap-1 justify-content-center">
              {movies.map((movie) => (
                <div key={movie.id} className="col">
                  <Card item={movie} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TV Series Output */}
        {series && series.length > 0 && (
          <section className="my-5">
            <h2 className="fs-1 text-center fw-semibold">TV Series</h2>
            <div className="row row-cols-auto gap-1 justify-content-center">
              {series.map((serie) => (
                <div key={serie.id} className="col">
                  <Card item={serie} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
