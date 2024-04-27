import Admin from "./Admin/Admin";
import Navbar from "./Ui/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="admin" element={<Admin />} />
        <Route path="dashboard" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
