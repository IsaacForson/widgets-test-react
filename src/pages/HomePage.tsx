import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="dynamic-page">
      <div className="page-container">
        <header className="page-header">
          <h1>🎨 Manifest-Driven Pages</h1>
          <p>Dynamic page generation using Halo Widgets and JSON manifests</p>
        </header>

        <div className="dynamic-form">
          <div className="form-section">
            <h2>Available Pages</h2>
            <p>
              All pages below are generated dynamically from manifest
              configurations:
            </p>

            <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
              <Link
                to="/signup"
                className="submit-button"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                📝 Signup Page
              </Link>

              <Link
                to="/signin"
                className="submit-button"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                🔐 Signin Page
              </Link>

              <Link
                to="/contact"
                className="submit-button"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                📧 Contact Form
              </Link>

              <Link
                to="/survey"
                className="submit-button"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                📊 User Survey
              </Link>
            </div>
          </div>

          <div className="form-section">
            <h2>How It Works</h2>
            <div
              style={{ textAlign: "left", color: "#4a5568", lineHeight: "1.6" }}
            >
              <p>
                <strong>1. Pure Dynamic:</strong> No static pages exist. All
                pages are generated dynamically from manifest configurations at
                runtime.
              </p>

              <p>
                <strong>2. URL-Based Loading:</strong> Simply visit /
                {`{manifestId}`} to load any manifest. The system automatically
                fetches and renders the page.
              </p>

              <p>
                <strong>3. AI-Ready:</strong> External AI can generate manifests
                and instantly create new pages without any code deployment.
              </p>

              <p>
                <strong>4. Complete Widget Support:</strong> All Halo widgets
                supported - text, email, phone, date, number, slider, radio,
                checkbox, dropdown, textarea, and location inputs.
              </p>
            </div>
          </div>

          <div className="form-section">
            <h2>Benefits</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  background: "#f7fafc",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem", color: "#2d3748" }}>
                  🚀 No Code Duplication
                </h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#718096" }}>
                  One engine handles all forms
                </p>
              </div>

              <div
                style={{
                  padding: "1rem",
                  background: "#f7fafc",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem", color: "#2d3748" }}>
                  ⚡ Dynamic Content
                </h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#718096" }}>
                  AI-generated pages on demand
                </p>
              </div>

              <div
                style={{
                  padding: "1rem",
                  background: "#f7fafc",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem", color: "#2d3748" }}>
                  🎯 Type Safe
                </h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#718096" }}>
                  Full TypeScript support
                </p>
              </div>

              <div
                style={{
                  padding: "1rem",
                  background: "#f7fafc",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem", color: "#2d3748" }}>
                  🎨 Consistent UX
                </h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#718096" }}>
                  Unified design system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
