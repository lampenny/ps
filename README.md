# Player Achievement Levels App

## Tech Stack

- **Frontend Framework**: React with Next.js
- **Styling**: Tailwind CSS
- **HTTP Requests**: Axios
- **Testing**: Jest and React Testing Library
- **Icons**: react-icons library

## Overview

The app tracks player achievement levels across multiple games where players are assigned achievement levels; Bronze, Silver, Gold and Platinum based on their game library size and completion rates.

### Architecture

#### Component Structure

- **Dashboard**: Main container component managing state and user selection
- **UserCard**: Presentation component for displaying user achievements and level
- **achievementService**: Service layer handling data fetching and level calculation logic

#### Data Flow

1. Dashboard fetches users on initial load
2. When a user is selected, the fetchUserAchievements service is called
3. Service aggregates data from the two endpoints: `/users/:userId/library` and `users/:userId/achievements/:gameId`
4. Data is transformed into a consistent structure for display which includes the achievement level
5. Calculated level and other fun stats are displayed via the UserCard component

The fetchUserAchievements service returns a transformed data structure:

```
{
  id: number
  name: string
  email: string
  games: {
    id: number
    title: string
    totalAvailableAchievements: number
    completedAchievements: number
  }[]
  level: Levels
}
```

## Testing

The application is tested using Jest and React Testing Library to ensure reliability and catch regressions. Tests cover two main components:

### UserCard Component Tests

- Proper rendering of user information including game counts and achievements
- Error handling when user data is missing
- Edge cases such as users with empty game libraries

### Dashboard Component Tests

- User interaction testing for the player selection functionality
- Verification of loading states during data fetching
- Error handling for failed API requests

To run the tests:

```bash
yarn test
```

## Ideas for future enhancement

- Sorting functionality for the player list so you can sort players by level or games completed etc.
- Search capability for finding specific users

## Getting Started

First, run `yarn install` then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
