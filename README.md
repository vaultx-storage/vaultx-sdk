📚 VaultX SDK (JavaScript / TypeScript)

Official JavaScript/TypeScript SDK for interacting with the VaultX decentralized storage platform, powered by Filecoin & MK20.

This SDK provides a simple and strongly-typed client for:

Creating VaultX storage deals

Uploading encrypted files

Checking deal status

Integrating VaultX into web or backend applications

🚀 Installation

Install via npm, yarn, or pnpm:

npm install @vaultx/sdk
# or
yarn add @vaultx/sdk
# or
pnpm add @vaultx/sdk


(If the SDK is not yet published to npm, use a GitHub URL instead — I can generate that later if you want.)

🧩 Importing the SDK
import { VaultXClient } from "@vaultx/sdk";

🔧 Initializing the Client
const client = new VaultXClient({
  apiBaseUrl: "https://api.vaultx.one",   // VaultX API endpoint
  apiKey: "<your-api-key>",               // optional
  timeoutMs: 30000                        // optional (default: 30s)
});

📤 Upload a File & Create a Storage Deal

Example (browser):

const file = document.querySelector("input[type=file]").files[0];

const result = await client.createDeal({
  file,
  replication: 3,          // future feature
});

console.log(result);


Example result:

{
  "dealId": "bafy…",
  "status": "processing",
  "message": "Deal submitted successfully"
}

📊 Check Deal Status
const status = await client.getDealStatus("bafy123...");
console.log(status);


Example status response:

{
  "dealId": "bafy123…",
  "state": "active",
  "miner": "f01234",
  "size": 8388608,
  "createdAt": "2025-01-15T08:22:11Z"
}

🏗 SDK Structure

The SDK is intentionally minimal and fully typed.

vaultx-sdk/
│
├── src/
│   ├── client.ts      # Core SDK implementation
│   └── index.ts       # Public exports
│
├── package.json
├── tsconfig.json
└── LICENSE

🛠 Development Setup

Install dependencies:

npm install


Build the SDK:

npm run build


Compiled output appears in:

dist/

📦 Publishing the SDK (optional)

If the SDK is ready to be published to npm:

npm login
npm publish --access public


(I can guide you step-by-step when you're ready.)

❓ Troubleshooting
TypeError: VaultXClient is not a constructor

Likely caused by incorrect import — use:

import { VaultXClient } from "@vaultx/sdk";

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

📄 License

MIT © VaultX Team
