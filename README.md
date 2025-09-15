# KANBI: From Chaotic Notes to Effortless Action 🚀

[![Made by Muhammad Tanveer Abbas](https://img.shields.io/badge/made%20by-Muhammad%20Tanveer%20Abbas-blue.svg?style=for-the-badge)](https://github.com/Muhammadtanveerabbas)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-green.svg?style=for-the-badge)](https://github.com/MuhammadTanveerAbbas/KANBI.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

KANBI is a powerful, offline first, AI driven task management tool designed to bridge the gap between ideation and execution. It transforms your unstructured notes, meeting minutes, or brainstorms into a clear, actionable Kanban board, helping you and your team stay organized and productive.

---

## 🤯 The Problem

We all capture brilliant ideas in notes, docs, and meetings, but too often, they remain static. Teams lose momentum because knowledge doesn’t easily translate into action. The manual overhead of creating, assigning, and tracking tasks is a significant drain on productivity and creativity. Your best ideas get trapped.

## ✨ The Solution

KANBI is the bridge from insight to impact. It provides a seamless, AI-powered workflow that closes the loop between thinking and doing:

- **✍️ Input Any Text:** Simply paste your unstructured notes.
- **🤖 AI-Powered Parsing:** Our smart AI instantly detects tasks, owners, and deadlines.
- **📋 Instant Action Board:** Your tasks appear on a clean, drag-and-drop Kanban board.
- **📈 Track Your Progress:** Monitor your entire workflow with a clear progress tracker.
- **💡 Get Smart Insights:** Receive AI-driven feedback to optimize your process and work smarter.

---

## 🌟 Key Features

- **🤖 AI Task Extraction:** Our intelligent system identifies tasks, owners, and deadlines from any block of text.
- **🚫 No Login Required:** Jump right into planning without the friction of creating an account.
- **🌐 Works Offline:** Your data is stored securely in your browser, so you can work anywhere, anytime.
- **🌐 Drag and Drop Kanban Board:** Intuitively manage tasks across "To Do," "In Progress," and "Done" columns.
- **💡 Smart Insights:** Go beyond tracking with AI-driven suggestions to optimize your workflow.
- **🔒 Privacy-Focused:** All processing happens in your browser. Your data is never sent to a server.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/)
- **AI:** [Google's Gemini Model](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **State Management:** React Hooks & `localStorage` for persistence
- **Fonts:** [Google Fonts](https://fonts.google.com/) (Rubik Glitch & Space Grotesk)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

---

## 🚀 Getting Started

To get this project running on your local machine, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository:
    ```sh
    git clonehttps://github.com/MuhammadTanveerAbbas/KANBI.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd kanbi-action-board
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Development Server

To run the app in development mode, execute the following command:

```sh
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

---

## 📂 File Structure

Here's a high-level overview of the project structure:

```
/
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   │   ├── (pages)/        # Page routes (e.g., board)
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Landing page
│   │   └── globals.css     # Global styles and theme variables
│   │
│   ├── components/         # Reusable React components
│   │   ├── ai/             # AI-related components (Task Generator, Insights Panel)
│   │   ├── board/          # Kanban board components (Column, Card)
│   │   ├── landing/        # Sections for the landing page
│   │   ├── layout/         # Header and Footer
│   │   └── ui/             # ShadCN UI components
│   │
│   ├── ai/                 # Genkit AI flows and configuration
│   │   ├── flows/          # Genkit flow definitions
│   │   └── genkit.ts       # Genkit initialization
│   │
│   ├── hooks/              # Custom React hooks (e.g., useTasksStore)
│   │
│   └── lib/                # Utilities, types, and constants
│
├── public/                 # Static assets
└── package.json            # Project dependencies and scripts
```

---

## 👨‍💻 Made By

This project was brought to life by **Muhammad Tanveer Abbas**.

- **GitHub:** [@Muhammadtanveerabbas](https://github.com/Muhammadtanveerabbas)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/licenses/MIT) file for details.
