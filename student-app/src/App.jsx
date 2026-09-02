import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Home from "./pages/Home";
import Students from "./pages/Students";
import About from "./pages/About";
import StudentDetails from "./pages/StudentDetails";
import Attendance from "./pages/Attendance";

import { StudentProvider } from "./context/StudentContext";

import Navbar from "./components/Navbar";

import "./App.css";

function AppLayout() {
  const location = useLocation();

  return (
    <div className="app">

      {/* Hide Navbar on Login page */}
      {location.pathname !== "/login" && <Navbar />}

      <main className="main-content">

        <Routes>

          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />
<Route
  path="/register"
  element={<Register />}
/>
          {/* HOME */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* STUDENTS */}

          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />

          {/* STUDENT DETAILS */}

          <Route
            path="/students/:id"
            element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            }
          />

          {/* ABOUT */}

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          {/* ATTENDANCE */}

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <StudentProvider>

        <AppLayout />

      </StudentProvider>

    </BrowserRouter>
  );
}

export default App;

