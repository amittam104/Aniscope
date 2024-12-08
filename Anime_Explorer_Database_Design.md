# Database Design for Anime Explorer

## 1. Users Collection (Optional, if storing additional profile information)

- **user_id** (string): Unique identifier from Appwrite Auth (user’s UID).
- **username** (string, optional): Custom user-defined name (if users can set this).
- **theme_preference** (string, optional): User’s theme preference (light or dark mode).
- **created_at** (timestamp): Date the user account was created.
- **anime_id** (array of strings): Array of The IDs of the anime being bookmarked (from the Jikan API).
