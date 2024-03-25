import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login/Login";
import { Cars } from "./Cars/Cars";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/cars" element={<Cars />}></Route>
      </Routes>
    </div>
  );
}

export default App;
