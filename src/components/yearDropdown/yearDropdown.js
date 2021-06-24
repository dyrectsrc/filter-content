import "./yearDropdown.scss";
import { useState, useEffect } from "react";

export default function YearDropdown(props) {
  const [showList, setShowList] = useState(false);

  let toggleList = () => {
    setShowList(!showList);
  };

  function renderValue() {
    return "YEAR";
  }

  useEffect(() => {}, [props.years]);

  return (
    <div className="select">
      <button onClick={toggleList}>
        <span className="select_value">{renderValue()}</span>
      </button>

      <div className={showList ? "select_list" : "select_list hide"}>
        {props.years.map((item, index) => {
          return (
            <>
              <a
                key={index}
                className={!item.selected ? "" : "selected"}
                value={item.year}
                onClick={(e) => props.handleCheckboxClick(e)}
              >
                {item.year}
              </a>
            </>
          );
        })}
      </div>
    </div>
  );
}
