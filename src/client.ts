// src/client.ts
// Minimal VaultX SDK client

/**
 * Configuration for the VaultX client.
 */
export interface VaultXClientConfig {
  /** Base URL of the VaultX API, e.g. https://api.vaultx.one */
  apiBaseUrl: string;

  /** Optional API key or auth token (future use) */
  apiKey?: string;

  /** Optional request timeout in milliseconds */
  timeoutMs?: number;
}

/**
 * Basic structure of an error returned by the API.
 */
export interface VaultXApiError {
  status: number;
  message: string;
  details?: unknown;
}

/**
 * Example input type for creating a deal.
 * 后面我们可以根据 vaultx-api 真实的接口再细化字段。
 */
export interface CreateDealParams {
  fileCid: string;        // 用户文件的 CID / 标识
  size: number;          // 字节数
  replication: number;   // 副本数量
}

/**
 * Example type for deal status.
 */
export interface DealStatus {
  dealId: string;
  status: "pending" | "active" | "failed" | "unknown";
  message?: string;
}

/**
 * Minimal VaultX client implementation.
 */
export class VaultXClient {
  private readonly apiBaseUrl: string;
  private readonly apiKey?: string;
  private readonly timeoutMs: number;

  constructor(config: VaultXClientConfig) {
    if (!config.apiBaseUrl) {
      throw new Error("VaultXClient: apiBaseUrl is required");
    }

    // 去掉末尾的斜杠，避免重复 //
    this.apiBaseUrl = config.apiBaseUrl.replace(/\/+$/, "");
    this.apiKey = config.apiKey;
    this.timeoutMs = config.timeoutMs ?? 30_000;
  }

  /**
   * Health check: GET /health
   */
  async getHealth(): Promise<unknown> {
    return this.request("GET", "/health");
  }

  /**
   * Create a new storage deal: POST /api/deal
   * 具体字段后面我们会根据 vaultx-api 的实现来调整。
   */
  async createDeal(params: CreateDealParams): Promise<{ dealId: string }> {
    const result = await this.request("POST", "/api/deal", params);
    // 简单做一个类型断言，后面可以再根据真实返回结构优化
    return result as { dealId: string };
  }

  /**
   * Get deal status: GET /api/deal/:id
   */
  async getDealStatus(dealId: string): Promise<DealStatus> {
    if (!dealId) {
      throw new Error("VaultXClient.getDealStatus: dealId is required");
    }
    const result = await this.request("GET", `/api/deal/${encodeURIComponent(dealId)}`);
    return result as DealStatus;
  }

  /**
   * Internal helper: perform HTTP requests with fetch.
   */
  private async request(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    body?: unknown
  ): Promise<unknown> {
    const url = `${this.apiBaseUrl}${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.apiKey) {
      // 先用简单的 Bearer 方案，后面如果有专门的签名方式再改
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body != null ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : undefined;

      if (!response.ok) {
        const error: VaultXApiError = {
          status: response.status,
          message: (data as any)?.message || "VaultX API error",
          details: data,
        };
        throw error;
      }

      return data;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        throw {
          status: 0,
          message: "Request timed out",
        } satisfies VaultXApiError;
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  }
}

/**
 * Small helper to create a client, so用户将来可以：
 *
 *   const client = createVaultXClient({ apiBaseUrl: "..." });
 */
export function createVaultXClient(config: VaultXClientConfig): VaultXClient {
  return new VaultXClient(config);
}
