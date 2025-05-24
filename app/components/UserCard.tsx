import { GrTrophy } from 'react-icons/gr'
import { TransformedUser } from '../services/types'

const levelColours = {
  Platinum: 'bg-blue-100 text-sky-900',
  Gold: 'bg-yellow-100 text-yellow-400',
  Silver: 'bg-gray-100 text-gray-500',
  Bronze: 'bg-orange-100 text-yellow-700',
}

export default function UserCard({ user }: { user: TransformedUser }) {
  return (
    <div className="bg-white w-full mx-20 text-black shadow-lg rounded-lg p-6 items-center justify-center place-content-center">
      <div className="flex flex-row">
        <div className="flex flex-col items-center content-center justify-center px-5 relative">
          <div
            className={`w-fit border-2 rounded-full p-10 relative ${
              levelColours[user.level]
            } before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent before:bg-gradient-to-r before:from-teal-300 before:via-purple-400 before:to-pink-300 before:opacity-30 before:-m-0.5`}
          >
            <GrTrophy className={`text-9xl ${levelColours[user.level]}`} />
          </div>

          <p
            className={`w-fit my-5 px-6 py-2 rounded-full text-xl font-medium ${
              levelColours[user.level]
            } shadow-sm`}
          >
            {user.level}
          </p>
          <div className="flex flex-col items-center space-y-2">
            <div className="mt-2 grid grid-cols-2 gap-4 text-center">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 shadow-sm">
                <p className="text-purple-600 text-2xl font-bold">
                  {user.games.length}
                </p>
                <p className="text-gray-600 text-sm">games owned</p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-3 shadow-sm">
                <p className="text-teal-600 text-2xl font-bold">
                  {
                    user.games.filter(
                      (game) =>
                        game.completedAchievements ===
                        game.totalAvailableAchievements
                    ).length
                  }
                </p>
                <p className="text-gray-600 text-sm">games completed</p>
              </div>
              <div className="col-span-2 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3 shadow-sm">
                <p className="text-pink-600 text-lg font-bold">
                  {user.games.length === 0
                    ? 0
                    : Math.round(
                        (user.games.filter(
                          (game) =>
                            game.completedAchievements ===
                            game.totalAvailableAchievements
                        ).length /
                          user.games.length) *
                          100
                      )}
                  %
                </p>
                <p className="text-gray-600 text-sm">Completion Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-col mb-3 border-b">
            <p className="text-4xl font-extrabold">{user.name}</p>
            <span className="text-gray-500 font-medium">
              Player ID: #{user.id}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-600">
            Games & Achievements
          </h3>

          <div className="space-y-2 max-h-100 overflow-y-auto p-2">
            {user.games.map((game) => (
              <div key={game.id} className="text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">
                    {game.title}
                  </span>
                  <span className="text-xs text-gray-700">
                    {game.completedAchievements}/
                    {game.totalAvailableAchievements}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-lime-500 h-2 rounded-full"
                    style={{
                      width: `${
                        (game.completedAchievements /
                          game.totalAvailableAchievements) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
