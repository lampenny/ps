import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserCard from '../app/components/UserCard'
import { TransformedUser } from '../app/services/types'

describe('UserCard', () => {
  const mockUser: TransformedUser = {
    id: 123,
    name: 'Penny',
    email: 'penny@example.com',
    level: 'Gold',
    games: [
      {
        id: 1,
        title: 'Game 1',
        completedAchievements: 5,
        totalAvailableAchievements: 10,
      },
      {
        id: 2,
        title: 'Game 2',
        completedAchievements: 10,
        totalAvailableAchievements: 10,
      },
    ],
  }

  test('renders UserCard with correct user information', () => {
    render(<UserCard user={mockUser} />)

    expect(screen.getByText('Penny')).toBeInTheDocument()
    expect(screen.getByText('Player ID: #123')).toBeInTheDocument()
    expect(screen.getByText('Gold')).toBeInTheDocument()

    expect(screen.getByText('Game 1')).toBeInTheDocument()
    expect(screen.getByText('Game 2')).toBeInTheDocument()

    const achievementTexts = screen.getAllByText(/\d+\/\d+/, { exact: false })
    expect(achievementTexts[0].textContent).toMatch('5/10')
    expect(achievementTexts[1].textContent).toMatch('10/10')

    const gamesOwnedSection = screen.getByText('games owned').parentElement
    const gamesCompletedSection =
      screen.getByText('games completed').parentElement
    const completionRateSection =
      screen.getByText('Completion Rate').parentElement

    expect(gamesOwnedSection?.querySelector('.text-2xl')?.textContent).toBe('2')
    expect(gamesCompletedSection?.querySelector('.text-2xl')?.textContent).toBe(
      '1'
    )
    expect(completionRateSection?.querySelector('.text-lg')?.textContent).toBe(
      '50%'
    )
  })

  test('handles error when no user data is provided', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() => render(<UserCard user={undefined as any} />)).toThrow()

    consoleErrorSpy.mockRestore()
  })

  test('handles empty games array', () => {
    const userWithNoGames: TransformedUser = {
      ...mockUser,
      games: [],
    }

    render(<UserCard user={userWithNoGames} />)

    expect(screen.getByText('Penny')).toBeInTheDocument()

    const gamesOwnedSection = screen.getByText('games owned').parentElement
    const gamesCompletedSection =
      screen.getByText('games completed').parentElement
    const completionRateSection =
      screen.getByText('Completion Rate').parentElement

    expect(gamesOwnedSection?.querySelector('.text-2xl')?.textContent).toBe('0')
    expect(gamesCompletedSection?.querySelector('.text-2xl')?.textContent).toBe(
      '0'
    )
    expect(completionRateSection?.querySelector('.text-lg')?.textContent).toBe(
      '0%'
    )
  })
})
