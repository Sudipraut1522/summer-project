import Admin from "./Admin/Admin";
import { AuthProvider } from "./Auth";
import { Dashboard } from "./Dashboard";
import Navbar from "./Ui/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="admin" element={<Admin />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
