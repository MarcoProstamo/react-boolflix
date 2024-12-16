export default function Card({ item }) {
  const posterOrigin = import.meta.env.VITE_POSTER_URL;
  const posterSize = import.meta.env.VITE_POSTER_SIZE;
  const posterPath = item.poster_path;
  let posterUrl;
  if (posterPath) posterUrl = posterOrigin + posterSize + posterPath;

  function raiting(vote) {
    if (!vote || vote < 0) vote = 0;
    const stars = Math.round(vote / 2);
    const totalStars = 5;
    const starsArr = [];
    for (let i = 0; i < totalStars; i++) {
      i < stars
        ? starsArr.push(<i key={i} className="fa-solid fa-star"></i>)
        : starsArr.push(<i key={i} className="fa-regular fa-star"></i>);
    }
    return starsArr;
  }

  return (
    <div className="card p-0 cursor-pointer rounded">
      <img src={posterUrl} className="card-img img-fluid" alt="No Image 😢" />
      <div className="overlay">
        <p>
          <strong>Title: </strong> {item.title || item.name}
        </p>
        <p>
          <strong>Original Title: </strong>
          {item.original_title || item.original_name}
        </p>
        <p>{raiting(item.vote_average)}</p>
        <div className="my-1">
          {item.origin_country ? (
            <img
              src={`https://flagsapi.com/${item.origin_country}/flat/32.png`}
            />
          ) : (
            <p>
              <strong>Language: </strong>
              {item.original_language}
            </p>
          )}
        </div>
        <p>
          <strong>Description: </strong>
          {item.overview}
        </p>
      </div>
    </div>
  );
}
