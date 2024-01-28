import WeekdayButton from "./WeekdayButton";
import { useState } from "react";

const SelectWeekdays = () => {
  const [monday, setMonday] = useState(false);
  const [teusday, setTeusday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  return (
    <div className="form-container">
      Which days would you like to lift?
      <div id="days-button-grid">
        <WeekdayButton day={"M"} dayState={monday} setDay={setMonday} />
        <WeekdayButton day={"T"} dayState={teusday} setDay={setTeusday} />
        <WeekdayButton day={"W"} dayState={wednesday} setDay={setWednesday} />
        <WeekdayButton day={"Th"} dayState={thursday} setDay={setThursday} />
        <WeekdayButton day={"F"} dayState={friday} setDay={setFriday} />
        <WeekdayButton day={"S"} dayState={saturday} setDay={setSaturday} />
        <WeekdayButton day={"Su"} dayState={sunday} setDay={setSunday} />
      </div>
    </div>
  );
};

export default SelectWeekdays;
