import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GenericDynamicPage from "./pages/GenericDynamicPage";
import WizardPage from "./pages/WizardPage";
import WizardSummaryPage from "./pages/WizardSummaryPage";
import "./MainApp.css";

function MainApp() {
  return (
    <Router>
      <div className="main-app">
        <nav className="main-nav">
          <div className="nav-container">
            <Link to="/" className="nav-brand">
              🎨 Wizard Builder
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/wizard/summary" element={<WizardSummaryPage />} />
            <Route path="/:manifestId" element={<GenericDynamicPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default MainApp;
