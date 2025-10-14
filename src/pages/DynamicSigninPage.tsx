import React from "react";
import { useNavigate } from "react-router-dom";
import DynamicPageEngine from "../components/DynamicPageEngine";
import { signinManifest } from "../manifests/signinManifest";

const DynamicSigninPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Signin form submitted with data:", data);

    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login
        if (data.email && data.password) {
          console.log("Signed in successfully!");
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1500);
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <DynamicPageEngine
      manifest={signinManifest}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default DynamicSigninPage;
