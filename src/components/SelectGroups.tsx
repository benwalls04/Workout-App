import { useState } from "react";

interface Props {
  type: number;
}

const SelectGroups = ({ type }: Props) => {
  const [groups, setGroups] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const [classes, setClasses] = useState([
    "muscle-button",
    "muscle-button",
    "muscle-button",
    "muscle-button",
    "muscle-button",
    "muscle-button",
    "muscle-button",
    "muscle-button",
    "muscle-button",
    "muscle-button",
  ]);

  const handleClick = (index: number) => {
    setGroups((groups) => {
      const newGroups = [...groups];
      newGroups[index] = (groups[index] + 1) % 3;
      return newGroups;
    });

    setClasses((classes) => {
      const newClasses = [...classes];
      const num = groups[index];

      if (num === 0) {
        newClasses[index] = "muscle-button";
      } else if (num === 1) {
        newClasses[index] = "selected-muscle-button1";
      } else {
        newClasses[index] = "selected-muscle-button2";
      }

      return newClasses;
    });
  };

  let headerText = "Emphasis groups:";
  let subheaderText = "Double click for extra emphasis";
  if (type === 2) {
    headerText = "Neglected Groups";
    subheaderText = "Double click for extra neglect";
  }

  return (
    <div className="form-container">
      {headerText}
      <div className="sub-header"> {subheaderText} </div>
      <div className="muscle-button-container">
        <button className={classes[0]} onClick={() => handleClick(0)}>
          Chest
        </button>
        <button className={classes[1]} onClick={() => handleClick(1)}>
          Back
        </button>
        <button className={classes[2]} onClick={() => handleClick(2)}>
          Legs
        </button>
        <button className={classes[3]} onClick={() => handleClick(3)}>
          Biceps
        </button>
        <button className={classes[4]} onClick={() => handleClick(4)}>
          Triceps
        </button>
        <button className={classes[5]} onClick={() => handleClick(5)}>
          Front Deltoids
        </button>
        <button className={classes[6]} onClick={() => handleClick(6)}>
          Side Deltoids
        </button>
        <button className={classes[7]} onClick={() => handleClick(7)}>
          Rear Deltoids
        </button>
        <button className={classes[8]} onClick={() => handleClick(8)}>
          Traps
        </button>
        <button className={classes[9]} onClick={() => handleClick(9)}>
          Calves
        </button>
      </div>
    </div>
  );
};

export default SelectGroups;
