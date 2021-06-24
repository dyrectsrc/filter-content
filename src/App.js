import media from "./data";
import "./App.scss";
import Media from "./components/media/media";
import CheckboxDropdown from "./components/checkboxDropdown/checkboxDropdown";
import YearDropdown from "./components/yearDropdown/yearDropdown";
import Searchbox from "./components/searchbox/searchbox";
import ScssProject from "./components/scssExercise/scssExercise";
import { useState, usePrevious, useEffect } from "react";

let genreArrBook = [];
let genreArrMovie = [];
let allGenres = [];
let genreMovieObjs = [];
let yearMovieObjs = [];
let yearBookObjs = [];
let genreBookObjs = [];
let allGenreObjs = [];
let yearArrMovie = [];
let yearArrBook = [];
let allYears = [];
let allYearsObjs = [];
let mediaBooks = [];
let mediaMovies = [];
let allMedia = [];

//Get all genres and years from array of media objects

media.map((item) => {
  if (item.type == "book") {
    genreArrBook.push(...item.genre);
    yearArrBook.push(item.year);
    mediaBooks.push(item);
  } else if (item.type == "movie") {
    genreArrMovie.push(...item.genre);
    yearArrMovie.push(item.year);
    mediaMovies.push(item);
  }
});

//Make 3 seperate arrays for years, genres and all, with no duplicates
genreArrMovie = [...new Set(genreArrMovie)];
genreArrBook = [...new Set(genreArrBook)];
allGenres = [...new Set([...genreArrMovie, ...genreArrBook])];
yearArrMovie = [...new Set(yearArrMovie)];
yearArrBook = [...new Set(yearArrBook)];
allYears = [...new Set([...yearArrMovie, ...yearArrBook])];

//Create object from each item in array and add selected property to use for filtering
//Todo: Refactor code to make it more DRY
genreArrMovie.forEach((genre) => {
  genreMovieObjs.push({ genre: genre, selected: false });
});

genreArrBook.forEach((genre) => {
  genreBookObjs.push({ genre: genre, selected: false });
});

allGenres.forEach((genre) => {
  allGenreObjs.push({ genre: genre, selected: false });
});

yearArrMovie.forEach((year) => {
  yearMovieObjs.push({ year: year, selected: false });
});

yearArrBook.forEach((year) => {
  yearBookObjs.push({ year: year, selected: false });
});
allYears.forEach((year) => {
  allYearsObjs.push({ year: year, selected: false });
});

let orderSort = (arr, property) => {
  arr.sort(function (a, b) {
    return a[property].localeCompare(b[property]);
  });
  return arr;
};

allYearsObjs = orderSort(allYearsObjs, "year");
yearBookObjs = orderSort(yearBookObjs, "year");
yearMovieObjs = orderSort(yearMovieObjs, "year");
genreMovieObjs = orderSort(genreMovieObjs, "genre");
genreBookObjs = orderSort(genreBookObjs, "genre");
allGenreObjs = orderSort(allGenreObjs, "genre");

function App() {
  const [genres, setGenres] = useState(allGenreObjs);
  const [medias, setMedias] = useState(media);
  const [years, setYears] = useState(allYearsObjs);
  const [type, setType] = useState();
  const [searchField, setSearchField] = useState("");

  let newMedia = [];

  const handleCheckbox = (e) => {
    genres.map((item, index) => {
      if (e.target.innerText == item.genre) {
        item.selected = !item.selected;
      }
    });

    years.map((item, index) => {
      if (e.target.innerText == item.year) {
        item.selected = !item.selected;
      }
    });

    setYears(years);
    setGenres(genres);

    genres.map((item) => {
      if (item.selected == true) {
        media.map((item2) => {
          if (item2.genre.includes(item.genre) && item2.type == type) {
            newMedia.push(item2);
          } else if (item2.genre.includes(item.genre) && !type) {
            newMedia.push(item2);
          }
        });
      }
    });
    years.map((item) => {
      if (item.selected == true) {
        media.map((item2) => {
          if (item2.year == item.year && item2.type == type) {
            newMedia.push(item2);
          } else if (item2.year == item.year && !type) {
            newMedia.push(item2);
          }
        });
      }
    });
    newMedia = [...new Set(newMedia)];
    newMedia = newMedia.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    setMedias([...newMedia]);
  };

  let onChangeMedia = (e) => {
    if (e.target.value == "Movie") {
      setGenres(genreMovieObjs);
      setMedias(mediaMovies);
      setYears(yearMovieObjs);
      setType("movie");
    } else if (e.target.value == "Book") {
      setGenres(genreBookObjs);
      setMedias(mediaBooks);
      setYears(yearBookObjs);
      setType("book");
    }
  };

  let onSearchChange = (e) => {
    setSearchField(e.target.value);
    const filteredMedia = media.filter((media) => {
      return media.title.toLowerCase().includes(searchField.toLowerCase());
    });
    setMedias(filteredMedia);
  };

  let clearFilter = (e) => {
    document.getElementById("book").checked = false;
    document.getElementById("movie").checked = false;
    setMedias(media);
    setYears(allYearsObjs);
    setGenres(allGenreObjs);
  };

  return (
    <div className="App">
      <ScssProject />
      <div className="filter-wrap">
        <CheckboxDropdown
          genres={genres}
          handleCheckboxClick={handleCheckbox}
        />
        <YearDropdown years={years} handleCheckboxClick={handleCheckbox} />
        <div className="column3"></div>
        <Searchbox searchChange={onSearchChange} />
      </div>
      <div className="filter-wrap-2">
        <div onChange={onChangeMedia}>
          <input type="radio" value="Book" name="media" id="book" />{" "}
          <span>Book</span>
          <input type="radio" value="Movie" name="media" id="movie" />{" "}
          <span>Movie</span>
        </div>
        <div className="column2"></div>
        <div className="clear-filter">
          <span onClick={clearFilter}>Clear_filter</span>
        </div>
      </div>
      <Media medias={medias} />
    </div>
  );
}

export default App;
