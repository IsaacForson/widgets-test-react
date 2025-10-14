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
                to="/page/signup"
                className="submit-button"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                🔧 Generic Signup (via manifest ID)
              </Link>

              <Link
                to="/page/signin"
                className="submit-button"
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                }}
              >
                🔧 Generic Signin (via manifest ID)
              </Link>
            </div>
          </div>

          <div className="form-section">
            <h2>How It Works</h2>
            <div
              style={{ textAlign: "left", color: "#4a5568", lineHeight: "1.6" }}
            >
              <p>
                <strong>1. Manifest Definition:</strong> Pages are defined using
                JSON-like manifests that specify fields, layout, validation, and
                styling.
              </p>

              <p>
                <strong>2. Dynamic Rendering:</strong> The DynamicPageEngine
                component reads manifests and automatically generates complete,
                interactive forms.
              </p>

              <p>
                <strong>3. External AI Integration:</strong> Manifests can be
                fetched from external APIs, allowing AI to generate pages
                on-demand.
              </p>

              <p>
                <strong>4. All Halo Widgets:</strong> Supports all widget types
                - text, email, phone, date, number, slider, radio, checkbox,
                dropdown, textarea, and location inputs.
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
