import { useState } from "react";

const SelectBias = () => {
  return (
    <div className="form-container">
      Major muscle group bias:
      <input type="range" className="slider" />
      <div className="bias-labels">
        <div className="left-bias-label">Lower Chest</div>
        <div className="right-bias-label">Upper Chest</div>
      </div>
      <input type="range" className="slider" />
      <div className="bias-labels">
        <div className="left-bias-label">Lats</div>
        <div className="right-bias-label">Upper Back</div>
      </div>
      <input type="range" className="slider" />
      <div className="bias-labels">
        <div className="left-bias-label">Hamstrings</div>
        <div className="right-bias-label">Quads</div>
      </div>
    </div>
  );
};

export default SelectBias;
