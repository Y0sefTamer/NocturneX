# 🌑 NocturneX | Institutional-Grade OTC Dark Pool

🏆 **2nd Place Winner - Avalanche Track @ Aleph Hackathon (DoraHacks)** 🏆

**Bridging the gap between immense TradFi liquidity and Web3 execution.**

![NocturneX Banner](https://placehold.co/1000x300/111827/E84142.png?text=NocturneX+|+Institutional+OTC)

**NocturneX** is a secure, intent-based Over-The-Counter (OTC) Dark Pool built on **Avalanche**. It is designed specifically for TradFi institutions and large merchants (e.g., Fiserv/Clover) to execute large-volume token swaps with **zero slippage, absolute privacy, and complete MEV protection.**

---

## 🎯 The Problem We Solve
When large institutions or retail aggregators attempt to liquidate or swap massive amounts of tokens on public AMMs, they face two massive hurdles:
1. **Price Slippage:** Large orders crash the pool price.
2. **MEV Attacks:** Front-running bots extract value from public mempool transactions.
3. **Compliance:** DeFi lacks the KYC/AML gates required by enterprise treasuries.

## 💡 The NocturneX Solution
We introduce an **Intent-Based Escrow Smart Contract** with a built-in Whitelist. 
- **Zero Slippage:** Swaps are executed exactly as requested (1:1 fixed rates).
- **KYC Compliance:** Only explicitly verified wallet addresses (institutions) can interact with the contract.
- **Atomic Settlement:** If the conditions aren't met, the transaction reverts. Funds are never stuck.

---

## 🏆 Hackathon Tracks Fit

### 🔺 Avalanche Track
Deployed on the **Avalanche Fuji C-Chain**, NocturneX leverages Avalanche's fast finality and low fees. Our smart-contract-level KYC infrastructure lays the groundwork for institutional subnets and enterprise DeFi adoption.
- **Contract Address (Fuji):** `0xfa3fdEFEdA463369AAc356E0Cae78aD0169f4118`
- **Explorer:** [View on Snowtrace](https://testnet.snowtrace.io/address/0xfa3fdEFEdA463369AAc356E0Cae78aD0169f4118)

### 💳 Fiserv / Clover Track
Large merchants using Clover POS systems to accept crypto payments need a secure backend to liquidate these assets to stablecoins without market exposure. NocturneX acts as the ultimate Web3 Treasury Management tool for Fiserv clients, allowing bulk, private, and exact-value settlement.

---

## ⚙️ Tech Stack
- **Smart Contracts:** Solidity, Foundry, OpenZeppelin (SafeERC20, ReentrancyGuard)
- **Frontend:** React, Vite, Tailwind CSS (Institutional Dark Mode UI)
- **Web3 Integration:** Ethers.js v6
- **Deployment:** Vercel (Frontend), Avalanche Fuji (Blockchain)

---

### 💡 Technical Challenges Solved
- **ABI Mapping & State Sync:** Overcame complex frontend synchronization issues to ensure the order book accurately reflects the live smart contract state in real-time.
- **Atomic Settlement:** Designed a robust escrow mechanism on Avalanche Fuji to guarantee that funds strictly revert if exact swap conditions (0% slippage) are not met.

---

## 🚀 Live Demo & Links
- **Live Platform:** [https://nocturne-x.vercel.app/](https://nocturne-x.vercel.app/)
- **Demo Video:** [https://youtu.be/EXcyD2JKNKI](https://youtu.be/EXcyD2JKNKI)
- **Hackathon Submission:** [[DoraHacks BUIDL Link]](https://dorahacks.io/buidl/41363/)

---

## 💻 Local Installation
```bash
# Clone the repository
git clone [https://github.com/yourusername/NocturneX.git](https://github.com/yourusername/NocturneX.git)

# Install dependencies
npm install

# Run the local server
npm run dev
```

### 👨‍💻 About the Developer
Built entirely by Yosef Tamer, a Computer Science student at Benha University and a passionate Full-Stack Web3 Developer. 

As a solo founder for this hackathon, Yosef architected the intent-based smart contracts, implemented the strict on-chain KYC logic, and built the fully responsive frontend. Backed by certifications in Foundry and Solidity fundamentals, and active involvement in the dev3pack DeFi bootcamp, this project showcases a deep commitment to building secure, scalable, and institutional-grade DeFi infrastructure.
