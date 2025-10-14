import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DynamicPageEngine from "../components/DynamicPageEngine";
import { manifestService } from "../services/manifestService";
import type { PageManifest } from "../types/manifest";

const GenericDynamicPage: React.FC = () => {
  const { manifestId } = useParams<{ manifestId: string }>();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState<PageManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadManifest = async () => {
      if (!manifestId) {
        setError("No manifest ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const manifestData = await manifestService.getManifest(manifestId);
        setManifest(manifestData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load manifest"
        );
        setManifest(null);
      } finally {
        setLoading(false);
      }
    };

    loadManifest();
  }, [manifestId]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log(`Form submitted for ${manifestId} with data:`, data);

    // Simulate API call - in real app, this would submit to the appropriate endpoint
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure based on form data
        if (data.email && (data.password || data.firstName)) {
          console.log("Form submitted successfully!");
          resolve();
        } else {
          reject(new Error("Form submission failed"));
        }
      }, 2000);
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="dynamic-page">
        <div className="page-container">
          <div className="page-header">
            <h1>Loading...</h1>
            <p>Fetching page configuration...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dynamic-page">
        <div className="page-container">
          <div className="page-header">
            <h1>Error</h1>
            <p>{error}</p>
          </div>
          <div className="dynamic-form">
            <div className="form-actions">
              <button onClick={handleCancel} className="submit-button">
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className="dynamic-page">
        <div className="page-container">
          <div className="page-header">
            <h1>Page Not Found</h1>
            <p>The requested page configuration was not found.</p>
          </div>
          <div className="dynamic-form">
            <div className="form-actions">
              <button onClick={handleCancel} className="submit-button">
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DynamicPageEngine
      manifest={manifest}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default GenericDynamicPage;
