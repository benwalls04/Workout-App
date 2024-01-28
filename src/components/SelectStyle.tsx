import { useState } from "react";

const SelectStyle = () => {
  const [style, setStyle] = useState("neutral");

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value >= 80) {
      setStyle("strength+");
    } else if (value >= 60) {
      setStyle("strength");
    } else if (value >= 40) {
      setStyle("neutral");
    } else if (value >= 20) {
      setStyle("aesthetics");
    } else {
      setStyle("aesthetics+");
    }
  };

  return (
    <div className="form-container">
      <div id="exp-text">Your training goal: {style}</div>
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

export default SelectStyle;
