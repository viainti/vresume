# VIAINTI RESUME

A powerful, modern, and intuitive online resume editor designed to help professionals create stunning resumes with ease. Built with cutting-edge web technologies, VIAINTI RESUME offers real-time preview, custom themes, AI-assisted writing, and seamless export capabilities.

## About

VIAINTI RESUME is an open-source resume builder that puts control in your hands. Unlike other resume builders, your data stays private - all resumes are stored locally in your browser. The application features a beautiful, responsive interface with smooth animations, making the resume creation process enjoyable rather than tedious.

## Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Real-time Preview** | See changes instantly as you type - no need to switch between edit and preview modes |
| **Multiple Templates** | Choose from 6 professionally designed templates |
| **Custom Themes** | Customize colors, fonts, and spacing to match your personal brand |
| **Dark Mode** | Switch between light and dark themes for comfortable editing |
| **PDF Export** | Export your resume as a high-quality PDF with one click |
| **Auto-save** | Your work is automatically saved to local storage |
| **Responsive Design** | Works seamlessly on desktop, tablet, and mobile devices |
| **Multi-language** | Available in English and Spanish |

### AI-Assisted Writing

- **Grammar Check**: AI-powered grammar and spelling suggestions
- **Content Polishing**: Improve the wording and impact of your resume sections
- **Multiple Providers**: Support for OpenRouter, OpenAI, Gemini, DeepSeek, and Doubao
- **Production Mode**: In production deployments, AI settings are configured via environment variables

## Tech Stack

### Frontend

- **TanStack Start**: A full-stack React framework for building modern web applications
- **TypeScript**: Type-safe JavaScript for better developer experience and fewer bugs
- **React 18**: The latest React with concurrent features
- **Framer Motion**: Beautiful, smooth animations and transitions
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Shadcn/ui**: High-quality, accessible UI components built with Radix UI

### State & Data

- **Zustand**: A small, fast, and scalable state management solution
- **Local Storage**: All data stored locally in the browser - your privacy matters

### Rich Text & Editing

- **Tiptap**: Aheadless, extensible rich text editor built for React

### Icons & Graphics

- **Lucide React**: Beautiful open-source icon library

## Project Structure

