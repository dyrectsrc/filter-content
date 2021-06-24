import "./media.scss";
export default function Media(props) {
  return (
    <div className="media-wrap">
      {props.medias.map((item) => {
        return (
          <li className="media-item">
            <img src={item.poster} width="240px" />
            <p className="title-year">
              {item.title} ({item.year})
            </p>

            <p className="genres">
              <span>Genres: {item.genre.join(", ")}</span>
            </p>
          </li>
        );
      })}
    </div>
  );
}
