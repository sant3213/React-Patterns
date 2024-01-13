import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Login/Login';
import { Pets } from './Pets/Pets';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/pets" element={<Pets/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
