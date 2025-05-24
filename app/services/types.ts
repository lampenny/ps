export type Levels = 'Platinum' | 'Gold' | 'Silver' | 'Bronze'

export interface User {
  id: number
  name: string
  email: string
}

export interface TransformedUser extends User {
  games: {
    id: number
    title: string
    totalAvailableAchievements: number
    completedAchievements: number
  }[]
  level: Levels
}

export interface UserLibrary {
  user: {
    id: number
    name: string
    email: string
  }
  ownedGames: [
    {
      id: number
      title: string
      totalAvailableAchievements: number
    }
  ]
}

export interface UserAchievements {
  user: {
    id: number
    name: string
    email: string
  }
  game: {
    id: number
    title: string
    totalAvailableAchievements: number
  }
  totalCompletedAchievements: number
}
