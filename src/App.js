import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import  AppLayout  from "./Components/Layouts/AppLayout";
import { Detail } from "./Pages/Detail";


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail/>} />

        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
