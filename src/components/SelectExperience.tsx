import { useState } from "react";

const SelectExperience = () => {
  const [exp, setExp] = useState("_");

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExp(Math.floor(parseInt(e.target.value) / 20).toString());

    if (e.target.value === "100") {
      setExp("5+");
    }
  };

  return (
    <div className="form-container">
      <div id="exp-text">Your experience level: {exp} years</div>
      <input
        type="range"
        className="slider"
        onChange={handleSliderChange}
        min="0"
        max="100"
      />
    </div>
  );
};

export default SelectExperience;
