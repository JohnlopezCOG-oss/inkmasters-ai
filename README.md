# Ink Masters DTF — AI Sales & Support Assistant

A web-based AI assistant that helps DTF transfer customers choose gang sheet sizes, answers common questions, and guides them toward placing an order.

## Tech Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **OpenAI API** (GPT-4o-mini by default)

## Getting Started

### 1. Install dependencies

```bash
cd ink-masters-ai
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-key-here
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── layout.tsx        # Root layout (nav, fonts, global styles)
│   ├── page.tsx          # Main chat page
│   ├── globals.css       # Tailwind imports & custom styles
│   ├── admin/page.tsx    # Placeholder admin dashboard
│   └── api/chat/route.ts # POST endpoint for AI chat
├── components/           # Reusable UI components
│   ├── Navbar.tsx        # Top navigation bar
│   ├── ChatWindow.tsx    # Main chat controller (state, API calls)
│   ├── ChatInput.tsx     # Message input + send button
│   ├── MessageBubble.tsx # Individual message display
│   └── TypingIndicator.tsx # Animated loading dots
├── lib/                  # Server-side utilities
│   ├── openai.ts         # OpenAI client singleton
│   └── systemPrompt.ts   # AI personality & product knowledge
└── types/                # Shared TypeScript interfaces
    └── chat.ts           # Message & API types
```

## Customization

- **AI Behavior**: Edit `src/lib/systemPrompt.ts` to change the assistant's personality, product knowledge, or escalation rules.
- **Model**: Set `OPENAI_MODEL` in `.env.local` (defaults to `gpt-4o-mini`).
- **Branding**: Update colors in component classes (currently uses orange as the accent color).

## Roadmap

- [ ] Admin dashboard with knowledge base management
- [ ] Conversation logging & analytics
- [ ] Promotion management
- [ ] Streaming responses
- [ ] Authentication for admin section
