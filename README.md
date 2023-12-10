# rollupAuth-backend

## Overview
rollupAuth-backend is the backend service for the rollupAuth system, designed to handle authentication and user management functionalities. It provides a robust and secure API for integration with the rollupAuth UI and other front-end applications.

## Features
- User Authentication: Manages user login, registration, and authentication processes.
- Secure API: Provides a secure interface for front-end applications to interact with user data.
- Scalable Architecture: Designed to handle high volumes of requests with optimal performance.
- Database Integration: Efficiently stores and manages user data.

## Deployed Contracts

Below is a table of deployed contract addresses and their corresponding links on various block explorers.

| Network | Contract Address | Block Explorer Link |
|---------|------------------|---------------------|
| Base Goerli | 0x8515239dF7bfBa5fda41905501BF4Aee4e491311 | [Basescan](https://goerli.basescan.org/tx/0x82010023284f4fdcbaa5408e3626bb2bc3e2905640c6ac8625cc5c0015ed63f2) |
| Celo Alfajores | 0x8515239dF7bfBa5fda41905501BF4Aee4e491311 | [CeloExplorer](https://explorer.celo.org/alfajores/tx/0x94eafaa1e2d4e44f1b5190d64f275e4df044873df1369cea0aee4e27350886f2) |
| Stackr Testnet | 0x8515239dF7bfBa5fda41905501BF4Aee4e491311 | [StackrExplorer](http://rpc.stf.xyz:3000/address/0x3f92b3a9c7d32689467CE6790aEb692307C9146E) |



To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
