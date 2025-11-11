# x402-X Solana SDK (IPFi)

This repository contains a minimal SDK built for the **IPFi track** of the Camp Network × TechyJaunt $10 000 buildathon.  
The goal of this SDK is to make it easy for African creators to register intellectual property, license their work under various terms and manage royalty flows — all while leveraging the Solana blockchain and Camp’s Origin SDK.  

> **Note:** This SDK is a _prototype_ designed for hackathon use.  
> It demonstrates the core concepts of registering creative works as IP‑NFTs, issuing licences and tracking royalties.  
> It does **not** connect to a live Camp Network endpoint.  

## Features

The SDK currently provides the following high‑level functions:

| Function | Description |
| --- | --- |
| `registerContent(connection, payer, contentUri, metadata)` | Creates a new Solana transaction to register a piece of content.  The `contentUri` should point to the asset (e.g. IPFS or Arweave).  The `metadata` object can include title, description, author and any custom fields. |
| `createLicense(connection, payer, ipnftId, licenseType, price, royaltyPercent)` | Issues a licence for a previously registered IP‑NFT.  The `licenseType` can be `view`, `remix`, `commercial`, etc.  The `price` defines the upfront fee (in lamports) and `royaltyPercent` defines the on‑going royalty split. |
| `transferOwnership(connection, payer, ipnftId, newOwner)` | Transfers the ownership of an IP‑NFT to another wallet address.  Useful for fractional sales or secondary markets. |
| `getIPNftData(connection, ipnftId)` | Fetches and decodes on‑chain metadata for a given IP‑NFT. |

### Directory structure

```
.
├── README.md           – this file
├── package.json        – npm package configuration
└── src
    └── index.js        – the main entry point of the SDK
```

## Installation

Because this is a hackathon project, you can install the dependencies locally and link the package into your application:

```
npm install
npm run build  # optional build step for TypeScript (not used here)
```

You can then import the SDK into your dApp or script:

```js
import { registerContent, createLicense } from 'x402-x-solana-sdk';

// Example usage
const connection = new Connection('https://api.devnet.solana.com');
const payer = Keypair.fromSecretKey(...);

const { ipnftId } = await registerContent(connection, payer, 'ipfs://CID', {
  title: 'My first song',
  description: 'An original song recorded in Lagos',
  author: '0xYourWallet',
});

await createLicense(connection, payer, ipnftId, 'commercial', 1_000_000_000, 10);
```

## Disclaimer

This code is provided for educational purposes and is **not** production‑ready.  
It lacks proper error handling, validation and on‑chain program integration.  
Use at your own risk.
