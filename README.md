## PizzaHub

PizzaHub is a frontend-only Pizza marketplace UI built with Next.js App Router,
TypeScript, Tailwind CSS, ShadCN-style components, Motion, and Lucide icons.

### Challenge Implementation

- **Advanced search and sorting:** the Browse Menu supports text search, category
  and location filters, plus ascending and descending price sorting. Filters are
  applied with URL-independent client state and can later map directly to API
  query parameters such as `search`, `category`, `location`, `sort=priceAsc`,
  and `sort=priceDesc`.
- **JWT/API middleware:** the frontend defines role-oriented route layouts for
  customer, vendor, and admin dashboards. For the full implementation, Express
  middleware will verify the Bearer JWT signature and expiration, extract the
  user role, reject missing/invalid tokens with `401`, reject wrong-role access
  with `403`, and verify resource ownership before menu, order, or profile
  mutations.
- **Backend and authentication:** Better Auth, MongoDB, Stripe webhooks, JWT
  verification, and ImgBB uploads are intentionally not implemented in this
  frontend-only assignment version.

### Optional Features

- Dark/light mode toggle
- Customer order status timeline

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
