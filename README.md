# Anime Explorer

A modern web application that empowers anime enthusiasts to explore, search, and bookmark their favorite anime while receiving personalized recommendations. Built with Next.js, Tailwind CSS, and powered by Appwrite and Jikan API.

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Features

### Core Features
- **User Authentication**
  - Secure signup/login via email and password using Appwrite Auth
  - Password recovery functionality
  - Session persistence across devices

- **Anime Discovery**
  - Curated list of top anime with essential details
  - Detailed information pages including synopsis, genres, and ratings
  - Real-time search with advanced filtering options
  - Personalized anime recommendations

- **Bookmarking System**
  - Save favorite anime for quick access
  - Organize and manage bookmarks
  - Cross-device bookmark synchronization

- **User Interface**
  - Intuitive and responsive design
  - Light/dark mode toggle
  - Social sharing capabilities
  - Loading states for better UX

## Tech Stack

**Frontend:**
- Next.js
- Tailwind CSS
- ShadCN UI Components

**Backend & Services:**
- Appwrite (Authentication & Database)
- Jikan API (Anime Data)

## Run Locally

Clone the project

```bash
git clone https://github.com/yourusername/anime-explorer.git
```

Go to the project directory

```bash
cd anime-explorer
```

Install dependencies

```bash
npm install
```

Set up environment variables in `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
```

Start the development server

```bash
npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

- `NEXT_PUBLIC_APPWRITE_ENDPOINT`
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
- `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
- `NEXT_PUBLIC_APPWRITE_COLLECTION_ID`

## Performance and Scalability

- Fast load times (< 2 seconds average)
- Support for up to 5,000 concurrent users
- Optimized API calls with debouncing
- WCAG 2.1 AA compliant for accessibility

## Project Timeline

**Day 1:**
- Core technology setup
- Landing page and authentication implementation
- Top anime list integration

**Day 2:**
- Anime detail view and recommendations
- Bookmarking and search functionality
- UI polish and final testing

## Acknowledgements

- [Jikan API](https://jikan.moe/) for providing comprehensive anime data
- [Appwrite](https://appwrite.io/) for backend services
- [ShadCN](https://ui.shadcn.com/) for UI components
