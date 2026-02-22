🚀 MIDL VibeHack Store - Bitcoin L2 DApp
https://img.shields.io/badge/MIDL-VibeHack-orange
https://img.shields.io/badge/Bitcoin-L2-yellow
https://img.shields.io/badge/Solidity-%5E0.8.0-blue
https://img.shields.io/badge/License-MIT-green

📋 Overview
A decentralized store application built on Bitcoin L2 using MIDL infrastructure. This dApp allows users to purchase products using Bitcoin Runes through Solidity smart contracts deployed on Bitcoin.

Built for MIDL VibeHack 2026 - A 14-day sprint to build Bitcoin-native dApps

🎯 Live Demo
Store Contract: 0x848982C7AdF433C2D0407cCe64B1C76bb4e8493e

Network: MIDL Regtest

Wallet: Xverse (Bitcoin Wallet)

✨ Features
✅ Wallet Integration - Connect with Xverse Bitcoin wallet
✅ Smart Contract - Solidity store contract on Bitcoin L2
✅ Buy Products - Purchase items using Bitcoin
✅ Transaction Tracking - Real-time transaction status
✅ Block Explorer - View transactions on Blockscout
✅ Bitcoin Explorer - Verify on Mempool

🛠️ Tech Stack
Technology	Purpose
Next.js 16	Frontend Framework
MIDL SDK	Bitcoin L2 Infrastructure
Xverse	Bitcoin Wallet
Solidity	Smart Contracts
Wagmi	Ethereum Hooks
Viem	TypeScript Interface
Tailwind CSS	Styling
shadcn/ui	UI Components
📁 Project Structure
text
midl-vibehack-store/
├── apps/
│   └── dapp/                    # Main Next.js application
│       ├── src/
│       │   ├── app/              # Next.js app router
│       │   ├── components/        # Reusable UI components
│       │   ├── features/          # Feature-based modules
│       │   │   └── store/
│       │   │       └── useBuy.ts  # Buy transaction logic
│       │   ├── lib/               # Utilities
│       │   └── shared/            # Shared contracts & types
│       ├── public/                # Static assets
│       └── package.json
├── packages/
│   └── contracts/                 # Solidity smart contracts
│       ├── contracts/
│       │   └── Store.sol          # Store contract
│       └── deployments/            # Contract addresses
└── README.md
🔥 Key Implementation - MIDL Executor Flow
The core of this dApp is the complete MIDL intention layer flow:

typescript
// Complete 6-step transaction flow
1. 📦 Encode function data
2. 📝 Create transaction intention
3. 💰 Finalize BTC transaction
4. ✍️ Sign intention
5. 📡 Broadcast to network
6. ⏳ Wait for confirmation
View complete implementation →

💻 Getting Started
Prerequisites
Node.js 20+

pnpm 8+

Xverse Wallet (for testing)

Installation
bash
# Clone the repository
git clone https://github.com/Outlier1217/midl-vibehack-store.git
cd midl-vibehack-store

# Install dependencies
pnpm install

# Start development server
cd apps/dapp
pnpm dev
Visit http://localhost:3000 to see the app.

🔗 Deployed Contracts & Addresses
Store Contract
text
📜 Address: 0x848982C7AdF433C2D0407cCe64B1C76bb4e8493e
🔍 Blockscout: https://blockscout.staging.midl.xyz/address/0x848982C7AdF433C2D0407cCe64B1C76bb4e8493e
Deployer Account (EVM)
text
👤 Address: 0x279f8c348e8030e18DB2bAFec661Dc92cc7c3f70
🔗 Derived from mnemonic using path: m/84'/1'/0'/0/0 (Xverse default)
Associated Bitcoin Address
text
₿ Address: bcrt1qyk7vhwv2qfy2v8xu2vz75te7xfshc3v75rz2pl
🔍 Mempool: https://mempool.staging.midl.xyz/address/bcrt1qyk7vhwv2qfy2v8xu2vz75te7xfshc3v75rz2pl
✅ Transaction Proof
Sample Successful Transactions
Network	Transaction Hash	Explorer Link
EVM	0x99b0774d5147ef3a06c4479168a399278b25ec3f9198704be545eac849ffa404	View on Blockscout
Bitcoin	b47a838727a276de643d5bb3336eb19511df6fae65711eab0913b46cdcad909c	View on Mempool
These transactions show:
✅ Contract interaction (buy function call)
✅ Successful execution on Bitcoin L2
✅ Confirmed on both explorers

🎥 Demo Video
https://youtu.be/VBh0Qp2Ryjk

🧠 What I Learned
This hackathon was incredibly challenging but rewarding:

🔹 Bitcoin L2 Architecture - Understanding how Bitcoin L2 differs from traditional EVM chains
🔹 MIDL Intention Layer - Why every transaction must go through the 4-step executor flow
🔹 Deep Debugging - Fixing "unknown account" errors by understanding signer authorization
🔹 Xverse Integration - Connecting Bitcoin wallets to dApps
🔹 Transaction Lifecycle - From intention creation to on-chain confirmation

"The 'unknown account' error taught me more about Bitcoin L2 signers than any tutorial could."

🙏 Acknowledgments
MIDL Team - For building innovative Bitcoin L2 infrastructure

Xverse - For the excellent Bitcoin wallet

VibeHack Community - For support and debugging help

Built With
MIDL SDK - Bitcoin L2 Infrastructure

Xverse - Bitcoin Wallet

Next.js - React Framework

shadcn/ui - UI Components

📄 License
This project is MIT licensed.

📬 Contact
GitHub: @Outlier1217

Twitter: @yourhandle

Project Link: https://github.com/Outlier1217/midl-vibehack-store

⚡ Quick Links
Resource	Link
Live App	http://localhost:3000 (local)
Store Contract	Blockscout
Sample Tx (EVM)	View
Sample Tx (BTC)	View
MIDL Docs	https://docs.midl.xyz
<div align="center">
⭐ Star this repo if you found it helpful!
Built with 💪 during MIDL VibeHack 2026

</div>
📝 Note
This project was built by cloning the MIDL dapp-demo repository and extending it with custom store functionality, transaction tracking, and the complete MIDL executor flow implementation. The frontend and smart contract structure are based on the original demo, with significant modifications to implement the buy feature and transaction verification system.

