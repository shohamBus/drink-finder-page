import React, { useEffect } from "react";
import GridComp from "./components/grid/GridComp";
import { AllUsers } from "./redux/slices/allUsersSlice";
import "./App.css";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:5000/api/users", {})
      .then((res) => res.json())
      .then((res) => dispatch(AllUsers(res)));
  }, []);
  return (
    <div className="App">
      <GridComp />
    </div>
  );
}
export default App;
