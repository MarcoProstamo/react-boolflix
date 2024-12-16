import { MovieTvContextProvider } from "./assets/contexts/MovieTvContext";
import Header from "./assets/layout/Header";
import Main from "./assets/layout/Main";

export default function App() {
  return (
    <MovieTvContextProvider>
      <div className="wrapper" data-bs-theme="dark">
        <Header />
        <Main />
      </div>
    </MovieTvContextProvider>
  );
}
