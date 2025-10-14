import type { PageManifest } from "../types/manifest";
import { signupManifest } from "../manifests/signupManifest";
import { signinManifest } from "../manifests/signinManifest";
import { contactManifest } from "../manifests/contactManifest";
import { surveyManifest } from "../manifests/surveyManifest";

// Local manifest cache
const LOCAL_MANIFESTS: Record<string, PageManifest> = {
  signup: signupManifest,
  signin: signinManifest,
  contact: contactManifest,
  survey: surveyManifest,
};

export interface ManifestServiceConfig {
  baseUrl?: string;
  apiKey?: string;
  timeout?: number;
}

export class ManifestService {
  private config: ManifestServiceConfig;

  constructor(config: ManifestServiceConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || "http://localhost:3001/api",
      timeout: config.timeout || 5000,
      ...config,
    };
  }

  /**
   * Fetch a manifest by ID from external API or local cache
   */
  async getManifest(manifestId: string): Promise<PageManifest> {
    try {
      // First try to fetch from external API if configured
      if (
        this.config.baseUrl &&
        this.config.baseUrl !== "http://localhost:3001/api"
      ) {
        return await this.fetchFromAPI(manifestId);
      }
    } catch (error) {
      console.warn(
        `Failed to fetch manifest from API for ${manifestId}:`,
        error
      );
    }

    // Fallback to local manifest
    const localManifest = LOCAL_MANIFESTS[manifestId];
    if (!localManifest) {
      throw new Error(`Manifest not found: ${manifestId}`);
    }

    return localManifest;
  }

  /**
   * Fetch manifest from external API
   */
  private async fetchFromAPI(manifestId: string): Promise<PageManifest> {
    const url = `${this.config.baseUrl}/manifests/${manifestId}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.config.apiKey) {
      headers["Authorization"] = `Bearer ${this.config.apiKey}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const manifest: PageManifest = await response.json();

      // Validate the manifest structure
      this.validateManifest(manifest);

      return manifest;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Basic manifest validation
   */
  private validateManifest(manifest: unknown): void {
    if (!manifest || typeof manifest !== "object") {
      throw new Error("Invalid manifest: must be an object");
    }

    const manifestObj = manifest as Record<string, unknown>;
    const required = ["id", "title", "fields", "layout"];
    const missing = required.filter((field) => !manifestObj[field]);

    if (missing.length > 0) {
      throw new Error(
        `Invalid manifest: missing required fields: ${missing.join(", ")}`
      );
    }

    if (!Array.isArray(manifestObj.fields)) {
      throw new Error("Invalid manifest: fields must be an array");
    }

    const layout = manifestObj.layout as Record<string, unknown>;
    if (!layout?.sections || !Array.isArray(layout.sections)) {
      throw new Error("Invalid manifest: layout.sections must be an array");
    }
  }

  /**
   * Get all available manifest IDs
   */
  async getAvailableManifests(): Promise<string[]> {
    try {
      if (
        this.config.baseUrl &&
        this.config.baseUrl !== "http://localhost:3001/api"
      ) {
        const response = await fetch(`${this.config.baseUrl}/manifests`);
        if (response.ok) {
          const data = await response.json();
          return data.manifests || [];
        }
      }
    } catch (error) {
      console.warn("Failed to fetch available manifests from API:", error);
    }

    // Return local manifests
    return Object.keys(LOCAL_MANIFESTS);
  }

  /**
   * Cache a manifest locally
   */
  cacheManifest(manifest: PageManifest): void {
    LOCAL_MANIFESTS[manifest.id] = manifest;
  }

  /**
   * Clear local manifest cache
   */
  clearCache(): void {
    Object.keys(LOCAL_MANIFESTS).forEach((key) => {
      if (
        key !== "signup" &&
        key !== "signin" &&
        key !== "contact" &&
        key !== "survey"
      ) {
        delete LOCAL_MANIFESTS[key];
      }
    });
  }
}

// Default instance
export const manifestService = new ManifestService();
