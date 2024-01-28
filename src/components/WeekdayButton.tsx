import { useState, useEffect } from "react";

interface Props {
  day: String;
  dayState: boolean;
  setDay: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeekdayButton = ({ day, dayState, setDay }: Props) => {
  const [id, setId] = useState("");

  const handleClick = () => {
    if (dayState === false) {
      setDay(true);
      console.log("true");
    } else {
      setDay(false);
      console.log("false");
    }
  };

  useEffect(() => {
    if (dayState) {
      setId("select-button");
    } else {
      setId("");
    }
  }, [dayState]);

  return (
    <button
      className="day-button btn btn-outline-danger"
      id={id}
      onClick={handleClick}
    >
      {day}
    </button>
  );
};

export default WeekdayButton;
