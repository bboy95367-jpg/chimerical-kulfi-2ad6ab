# Project guide

This project is a PayPal-inspired marketing interface built with React 19, TypeScript, and TanStack Start. It is an independent visual demo, with no payment processing, account collection, or persistence.

## Architecture

- `src/routes/index.tsx` renders `MarketingPage`.
- `src/components/MarketingPage.tsx` contains the brand mark, responsive navigation, CSS illustration markup, marketing sections, and sample transfer dialog.
- `src/styles.css` defines the complete responsive visual design and reduced-motion behavior.
- `src/data/site.ts` contains finished page and social metadata used by the root route.
- `src/routes/__root.tsx` provides the document shell and metadata.
- `src/components/NotFoundPage.tsx` provides the fallback route.
- `netlify.toml` and `vite.config.ts` configure TanStack Start deployment on Netlify.

## Conventions and decisions

Use typed React components and keep browser-only dialog APIs inside effects and event handlers. The native dialog supplies modal focus management; Escape dismisses it. Form validation is native HTML validation. The transfer preview uses sample recipient details and local React state only. Never imply that a preview moves money. Login and signup go to official PayPal pages rather than collecting credentials. Keep the independent-demo disclosure visible in the footer.

Artwork uses HTML and CSS rather than external image assets. Global colors use navy, blue, and light cool neutrals. Preserve responsive layouts, visible focus indicators, and reduced-motion preferences. No backend services are needed for the current scope.

Use pnpm for dependency management. Start local Netlify emulation with `netlify dev --port 8889`. Do not manually edit generated route trees. The platform handles build validation.
