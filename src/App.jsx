import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SendMoney from './pages/SendMoney';
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './context/ProtectedRoute';
import Register from './pages/Register';


function App() {
  return (

    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send" element={<SendMoney />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  )

}

export default App
