✅ VaultX SDK (JavaScript / TypeScript)

Official JavaScript/TypeScript SDK for interacting with the VaultX decentralized storage platform, powered by Filecoin, Curio, and MK20.

This SDK provides a simple and strongly-typed client for:

Creating VaultX storage deals

Uploading encrypted files

Checking deal status

Integrating VaultX into web or backend applications

🚀 Installation

Install via npm, yarn, or pnpm:

npm install @vaultx/sdk


or

yarn add @vaultx/sdk


or

pnpm add @vaultx/sdk

📦 Usage Example
Initialize the client
import { VaultXClient } from "@vaultx/sdk";

const client = new VaultXClient({
  apiBaseUrl: "https://api.vaultx.one",
  apiKey: "YOUR_API_KEY" // optional
});

📁 Upload an encrypted file
const file = fs.readFileSync("./example.png");

const dealId = await client.createDeal({
  file,
  filename: "example.png",
});

console.log("Created deal:", dealId);

🔍 Check deal status
const status = await client.getDealStatus("deal-id-123");
console.log("Deal status:", status);

🧱 API
new VaultXClient(config)

Creates a new API client.

Config options
Field	Type	Required	Description
apiBaseUrl	string	Yes	VaultX API base URL
apiKey	string	No	API key (if required)
timeoutMs	number	No	Custom request timeout
client.createDeal(options)

Creates a new storage deal.

Options:
Field	Type	Required	Description
file	Blob/Buffer	Yes	File content
filename	string	Yes	File name
client.getDealStatus(dealId)

Gets the status of a storage deal.

🗂 Project Structure
vaultx-sdk/
├── src/
│   ├── client.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md

🤝 Contributing

Pull Requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

📄 License

MIT License © VaultX
