import "./checkboxDropdown.scss";
import { useState, useEffect } from "react";

export default function CheckboxDropdown(props) {
  const [showList, setShowList] = useState(false);
  function renderValue() {
    return "GENRE";
  }
  useEffect(() => {}, [props.genres]);
  let toggleList = () => {
    setShowList(!showList);
  };
  return (
    <div className="select">
      <button onClick={toggleList}>
        <span className="select_value">{renderValue()}</span>
      </button>

      <div className={showList ? "select_list" : "select_list hide"}>
        {props.genres.map((item, index) => {
          return (
            <>
              <a
                key={index}
                className={!item.selected ? "" : "selected"}
                value={item.genre}
                onClick={(e) => props.handleCheckboxClick(e)}
              >
                {item.genre}
              </a>
            </>
          );
        })}
      </div>
    </div>
  );
}
