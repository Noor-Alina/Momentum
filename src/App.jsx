import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import WorkoutsPage from "./pages/WorkoutsPage/WorkoutsPage";
import TrackingPage from "./pages/TrackingPage/TrackingPage";
import MealPlanningPage from "./pages/MealPlanningPage/MealPlanningPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/LogIn" element={<LogInPage />} />
          <Route 
            path="/Workouts" 
            element={
              <ProtectedRoute>
                <WorkoutsPage />
              </ProtectedRoute>
              } 
          />
          <Route 
            path="/Tracking" 
            element={
              <ProtectedRoute>
                <TrackingPage />
              </ProtectedRoute>
              } 
          />
          <Route 
            path="/MealPlanning" 
            element={
              <ProtectedRoute>
                <MealPlanningPage />
              </ProtectedRoute>
              } 
          />
          <Route 
            path="/Profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
              } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;