```
vresume/
├── public/                     # Static assets
│   ├── logo.svg               # Application logo
│   └── template-snapshots/    # Pre-rendered template images
│
├── src/
│   ├── app/                   # Main application
│   │   ├── (public)/          # Public pages (landing page)
│   │   │   └── [locale]/      # Localized routes (en/es)
│   │   │       ├── layout.tsx # Public layout with providers
│   │   │       └── page.tsx   # Landing page component
│   │   ├── app/               # Dashboard application
│   │   │   ├── dashboard/     # Dashboard pages
│   │   │   │   ├── resumes/    # Resume list and management
│   │   │   │   ├── templates/  # Template gallery
│   │   │   │   ├── ai/         # AI settings page
│   │   │   │   └── settings/   # Application settings
│   │   │   ├── workbench/     # Resume editor workbench
│   │   │   ├── layout.tsx     # Dashboard layout
│   │   │   └── page.tsx       # Dashboard home
│   │   └── api/               # API routes (serverless functions)
│   │       ├── test/           # AI connection test endpoint
│   │       ├── polish/         # AI content polishing
│   │       └── proxy/         # Image proxy for external resources
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components (Button, Input, Dialog, etc.)
│   │   ├── shared/            # Shared components across the app
│   │   │   ├── ai/            # AI-related dialogs and components
│   │   │   ├── ThemeToggle/   # Dark/light mode toggle
│   │   │   ├── TemplateSheet/ # Template selection sheet
│   │   │   └── Logo/          # Application logo
│   │   ├── editor/            # Resume editor components
│   │   │   ├── basic/         # Basic info editor (name, email, etc.)
│   │   │   ├── experience/    # Work experience editor
│   │   │   ├── education/     # Education history editor
│   │   │   ├── project/       # Projects section editor
│   │   │   ├── skills/        # Skills section editor
│   │   │   ├── custom/        # Custom sections editor
│   │   │   ├── EditorHeader/  # Top bar of the editor
│   │   │   ├── Field/         # Reusable form field component
│   │   │   └── grammar/       # Grammar check UI
│   │   ├── preview/           # Resume preview components
│   │   │   ├── PreviewDock/   # Bottom dock in preview mode
│   │   │   └── PdfExport/     # PDF export functionality
│   │   ├── templates/         # Resume template components
│   │   │   ├── registry.ts    # Template registry
│   │   │   └── Left.tsx, Right.tsx, etc. # Individual templates
│   │   └── home/             # Landing page components
│   │       ├── HeroSection/   # Hero section
│   │       ├── FeaturesSection/ # Features showcase
│   │       ├── CTASection/    # Call to action
│   │       └── FAQSection/    # Frequently asked questions
│   │
│   ├── config/                # Configuration files
│   │   ├── ai.ts             # AI model configurations
│   │   ├── initialResumeData.ts # Default resume data for each language
│   │   └── index.ts          # Main config exports
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAIConfiguration.ts # AI config hook
│   │   ├── useGrammarCheck.ts # Grammar checking hook
│   │   └── useTemplateSnapshots.ts # Template preview images hook
│   │
│   ├── i18n/                  # Internationalization
│   │   ├── config.ts          # i18n configuration
│   │   ├── locales/           # Translation files
│   │   │   ├── en.json        # English translations
│   │   │   └── es.json        # Spanish translations
│   │   └── compat/            # Compatibility layer
│   │       ├── client.tsx     # Client-side i18n provider
│   │       ├── server.ts      # Server-side i18n functions
│   │       └── utils.ts      # i18n utility functions
│   │
│   ├── lib/                   # Utility functions
│   │   ├── utils.ts           # Common utilities (cn, formatDate, etc.)
│   │   ├── navigation.ts      # Navigation/routing utilities
│   │   ├── fonts.ts          # Font configuration
│   │   └── templatePreview.ts # Template preview utilities
│   │
│   ├── routes/                # TanStack Router configuration
│   │   ├── __root.tsx        # Root route component
│   │   ├── $locale.tsx       # Locale routing
│   │   ├── app/              # App routes
│   │   │   └── dashboard/    # Dashboard routes
│   │   │       ├── ai.tsx    # AI settings route
│   │   │       └── ...
│   │   └── api/              # API routes
│   │       ├── test.ts       # AI test endpoint
│   │       ├── polish.ts     # Polish endpoint
│   │       └── resume-import.ts # Resume import from AI
│   │
│   ├── store/                # Zustand state stores
│   │   ├── useResumeStore.ts # Resume data management
│   │   └── useAIConfigStore.ts # AI configuration store
│   │
│   ├── types/                # TypeScript type definitions
│   │   ├── resume.ts         # Resume data types
│   │   └── template.ts       # Template types
│   │
│   ├── generated/             # Auto-generated files
│   │   └── templateSnapshotManifest.ts # Template snapshot manifest
│   │
│   └── theme/                # Theme configuration
│       └── themeConfig.ts    # Theme settings for light/dark modes
│
├── .env                       # Environment variables (local)
├── .env.example               # Example environment variables
├── docker-compose.yml         # Docker Compose configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── vite.config.ts             # Vite build configuration
```

## Component Overview

### Dashboard Components

| Component | Description |
|-----------|-------------|
| `DashboardLayout` | Main dashboard layout with sidebar navigation |
| `ResumeWorkbench` | Main workspace for editing resumes |
| `CreateResumeModal` | Modal for creating new resumes from templates |
| `ResumeCardItem` | Individual resume card in the list |

### Editor Components

| Component | Description |
|-----------|-------------|
| `EditorHeader` | Top bar with resume title, export, and actions |
| `SidePanel` | Left panel with section navigation |
| `BasicInfoEditor` | Edit name, title, contact info |
| `ExperienceEditor` | Add/edit work experience entries |
| `EducationEditor` | Add/edit education history |
| `ProjectEditor` | Add/edit project entries |
| `SkillsEditor` | Edit skills section with categories |
| `CustomSectionEditor` | Create custom resume sections |
| `GrammarCheckDrawer` | Grammar checking panel |

### Preview Components

| Component | Description |
|-----------|-------------|
| `PreviewDock` | Bottom dock with zoom, template switch, export |
| `PdfExport` | PDF generation and download |
| `TemplateSwitcher` | Switch templates in preview mode |

