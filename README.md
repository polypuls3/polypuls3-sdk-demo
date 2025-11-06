# Polypuls3 SDK Demo

This is a demo Next.js application showcasing the [@polypuls3/sdk](https://www.npmjs.com/package/@polypuls3/sdk) package.

## Getting Started

### Prerequisites

- Node.js 18+
- A WalletConnect Project ID (get one at https://cloud.walletconnect.com/)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your WalletConnect Project ID.

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

This demo includes three main pages:

### Home Page (/)
- Demonstrates the `PollWidget` component
- Shows poll details and allows voting
- Uses the `usePoll` and `useVote` hooks

### Create Page (/create)
- Demonstrates the `CreatePollForm` component
- Allows creating new polls on Polygon Amoy testnet
- Uses the `useCreatePoll` hook

### List Page (/list)
- Demonstrates the `useSubgraphPolls` hook
- Shows all polls from The Graph subgraph
- Uses the `PollCard` component for displaying poll previews

## SDK Components Used

- `PollWidget` - Full-featured poll display and voting component
- `CreatePollForm` - Form for creating new polls
- `PollCard` - Compact poll card for listings
- `ConnectButton` - Custom wallet connection button (using wagmi hooks)

## SDK Hooks Used

- `usePoll` - Fetch poll data from contract
- `useVote` - Submit votes to polls
- `useCreatePoll` - Create new polls
- `useSubgraphPolls` - Query polls from The Graph
- `useAccount`, `useConnect`, `useDisconnect` - Wagmi wallet hooks

## Networks

The demo is configured to work with:
- Polygon Amoy Testnet (Chain ID: 80002)
- Polygon PoS Mainnet (Chain ID: 137)

Contract address on Amoy: `0x23044915b2922847950737c8dF5fCCaebCFe6ECe`

## Learn More

- [Polypuls3 SDK Documentation](https://github.com/your-org/polypuls3-sdk)
- [Next.js Documentation](https://nextjs.org/docs)
- [wagmi Documentation](https://wagmi.sh)
- [Polygon Documentation](https://docs.polygon.technology/)
