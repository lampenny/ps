import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import Dashboard from '../app/components/Dashboard'
import { fetchUserAchievements } from '../app/services/achievementService'
import { act } from 'react'

jest.mock('axios')
jest.mock('../app/services/achievementService')

describe('Dashboard', () => {
  const mockUsers = [
    { id: 1, name: 'Maggie' },
    { id: 2, name: 'Bart' },
  ]

  const mockAchievementData = {
    user: { id: 1, name: 'Maggie' },
    games: [
      {
        id: 1,
        title: 'Game 1',
        completedAchievements: 5,
        totalAvailableAchievements: 10,
      },
    ],
    level: 'Gold',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    const mockedAxiosGet = axios.get as jest.Mock
    const mockedFetchUserAchievements = fetchUserAchievements as jest.Mock

    mockedAxiosGet.mockResolvedValue({ data: mockUsers })
    mockedFetchUserAchievements.mockResolvedValue(mockAchievementData)
  })

  test('clicking on a user name fetches and displays their achievements', async () => {
    await act(async () => {
      render(<Dashboard />)
    })

    await waitFor(() => {
      expect(screen.getByText('Maggie')).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Maggie'))
    })

    expect(fetchUserAchievements).toHaveBeenCalledWith(mockUsers[0])

    await waitFor(() => {
      expect(screen.getByText('Gold')).toBeInTheDocument()
      expect(screen.getByText('Game 1')).toBeInTheDocument()
      expect(screen.getByText('5/10')).toBeInTheDocument()
    })
  })

  test('displays loading state while fetching users', async () => {
    let resolvePromise: (value: { data: any[] }) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })

    const mockedAxiosGet = axios.get as jest.Mock
    mockedAxiosGet.mockImplementation(() => promise)

    render(<Dashboard />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await act(async () => {
      resolvePromise({ data: mockUsers })
    })

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
  })

  test('displays error message when user fetch fails', async () => {
    const mockedAxiosGet = axios.get as jest.Mock
    mockedAxiosGet.mockRejectedValue(new Error('Failed to fetch'))

    await act(async () => {
      render(<Dashboard />)
    })

    await waitFor(() => {
      expect(
        screen.getByText('Something went wrong with getting the players 🧐')
      ).toBeInTheDocument()
    })
  })
})
