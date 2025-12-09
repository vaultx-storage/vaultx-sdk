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
    this.baseUrl = config.apiBaseUrl.replace(/\/$/, ""); // remove trailing slash
    this.timeoutMs = config.timeoutMs ?? 30_000; // default 30s timeout
  }

  /** Example request helper */
  private async _request(path: string, method: string = "GET", body?: any): Promise<any> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(this.config.apiKey ? { Authorization: `Bearer ${this.config.apiKey}` } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });

    if (!response.ok) {
      throw new Error(`VaultX API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /** Example method: create deal (future) */
  async createDeal(fileCid: string, size: number): Promise<any> {
    return this._request("/deal/create", "POST", { fileCid, size });
  }

  /** Example method: query deal status */
  async getDealStatus(dealId: string): Promise<any> {
    return this._request(`/deal/status/${dealId}`, "GET");
  }
}
