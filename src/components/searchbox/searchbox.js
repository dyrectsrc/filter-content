import "./searchbox.scss";
export default function Searchbox({ searchfield, searchChange }) {
  return (
    <div className="searchbox-wrap">
      <input
        className="searchbox"
        type="search"
        placeholder="search media"
        onChange={searchChange}
      />
    </div>
  );
}
