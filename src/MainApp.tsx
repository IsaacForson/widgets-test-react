import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import SignupPage from "./SignupPage";
import "./MainApp.css";

function MainApp() {
  return (
    <Router>
      <div className="main-app">
        <nav className="main-nav">
          <div className="nav-container">
            <Link to="/" className="nav-brand">
              🎨 Halo Widgets
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Widgets Demo
              </Link>
              <Link to="/signup" className="nav-link">
                Signup Page
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default MainApp;
