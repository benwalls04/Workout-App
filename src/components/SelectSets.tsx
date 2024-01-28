import { useState } from "react";

const SelectSets = () => {
  const [buttons, setButtons] = useState([false, false, false, false]);
  const [ids, setIds] = useState(["", "", "", ""]);

  const handleClick = (index: number) => {
    let arr = [false, false, false, false];
    let idArr = ["", "", "", ""];
    idArr[index] = "select-button";
    arr[index] = true;
    setButtons(arr);
    setIds(idArr);
  };

  return (
    <div className="form-container">
      <div id="sets-text">Sets per workout:</div>
      <button
        className="btn btn-outline-danger sets-button"
        id={ids[0]}
        onClick={() => handleClick(0)}
      >
        1
      </button>
      <button
        className="btn btn-outline-danger sets-button"
        id={ids[1]}
        onClick={() => handleClick(1)}
      >
        2
      </button>
      <button
        className="btn btn-outline-danger sets-button"
        id={ids[2]}
        onClick={() => handleClick(2)}
      >
        3
      </button>
      <button
        className="btn btn-outline-danger sets-button"
        id={ids[3]}
        onClick={() => handleClick(3)}
      >
        4
      </button>
    </div>
  );
};

export default SelectSets;
