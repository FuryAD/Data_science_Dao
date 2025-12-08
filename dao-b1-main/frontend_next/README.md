Quadratic Funding DAO — Next.js App Router (UI prototype)

Quick start (developer):

1. Create a project and install dependencies:

```bash
# from inside frontend_next
npm install next react react-dom tailwindcss postcss autoprefixer @react-three/fiber three @react-three/drei
npx tailwindcss init -p
```

2. Add the `tailwind.config.ts` and `styles/globals.css` files included here.

3. Start dev server:

```bash
npm run dev
```

Notes:
- This UI uses `react-three-fiber` for the hero orb. Replace the dummy `WalletConnect` with `wagmi`+`viem` for production wallet integration.
