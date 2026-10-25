import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sections from "./pages/Sections";
import Terms from "./pages/Terms";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/sections" element={<Sections />} />

        <Route path="/terms" element={<Terms />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;