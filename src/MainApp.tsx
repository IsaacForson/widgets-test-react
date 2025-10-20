import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GenericDynamicPage from "./pages/GenericDynamicPage";
import WizardPage from "./pages/WizardPage";
import "./MainApp.css";

function MainApp() {
  return (
    <Router>
      <div className="main-app">
        <nav className="main-nav">
          <div className="nav-container">
            <Link to="/" className="nav-brand">
              🎨 Form Builder
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Home
              </Link>
             {/*  <Link to="/signup" className="nav-link">
                Signup
              </Link>
              <Link to="/signin" className="nav-link">
                Signin
              </Link> */}
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/:manifestId" element={<GenericDynamicPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default MainApp;
