// src/client.ts
// Minimal VaultX SDK client skeleton

export interface VaultXClientConfig {
  /** Base URL of the VaultX API, e.g. https://api.vaultx.one */
  apiBaseUrl: string;

  /** Optional API key or auth token (future use) */
  apiKey?: string;

  /** Optional request timeout in milliseconds */
  timeoutMs?: number;
}

export class VaultXClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(private readonly config: VaultXClientConfig) {
    this.baseUrl = config.apiBaseUrl.replace(/\/$/, "");
    this.timeoutMs = config.timeoutMs ?? 30_000;
  }

  /**
   * Example: upload a file to VaultX.
   * NOTE: This is just a placeholder for now and will be implemented
   * once the vaultx-api endpoints are finalized.
   */
  async uploadFile(
    _data: Blob | ArrayBuffer | Uint8Array,
    _options?: { filename?: string }
  ): Promise<{ dealId: string; cid: string }> {
    throw new Error(
      "VaultXClient.uploadFile is not implemented yet. " +
        "This SDK is currently a skeleton."
    );
  }

  /**
   * Example: query deal status.
   * Placeholder – to be wired to /api/deal/status later.
   */
  async getDealStatus(
    _dealId: string
  ): Promise<{ status: string; lastUpdated: string }> {
    throw new Error(
      "VaultXClient.getDealStatus is not implemented yet. " +
        "This SDK is currently a skeleton."
    );
  }

  /** Helper to build full API URLs */
  private buildUrl(path: string): string {
    return `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  }
}
