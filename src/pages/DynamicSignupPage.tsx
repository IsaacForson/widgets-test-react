import React from "react";
import { useNavigate } from "react-router-dom";
import DynamicPageEngine from "../components/DynamicPageEngine";
import { signupManifest } from "../manifests/signupManifest";

const DynamicSignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Signup form submitted with data:", data);

    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Account created successfully!");
        resolve();
      }, 2000);
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <DynamicPageEngine
      manifest={signupManifest}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default DynamicSignupPage;
