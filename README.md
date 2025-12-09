# 🔐 VaultX SDK (JavaScript / TypeScript)

Official JavaScript/TypeScript SDK for interacting with the **VaultX decentralized storage network**, powered by **Filecoin**, **Curio**, and **MK20 storage pipelines**.

The SDK provides a strongly-typed, developer-friendly client for:

- Creating VaultX storage deals  
- Uploading encrypted files  
- Querying deal status  
- Integrating VaultX into any frontend or backend app  
- Future support: bundle uploads, resumable uploads, replication strategies

---

## 📦 Installation

Install using npm, yarn, or pnpm:

```bash
npm install @vaultx/sdk
or

bash
复制代码
yarn add @vaultx/sdk
or

bash
复制代码
pnpm add @vaultx/sdk
✨ Quick Start
ts
复制代码
import { VaultXClient } from "@vaultx/sdk";

const client = new VaultXClient({
  apiBaseUrl: "https://api.vaultx.one", 
  timeoutMs: 30000,
});

// Create a storage deal
const deal = await client.createDeal({
  fileName: "demo.txt",
  fileSize: 1024,
});

console.log("Deal created:", deal);
📤 Upload a File
ts
复制代码
const file = new File(["hello vaultx"], "demo.txt");

const result = await client.uploadFile({
  dealId: deal.id,
  file,
});

console.log("Upload result:", result);
🔍 Check Deal Status
ts
复制代码
const status = await client.getDealStatus(deal.id);
console.log("Current status:", status);
🧩 API Reference
new VaultXClient(options)
Creates a new client instance.

Option	Type	Required	Description
apiBaseUrl	string	✔	VaultX API endpoint
apiKey	string	✖	(optional) security token
timeoutMs	number	✖	request timeout

client.createDeal(params)
Creates a new storage deal.

ts
复制代码
await client.createDeal({
  fileName: string,
  fileSize: number,
});
client.uploadFile(params)
Uploads an encrypted file to VaultX.

ts
复制代码
await client.uploadFile({
  dealId: string,
  file: File | Blob | Buffer,
});
client.getDealStatus(dealId)
Returns real-time status of a deal.

🗺 Roadmap
 Multi-chunk resumable uploads

 Client-side encryption helpers

 Browser + Node unified upload engine

 Replication strategy selection

 Deal batching

 SDK auto-retry & offline caching

🧑‍💻 Contributing
Contributions are welcome!
If you want to improve VaultX SDK:

Fork this repo

Create a feature branch

Submit a pull request

We will review and merge quickly.

📄 License
MIT © VaultX Storage

⭐ Support VaultX
If you like this SDK, please star this repo on GitHub — it helps the project grow!

https://github.com/vaultx-storage/vaultx-sdk

yaml
复制代码

---

# 🎉 README 已从“普通项目级”升级为“专业开源产品级”

这份 README：

✔ 极度专业  
✔ 结构清晰  
✔ 适合 npm 发布  
✔ 用于未来融资/展示也够标准  
✔ 支持开发者快速使用  
✔ 支持 VaultX 品牌化长期发展  

---

# 下一步（建议）  
我可以帮你：

### 1️⃣ 自动生成 SDK 版本徽章、npm 下载量徽章  
让 README 更像 ethers.js：



yaml
复制代码

### 2️⃣ 帮你做一个 SDK Logo  
圆角方块 + VaultX 字母设计，提升专业度。

### 3️⃣ 帮你写完整 API 文档（类似 OpenAPI 风格）

---

需要我继续帮你增强 README 嗎？例如：

💎 增加徽章  
🎨 生成 LOGO  
📚 生成 API 文档  
⚙️ 生成 CHANGELOG 模板  

告诉我你想做哪个，我马上帮你继续升级。
