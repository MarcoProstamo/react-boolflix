import { useState } from "react";
import { UseMovieTvContext } from "../contexts/MovieTvContext";

export default function Navbar() {
  const { getMovies, getSeries, genres } = UseMovieTvContext();

  const initialData = { term: "", category: "" };
  const [inputData, setInputData] = useState(initialData);

  function handleChange(e) {
    let newTerm;
    e.target.name === "term"
      ? (newTerm = e.target.value)
      : (newTerm = parseInt(e.target.value));

    const newData = {
      ...inputData,
      [e.target.name]: newTerm,
    };
    setInputData(newData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getSeries(inputData.term, inputData.category);
    getMovies(inputData.term, inputData.category);
    setInputData(initialData);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
      <div className="container-fluid">
        <a className="navbar-brand text-danger fw-bold fs-2" href="#">
          Boolflix
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-4">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Movies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                TV Series
              </a>
            </li>
          </ul>
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => handleSubmit(e)}
          >
            <select
              className="form-select"
              aria-label="Default select example"
              value={inputData.category}
              name="category"
              onChange={(e) => handleChange(e)}
            >
              <option value="">Open this select menu</option>
              {genres.genres &&
                genres.genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}{" "}
                  </option>
                ))}
            </select>

            <input
              className="form-control me-2 fs-4"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={inputData.term}
              onChange={(e) => handleChange(e)}
              name="term"
            />
            <button className="btn btn-outline-danger fs-4" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
