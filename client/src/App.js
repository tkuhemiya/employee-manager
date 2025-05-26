import {BrowserRouter, Routes, Route} from "react-router-dom"
import Add from "./pages/Add";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