### Shared Components

| Component | Description |
|-----------|-------------|
| `ThemeToggle` | Light/dark/system mode switcher |
| `AIPolishDialog` | AI content polishing interface |
| `TemplateSheet` | Template selection sheet |
| `Logo` | Application logo component |
| `GithubContribution` | GitHub contributions widget |

## Installation

### Prerequisites

- **Node.js** 18 or higher
- **pnpm** (recommended) or npm

### Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/viainti/vresume.git
cd vresume
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

Create a `.env` file in the project root:

```bash
# Application settings
FONTCONFIG_PATH=/var/task/fonts

# Production mode - set to true for production deployment
# When true, AI menu is hidden and settings are read from env vars
NEXT_PUBLIC_PRODUCTION_MODE=false

# AI Provider API Keys (configure for production)
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL_ID=anthropic/claude-3.5-sonnet

OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL_ID=gpt-4o
OPENAI_API_ENDPOINT=https://api.openai.com/v1

GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL_ID=gemini-2.0-flash

DEEPSEEK_API_KEY=your-deepseek-api-key
DOUBAO_API_KEY=your-doubao-api-key
DOUBAO_MODEL_ID=your-doubao-model-id
```

4. **Start development server**

```bash
pnpm dev
```

5. **Open your browser**

Navigate to `http://localhost:3000`

## Building for Production

### Build the application

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

The application will be available at `http://localhost:3000`

## Docker Deployment

### Using Docker Compose

1. **Install Docker and Docker Compose**

Make sure you have Docker Engine and Docker Compose installed on your system.

2. **Configure environment variables**

Create a `.env` file with your production settings:

```bash
NEXT_PUBLIC_PRODUCTION_MODE=true
OPENROUTER_API_KEY=your-production-api-key
OPENROUTER_MODEL_ID=anthropic/claude-3.5-sonnet
```

3. **Build and start the container**

```bash
docker compose up -d
```

4. **Access the application**

The application will be available at `http://localhost:3000`

### Docker Configuration

The `docker-compose.yml` includes:
- Node.js 20 Alpine base image
- Automatic dependency installation
- Production build
- Health check configuration
- Port 3000 exposure

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FONTCONFIG_PATH` | Font configuration path | `/var/task/fonts` |
| `NEXT_PUBLIC_PRODUCTION_MODE` | Enable production mode | `false` |
| `OPENROUTER_API_KEY` | OpenRouter API key | - |
| `OPENROUTER_MODEL_ID` | OpenRouter model ID | `anthropic/claude-3.5-sonnet` |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `OPENAI_MODEL_ID` | OpenAI model ID | `gpt-4o` |
| `OPENAI_API_ENDPOINT` | OpenAI API endpoint | `https://api.openai.com/v1` |
| `GEMINI_API_KEY` | Google Gemini API key | - |
| `GEMINI_MODEL_ID` | Gemini model ID | `gemini-2.0-flash` |

### Production Mode

When `NEXT_PUBLIC_PRODUCTION_MODE=true`:
- AI configuration page is hidden from the dashboard menu
- AI settings are read exclusively from environment variables
- Only OpenRouter provider is available
- This is recommended for production deployments

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/test` | POST | Test AI provider connection |
| `/api/polish` | POST | Polish resume content with AI |
| `/api/resume-import` | POST | Import resume from text/images using AI |
| `/api/proxy/image` | GET | Proxy for external images |

## Templates

VIAINTI RESUME includes 6 professionally designed templates:

1. **Left Layout** - Classic left sidebar with clean typography
2. **Right Layout** - Right sidebar variant
3. **Modern** - Contemporary design with accent colors
4. **Minimal** - Clean, minimalist design
5. **Classic** - Traditional resume format
6. **Creative** - Bold, creative layout

Each template supports:
- Custom primary color
- Adjustable section spacing
- Font family selection
- Left/right layout toggle

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is licensed under the Apache 2.0 License.

## Contact

- **Company**: viainti
- **Website**: https://viainti.com
- **GitHub**: https://github.com/viainti/vresume

## Acknowledgments

Built with the following amazing open-source projects:

- [TanStack](https://tanstack.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tiptap](https://tiptap.dev/)
