import { GrTrophy } from 'react-icons/gr'
import { TransformedUser } from './types'

const levelColours = {
  Platinum: 'bg-blue-100 text-sky-900',
  Gold: 'bg-yellow-100 text-yellow-400',
  Silver: 'bg-gray-100 text-gray-500',
  Bronze: 'bg-orange-100 text-yellow-700',
}

export default function UserCard({ user }: { user: TransformedUser }) {
  return (
    <div className="bg-white w-full m-20 text-black shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex flex-row">
        <div className="flex flex-col items-center content-center justify-center p-10">
          <div
            className={`w-fit border-2 rounded-full p-10  ${
              levelColours[user.level]
            }`}
          >
            <GrTrophy className={`text-9xl ${levelColours[user.level]}`} />
          </div>

          <p
            className={`w-fit my-5 px-3 py-1 rounded-full text-xl font-medium ${
              levelColours[user.level]
            }`}
          >
            {user.level}
          </p>
          <div className="flex flex-col items-center border-t pt-4">
            <p className="text-4xl font-extrabold">{user.name}</p>
            <p className="text-gray-500">Player ID: #{user.id}</p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="py-10 pr-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Games & Achievements
            </h3>

            <div className="space-y-2 max-h-92 overflow-y-auto p-2">
              {user.games.map((game) => (
                <div key={game.id} className="text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {game.title}
                    </span>
                    <span className="text-xs text-gray-700">
                      {game.completedAchievements}/
                      {game.totalAvailableAchievements}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-lime-400 h-2 rounded-full"
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
    </div>
  )
}
