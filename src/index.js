/**
 * x402-X Solana SDK (IPFi prototype)
 *
 * This module exposes a few high level functions to manage IP‑NFTs on
 * the Solana blockchain.  The implementation below is intentionally
 * lightweight and does not interact with a real on‑chain program.  It
 * is meant to illustrate the flow for registering content, creating
 * licences and transferring ownership of intellectual property assets.
 */

import { Keypair, PublicKey } from '@solana/web3.js';

// In‑memory registry to simulate on‑chain state.  In a real
// application this would be replaced by calls to the Camp Origin SDK
// and custom Solana programs.
const _ipRegistry = new Map();
const _licenceRegistry = new Map();

/**
 * Generates a simple identifier for licences.  Uses a random
 * 8‑byte hex string to avoid collisions.
 *
 * @returns {string}
 */
function _generateLicenceId() {
  return [...crypto.getRandomValues(new Uint8Array(8))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Register a piece of content as an IP‑NFT.  This function creates a
 * new `Keypair` to represent the asset and stores the provided
 * metadata in an in‑memory map.  In a real implementation you would
 * upload the asset to IPFS/Arweave, then call into a Solana program
 * (via the Origin SDK) to mint an IP‑NFT.
 *
 * @param {Connection} connection - A Solana connection.  Unused in this stub.
 * @param {Keypair} payer - The wallet paying for the transaction.  Unused here.
 * @param {string} contentUri - A URI pointing to the actual content (e.g. ipfs://CID).
 * @param {object} metadata - Additional metadata such as title, description and author.
 * @returns {Promise<{ipnftId: string, metadata: object}>}
 */
export async function registerContent(connection, payer, contentUri, metadata = {}) {
  const ipnftKeypair = Keypair.generate();
  const ipnftId = ipnftKeypair.publicKey.toBase58();
  const meta = {
    contentUri,
    ...metadata,
    createdAt: new Date().toISOString(),
  };
  _ipRegistry.set(ipnftId, meta);
  return { ipnftId, metadata: meta };
}

/**
 * Create a licence for a registered IP‑NFT.  Stores licence data in an
 * in‑memory registry.  A real implementation would generate a token
 * representing the licence and assign it to the buyer.
 *
 * @param {Connection} connection - A Solana connection (unused in stub).
 * @param {Keypair} payer - The wallet paying for the transaction (unused).
 * @param {string} ipnftId - The identifier of the IP‑NFT being licensed.
 * @param {string} licenceType - Type of licence (view, remix, commercial, etc.).
 * @param {number} price - One‑time licence fee in lamports.
 * @param {number} royaltyPercent - Percentage of future royalties owed to IP owner.
 * @returns {Promise<{licenceId: string, ipnftId: string, licenceType: string, price: number, royaltyPercent: number}>}
 */
export async function createLicense(connection, payer, ipnftId, licenceType, price, royaltyPercent) {
  if (!_ipRegistry.has(ipnftId)) {
    throw new Error(`IP‑NFT ${ipnftId} not registered`);
  }
  const licenceId = _generateLicenceId();
  const licence = {
    licenceId,
    ipnftId,
    licenceType,
    price,
    royaltyPercent,
    issuedAt: new Date().toISOString(),
  };
  _licenceRegistry.set(licenceId, licence);
  return licence;
}

/**
 * Transfer ownership of an IP‑NFT to a new owner.  Updates the
 * metadata record to reflect the new author/owner.  In a real
 * implementation this would call into a Solana program and possibly
 * transfer an SPL token representing the asset.
 *
 * @param {Connection} connection - Solana connection (unused).
 * @param {Keypair} payer - The current owner paying transaction fees.
 * @param {string} ipnftId - The ID of the IP‑NFT to transfer.
 * @param {string} newOwner - The base58 address of the new owner.
 * @returns {Promise<{ipnftId: string, newOwner: string}>}
 */
/**
 * x402-X Solana SDK (IPFi prototype)
 *
 * This module exposes a few high level functions to manage IP‑NFTs on
 * the Solana blockchain.  The implementation below is intentionally
 * lightweight and does not interact with a real on‑chain program.  It
 * is meant to illustrate the flow for registering content, creating
 * licences and transferring ownership of intellectual property assets.
 */

import { Keypair, PublicKey } from '@solana/web3.js';

// In‑memory registry to simulate on‑chain state.  In a real
// application this would be replaced by calls to the Camp Origin SDK
// and custom Solana programs.
const _ipRegistry = new Map();
const _licenceRegistry = new Map();

/**
 * Generates a simple identifier for licences.  Uses a random
 * 8‑byte hex string to avoid collisions.
 *
 * @returns {string}
 */
function _generateLicenceId() {
  return [...crypto.getRandomValues(new Uint8Array(8))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Register a piece of content as an IP‑NFT.  This function creates a
 * new `Keypair` to represent the asset and stores the provided
 * metadata in an in‑memory map.  In a real implementation you would
 * upload the asset to IPFS/Arweave, then call into a Solana program
 * (via the Origin SDK) to mint an IP‑NFT.
 *
 * @param {Connection} connection - A Solana connection.  Unused in this stub.
 * @param {Keypair} payer - The wallet paying for the transaction.  Unused here.
 * @param {string} contentUri - A URI pointing to the actual content (e.g. ipfs://CID).
 * @param {object} metadata - Additional metadata such as title, description and author.
 * @returns {Promise<{ipnftId: string, metadata: object}>}
 */
export async function registerContent(connection, payer, contentUri, metadata = {}) {
  const ipnftKeypair = Keypair.generate();
  const ipnftId = ipnftKeypair.publicKey.toBase58();
  const meta = {
    contentUri,
    ...metadata,
    createdAt: new Date().toISOString(),
  };
  _ipRegistry.set(ipnftId, meta);
  return { ipnftId, metadata: meta };
}

/**
 * Create a licence for a registered IP‑NFT.  Stores licence data in an
 * in‑memory registry.  A real implementation would generate a token
 * representing the licence and assign it to the buyer.
 *
 * @param {Connection} connection - A Solana connection (unused in stub).
 * @param {Keypair} payer - The wallet paying for the transaction (unused).
 * @param {string} ipnftId - The identifier of the IP‑NFT being licensed.
 * @param {string} licenceType - Type of licence (view, remix, commercial, etc.).
 * @param {number} price - One‑time licence fee in lamports.
 * @param {number} royaltyPercent - Percentage of future royalties owed to IP owner.
 * @returns {Promise<{licenceId: string, ipnftId: string, licenceType: string, price: number, royaltyPercent: number}>}
 */
export async function createLicense(connection, payer, ipnftId, licenceType, price, royaltyPercent) {
  if (!_ipRegistry.has(ipnftId)) {
    throw new Error(`IP‑NFT ${ipnftId} not registered`);
  }
  const licenceId = _generateLicenceId();
  const licence = {
    licenceId,
    ipnftId,
    licenceType,
    price,
    royaltyPercent,
    issuedAt: new Date().toISOString(),
  };
  _licenceRegistry.set(licenceId, licence);
  return licence;
}

/**
 * Transfer ownership of an IP‑NFT to a new owner.  Updates the
 * metadata record to reflect the new author/owner.  In a real
 * implementation this would call into a Solana program and possibly
 * transfer an SPL token representing the asset.
 *
 * @param {Connection} connection - Solana connection (unused).
 * @param {Keypair} payer - The current owner paying transaction fees.
 * @param {string} ipnftId - The ID of the IP‑NFT to transfer.
 * @param {string} newOwner - The base58 address of the new owner.
 * @returns {Promise<{ipnftId: string, newOwner: string}>}
 */
export async function transferOwnership(connection, payer, ipnftId, newOwner) {
  const record = _ipRegistry.get(ipnftId);
  if (!record) {
    throw new Error(`IP‑NFT ${ipnftId} not registered`);
  }
  record.owner = newOwner;
  record.updatedAt = new Date().toISOString();
  _ipRegistry.set(ipnftId, record);
  return { ipnftId, newOwner };
}

/**
 * Retrieve metadata for a registered IP‑NFT.
 *
 * @param {Connection} connection - Solana connection (unused).
 * @param {string} ipnftId - The ID of the IP‑NFT.
 * @returns {Promise<object|null>} - Returns stored metadata or null if not found.
 */
export async function getIPNftData(connection, ipnftId) {
  return _ipRegistry.get(ipnftId) || null;
}

// Default export for convenience; consumers can also import named functions.
export default {
  registerContent,
  createLicense,
  transferOwnership,
  getIPNftData,
};
export async function transferOwnership(connection, payer, ipnftId, newOwner) {
  const record = _ipRegistry.get(ipnftId);
  if (!record) {
    throw new Error(`IP‑NFT ${ipnftId} not registered`);
  }
  record.owner = newOwner;
  record.updatedAt = new Date().toISOString();
  _ipRegistry.set(ipnftId, record);
  return { ipnftId, newOwner };
}

/**
 * Retrieve metadata for a registered IP‑NFT.
 *
 * @param {Connection} connection - Solana connection (unused).
 * @param {string} ipnftId - The ID of the IP‑NFT.
 * @returns {Promise<object|null>} - Returns stored metadata or null if not found.
 */
export async function getIPNftData(connection, ipnftId) {
  return _ipRegistry.get(ipnftId) || null;
}

// Default export for convenience; consumers can also import named functions.
export default {
  registerContent,
  createLicense,
  transferOwnership,
  getIPNftData,
};
