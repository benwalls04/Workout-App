import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  redirect,
} from "react-router-dom";
import InputPage from "./components/InputPage";
import OutputPage from "./components/OutputPage";
import getRoutines from "./utils/getRoutines";

const App = () => {
  const [inputData, setInputData] = useState([]);
  const [outputData, setOutputData] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = () => {
    const result = getRoutines(inputData);
    setOutputData(result);
    setRedirect(true);
  };

  if (!redirect) {
    return (
      <InputPage setInputData={setInputData} handleSubmit={handleSubmit} />
    );
  } else {
    return <OutputPage outputData={outputData} handleSubmit={handleSubmit} />;
  }
};

export default App;
