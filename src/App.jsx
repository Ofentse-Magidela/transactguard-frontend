import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './context/ProtectedRoute';

function App() {
  return (

    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  )

}

export default App
