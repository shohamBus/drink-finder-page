import React, { useEffect } from "react";
import GridComp from "./components/grid/GridComp";
import { AllUsers } from "./redux/slices/allUsersSlice";
import "./App.css";
import { useDispatch } from "react-redux";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:5000/api/users", {})
      .then((res) => res.json())
      .then((res) => dispatch(AllUsers(res)));
  }, []);
  return (
    <div className="App">
      {/* <Router> */}
      <GridComp />
      {/* <Routes> */}
      {/* <Route path="/" exact></Route> */}
      {/* <Route path="/user" exact></Route> */}
      {/* <Navigate to="/" />
        </Routes>
      </Router> */}
    </div>
  );
}
export default App;
