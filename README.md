
# Dev-Blog

A modern blog platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**. The visual design and user experience are inspired by the [SandAndStonesEngineMicroservices](https://github.com/sandandstonesdev/SandAndStonesEngineMicroservices) project, aiming to match its UI/UX as closely as possible.

## Design Goals

This project targets the following visual and structural characteristics drawn from the SandAndStonesEngineMicroservices reference screens:

- **Persistent dark navbar and footer** — consistent across all pages.
- **Blue main background** — providing a cohesive, branded look.
- **White content cards** — clean, readable cards for posts and page content.
- **Privacy / cookie-policy controls** — consent banner and a dedicated Privacy Policy page.
- **Responsive layout** — works on mobile, tablet, and desktop.
- **Accessibility** — semantic HTML and keyboard-navigable components.

## Pages

| Route | Description |
|---|---|
| `/` | Home — featured content and blog introduction |
| `/posts` | Posts — list of all blog articles |
| `/about` | About — author/project information |
| `/privacy` | Privacy Policy — cookie consent and data-handling details |

## Tech Stack

| Technology | Role |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [MDX](https://mdxjs.com/) | Markdown + JSX for blog posts |
| [react-cookie-consent](https://github.com/Mastermindzh/react-cookie-consent) | Cookie-consent banner |
| [Biome](https://biomejs.dev/) | Linting and formatting |
| [Playwright](https://playwright.dev/) | End-to-end testing |

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## Other Commands

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Lint with Biome
npx playwright test   # Run end-to-end tests
```

## Editing Content

- Add or edit blog posts in `src/content/posts/` using MDX.
- Update navigation links in `src/config/navLinks.tsx`.
- Global layout (navbar, footer) lives in `src/components/layout/`.

## Deployment

Deploy on [Vercel](https://vercel.com/) (recommended) or any platform that supports Node.js:

```bash
npm run build
npm run start
```

## Design Acknowledgements

The visual design of this project is based on reference screenshots from the [SandAndStonesEngineMicroservices](https://github.com/sandandstonesdev/SandAndStonesEngineMicroservices) project. All UI/UX decisions — colour palette, typography, component layout, and overall structure — are intentionally matched to those reference screens to provide a unified experience across both projects.

## Contributing

Contributions to the design or theming are welcome! To propose a change:

1. Fork the repository and create a branch: `git checkout -b theme/your-improvement`.
2. Make your styling changes in `src/styles/` or the relevant Tailwind classes.
3. Verify the change against the reference screens (see Design Acknowledgements above) to ensure consistency.
4. Open a Pull Request describing what was changed and why it improves the match to the reference UI.
