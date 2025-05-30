import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Landing from "./components/Landing";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";


function App() {

  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  )
}

export default App
