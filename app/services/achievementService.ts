import axios from 'axios'
import { User, UserAchievements, UserLibrary } from './types'
import { Levels } from './types'

const ACHIEVEMENT_REQUIREMENTS = {
  PLATINUM: {
    MIN_GAMES: 50,
    SCORE: 1.0,
  },
  GOLD: {
    MIN_GAMES: 25,
    SCORE: 0.8,
  },
  SILVER: {
    MIN_GAMES: 10,
    SCORE: 0.75,
  },
} as const

const calculateOverallLevel = (
  gamesCount: number,
  scores: number[]
): Levels => {
  if (
    gamesCount > ACHIEVEMENT_REQUIREMENTS.PLATINUM.MIN_GAMES &&
    scores.every((score) => score === ACHIEVEMENT_REQUIREMENTS.PLATINUM.SCORE)
  ) {
    return 'Platinum'
  }

  if (
    gamesCount > ACHIEVEMENT_REQUIREMENTS.GOLD.MIN_GAMES &&
    scores.every((score) => score >= ACHIEVEMENT_REQUIREMENTS.GOLD.SCORE)
  ) {
    return 'Gold'
  }

  if (
    gamesCount > ACHIEVEMENT_REQUIREMENTS.SILVER.MIN_GAMES &&
    scores.every((score) => score >= ACHIEVEMENT_REQUIREMENTS.SILVER.SCORE)
  ) {
    return 'Silver'
  }

  return 'Bronze'
}

export const fetchUserAchievements = async (user: User): Promise<any> => {
  try {
    const { data: userLibrary } = await axios.get<UserLibrary>(
      `/users/${user.id}/library`
    )

    const ownedGames = userLibrary?.ownedGames || []
    const gameIds = userLibrary.ownedGames?.map((game) => game.id) || []

    if (gameIds.length === 0) {
      const level = calculateOverallLevel(0, [])
      return {
        user,
        games: [],
        level,
      }
    }

    const achievementPromises = gameIds.map((gameId) =>
      axios
        .get<UserAchievements>(`/users/${user.id}/achievements/${gameId}`)
        .then(({ data }) => data.totalCompletedAchievements)
        .catch((e) => {
          console.error('Error fetching game', e)
        })
    )

    const allAchievements = await Promise.all(achievementPromises)

    const games = ownedGames.map((game, index) => ({
      ...game,
      completedAchievements: allAchievements[index] || 0,
    }))

    const scores = games.map(
      (game) => game.completedAchievements / game.totalAvailableAchievements
    )

    const level = calculateOverallLevel(games.length, scores)

    return {
      user,
      games,
      level: level,
    }
  } catch (e) {
    console.error('Error fetching user achievements', e)
  }
}
