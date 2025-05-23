'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import { User, TransformedUser } from './types'
import { fetchUserAchievements } from '../services/achievementService'

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<TransformedUser | undefined>(
    undefined
  )

  useEffect(() => {
    axios
      .get<User[]>(`/users`)
      .then(({ data }) => {
        setUsers(data)
        setIsLoadingUsers(false)
      })
      .catch(() => {
        setError('Something went wrong with getting the players 🧐')
        setIsLoadingUsers(false)
      })
  }, [error])

  const handleHeaderClick = () => {
    setSelectedUser(undefined)
    setError(null)
  }

  const handleFetchAchievements = async (user: User) => {
    setError(null)
    const achievementData = await fetchUserAchievements(user)

    if (achievementData) {
      setSelectedUser({
        ...achievementData.user,
        games: achievementData.games,
        level: achievementData.level,
      })
    }
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col m-10">
        <header className="mb-10">
          <h1
            className="text-3xl font-bold cursor-pointer hover:text-transparent hover:bg-gradient-to-r from-teal-300 via-purple-400 to-pink-300 bg-clip-text"
            onClick={handleHeaderClick}
          >
            Player Achievement Levels
          </h1>
        </header>

        {isLoadingUsers ? (
          <div className="w-full content-center text-center animate-pulse bg-transparent text-4xl text-gray-400">
            Loading...
          </div>
        ) : error ? (
          <div className="w-full content-center text-center bg-transparent text-4xl text-red-400">
            <div>{error}</div>
          </div>
        ) : (
          <div className="flex flex-row w-full">
            <div className="flex flex-col px-10">
              <h3 className="font-bold ">All players</h3>
              {users.map((user) => (
                <div key={user.id}>
                  <div className="p-3">
                    <button
                      onClick={() => {
                        handleFetchAchievements(user)
                      }}
                    >
                      <p className="cursor-pointer text-3xl hover:text-transparent hover:bg-gradient-to-r from-teal-300 via-purple-400 to-pink-300 bg-clip-text">
                        {user.name}
                      </p>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedUser ? (
              <UserCard user={selectedUser} />
            ) : (
              <div className="w-full content-center text-center animate-pulse bg-transparent text-4xl text-gray-400">
                Select a player to see their level
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
