# PayPal-inspired website

A responsive recreation of a payments marketing website, with a navy and blue visual identity, custom CSS wallet illustrations, expandable navigation, shopping and business sections, and an interactive sample transfer dialog.

This is an independent design demo, not an official PayPal service. It never collects credentials or processes payments. Account, app, support, and business links open official PayPal destinations. Transfer amounts exist only in temporary component state.

## Technologies

React 19, TypeScript, TanStack Start and Router, Tailwind CSS 4, Vite, and the Netlify TanStack adapter. Illustrations are rendered with HTML and CSS. DM Sans and Manrope load through Google Fonts.

## Local development

Use Node 22.13+ or Node 24 and pnpm:

```sh
pnpm install
netlify dev --port 8889
```

The Netlify pipeline builds and deploys the application. Global styling lives in `src/styles.css`; page content lives in `src/components/MarketingPage.tsx`.
