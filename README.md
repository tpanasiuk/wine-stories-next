# 🍷 Wine Stories

**Wine Stories** is a modern, responsive, and animated website designed to showcase fine wines, upcoming events, and immersive experiences around Italian winemaking culture. Built with **Next.js 15**, **Tailwind CSS**, and **React 19**, it delivers smooth performance and a rich visual experience across devices.

---

## ✨ Features

- 🖼️ Image showcase section with scroll-based animations
- 📱 Fully responsive design (mobile-first)
- 🔍 Wine catalogue with search, sort, and pagination
- 🧾 Wine tasting registration form with MongoDB storage
- 🎨 Styled using Tailwind CSS with custom animations and transitions
- 🔥 Toast notifications via `react-hot-toast`
- ⚙️ Developer-ready with Prettier formatting and ESLint
- ⚡ Built with Turbopack for fast local development
- 🧼 Clean, minimal layout with font icons via Font Awesome

---

## 🛠️ Tech Stack

| Tool                                           | Description                                   |
| ---------------------------------------------- | --------------------------------------------- |
| [Next.js 15](https://nextjs.org)               | React framework with App Router and Turbopack |
| [React 19](https://react.dev)                  | UI library for interactive components         |
| [Tailwind CSS](https://tailwindcss.com)        | Utility-first CSS framework                   |
| [TypeScript](https://www.typescriptlang.org)   | Typed JavaScript                              |
| [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | Cloud database for storing form submissions |
| [ESLint](https://eslint.org)                   | Linting and code quality                      |
| [Prettier](https://prettier.io)                | Code formatting                               |
| [Font Awesome](https://fontawesome.com)        | Icon library                                  |
| [React Hot Toast](https://react-hot-toast.com) | Lightweight toast notifications               |

---

## 🌐 API & MongoDB Integration

The project includes a custom API route (`/api/register`) that handles wine tasting form submissions. Upon submission, the data is securely stored in a **MongoDB Atlas** collection using the official MongoDB Node.js driver.

- 📦 MongoDB connection handled via a shared utility (`lib/mongodb.ts`)
- 🧩 Environment variables (`.env.local`) required for MongoDB URI
- 🔐 Data is validated and handled securely on the server side

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wine-stories.git
cd wine-stories
