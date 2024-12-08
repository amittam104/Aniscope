
# Project UI Structure for Anime Explorer

## Key Screens and Features

1. **Landing Page**
   - Clear, engaging introduction to the app’s purpose.
   - Call-to-action buttons for login/signup.
   - Highlights of app features like discovering anime and bookmarking.

2. **User Authentication Screens**
   - **Login Screen**: Form for email/password login.
   - **Signup Screen**: Form for account creation with email/password.
   - **Password Recovery Screen**: Option to reset password.

3. **Top Anime List Screen**
   - Display curated list of top anime with title, cover image, rating, and episode count.
   - Loading state for data fetching.
   - Option to view details for individual anime.

4. **Anime Detail View Screen**
   - Detailed information about the anime (synopsis, genres, release year, average ratings).
   - A button to generate related anime recommendations.
   - Option to bookmark/unbookmark anime.

5. **Bookmark System**
   - Allow users to bookmark and unbookmark anime.
   - Visual feedback (e.g., “Bookmarked!” toast or icon animation).
   - Ensure persistence of bookmarks across devices.

6. **Bookmark View Screen**
   - List all bookmarked anime, sorted by date.
   - Option to remove bookmarks.

7. **Search Functionality**
   - A search bar to find anime in real-time using the Jikan API.
   - Filtering options (by genre, rating, or release year).
   - Debounced search input for improved performance.

8. **About Page**
   - Description of the app’s purpose.
   - Credits and acknowledgments for the Jikan API.

9. **Optional Features**
   - **Dark Mode**: Option to toggle between light and dark themes.
   - **Social Sharing**: Buttons to share anime on platforms like Twitter or X.

## Detailed Descriptions of the UI Screens

### 1. Landing Page
- **Header**: Large, bold header introducing the app with text like “Discover Your Next Favorite Anime.”
- **Call-to-Action Buttons**: Prominently displayed “Login” and “Sign Up” buttons.
- **Feature Highlights**: Short section below the header explaining the main features—such as “Bookmark your favorite anime” and “Get personalized recommendations”—with attractive icons or images.
- **Footer**: Footer with links to About, Privacy Policy, and social media handles.

### 2. User Authentication Screens
#### Login Screen
- **Email Input**: Field for entering email address.
- **Password Input**: Field for password.
- **Login Button**: Button to submit login details.
- **Sign-Up Link**: A link to redirect to the signup page.
- **Forgot Password Link**: A link to the password recovery screen.

#### Signup Screen
- **Email Input**: Field for the email address.
- **Password Input**: Field for password (with requirements such as minimum length, special characters).
- **Confirm Password Input**: Field to confirm the password.
- **Signup Button**: A button to submit the signup form.
- **Login Link**: A link to redirect to the login page.

#### Password Recovery Screen
- **Email Input**: Field for entering the email to receive a password reset link.
- **Submit Button**: Button to send the reset link.
- **Back to Login Link**: A link to go back to the login page.

### 3. Top Anime List Screen
- **Anime Grid/List**: Display anime cards with essential details: title, cover image, rating, and episode count. Each anime card will be clickable to view more details.
- **Loading State**: A spinner or progress bar to indicate data fetching from the Jikan API.
- **Search Bar**: Sticky search bar at the top to allow searching/filtering of anime as users scroll through the list.
- **Responsive Layout**: The list will adjust to different screen sizes, showing more or fewer cards depending on the screen width.

### 4. Anime Detail View Screen
- **Anime Header**: Title, cover image, and rating prominently displayed at the top.
- **Details Section**:
  - **Synopsis**: Short description of the anime.
  - **Genres**: List of genres the anime belongs to.
  - **Release Year**: The year the anime was released.
  - **Average Rating**: Display the average rating pulled from Jikan.
- **Recommendations Button**: Fetch and display related anime recommendations.
- **Bookmark Button**: Bookmark or unbookmark the anime, providing visual feedback like an animation or “Bookmarked!” toast.

### 5. Bookmark System
- **Bookmark Action**: Users can click the bookmark button on any anime (either in the Top Anime List or the Anime Detail View).
- **Visual Feedback**: After clicking the bookmark button, the UI will show feedback—either a brief animation or a text notification like “Bookmarked!”
- **Persisting Data**: The bookmark will be saved in the Appwrite database and will persist across sessions.

### 6. Bookmark View Screen
- **Bookmark List**: List view displaying all the anime a user has bookmarked, ordered by the date they were added.
- **Remove Button**: Option (e.g., trash can icon) next to each bookmarked anime to remove it from the list.
- **Empty State**: If no anime are bookmarked, a message like “No bookmarks yet” will be displayed.

### 7. Search Functionality
- **Search Bar**: Search bar at the top of the page with real-time suggestions that are debounced to avoid excessive API calls.
- **Filter Options**: Dropdowns or checkboxes for filtering search results by genre, rating, or release year.
- **Search Results**: Display search results dynamically below the search bar, showing anime titles and relevant details.

### 8. About Page
- **Mission Statement**: Short paragraph describing the app’s purpose, goals, and benefits to users.
- **Credits Section**: Acknowledgment for the Jikan API, as well as any other libraries or tools used.
- **Links**: Optional links to your social media, GitHub repo, or other related projects.

### 9. Optional Features
- **Dark Mode Toggle**: A button in the top header or settings menu that toggles between light and dark themes for a better user experience in various lighting conditions.
- **Social Sharing**: Share buttons displayed in the Anime Detail View and Bookmark View, enabling users to share anime on Twitter or X. The share button will generate a preformatted tweet or message, e.g., “Check out this anime I found on Anime Explorer!”
