import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SendMoney from './pages/SendMoney';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';
import Transactions from './pages/Transactions';
import NavigationBar from './components/NavigationBar';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from './context/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import UpdateUser from './pages/UpdateUser';



function App() {
  const { isAuthenticated, } = useAuth();

  const location = useLocation();

  const hideNav =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (

    <main>
      {isAuthenticated && !hideNav && <NavigationBar />}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminPage />
            </ProtectedRoute>
          }
        />

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

        <Route
          path="/updateInfo"
          element={
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  )

}

export default App
