# Quadratic Funding DAO — Frontend

Quickly run locally:

1. Open a terminal in `frontend/`.
2. Install dependencies:

```powershell
npm install
```

3. Run dev server:

```powershell
npm run dev
```

Notes:
- The app uses `ethers` and expects a wallet (MetaMask) available in the browser.
- Contract ABIs and addresses are placeholders — put your ABIs in `src/contracts/abis.ts` and addresses in `.env` (see `.env.example`).

Wiring contracts
- Copy `.env.example` to `.env` and update each `VITE_..._ADDRESS` value with the deployed address for your environment.
- Replace the placeholder arrays in `src/contracts/abis.ts` with the real ABIs from your Solidity build (JSON artifacts).
- Use the hook `getContract(address, abi)` from `useEthers` to get a contract instance with signer for writes, e.g.:

```ts
const { getContract } = useEthers()
const grantRegistry = getContract(CONTRACTS.GrantRegistry, GrantRegistryABI)
await grantRegistry.createGrant(title, description)
```

Design for SDF1 (UML & ERD student projects)
- This frontend includes a dedicated **Dashboard** and **Diagram Editor** (embedded diagrams.net) to support the SDF1 assignment workflow.
- Features added for SDF1:
	- `Dashboard` page with quick start and recent projects.
	- `Project Editor` which embeds `diagrams.net` (draw.io) via iframe for creating Use Case, Class, Sequence, Activity diagrams and ERDs.
	- Skeleton loading states and Lottie animation spots for polished UX.
	- 3D animated background for a modern, professional look.

SSR / Rendering notes
- This app is client-rendered (Vite + React). For Server-Side Rendering (SSR) you can migrate to Next.js or Vite SSR; the code is componentized so moving to SSR requires:
	- Converting data-loading to use server APIs or getServerSideProps (Next.js).
	- Replacing browser-only APIs (window, localStorage, iframe interactions) with guarded checks.

Lighthouse & Performance
- Lazy-load heavy components (diagrams iframe, editor) — already implemented via React.lazy + Suspense.
- Use `npm run build` + `npx http-server dist` to run a production build and run Lighthouse in Chrome DevTools.

Lottie and animations
- Lottie integrated as optional: install `lottie-react` or it will fall back gracefully.

Exporting diagrams
- The iframe loads `https://app.diagrams.net/?embed=1&ui=min` which provides export options inside the editor (File → Export). For programmatic export, see diagrams.net embed API docs.

