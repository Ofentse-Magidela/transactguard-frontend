import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SendMoney from './pages/SendMoney';
import Register from './pages/Register';
import Transactions from './pages/Transactions';
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './context/ProtectedRoute';

function App() {
  return (

    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          }
        />

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
