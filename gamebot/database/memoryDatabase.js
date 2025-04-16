
/**
 * @type {Array{Object}} A list of users along with their registered games
 */
let userGameList = []

/**
 * Updates the userGameList to include the user's updated data.
 * @param {Object} updatedUserData 
 */
const updateGameList = (updatedUserData) => {
  const index = userGameList.indexOf(e => e.id === updatedUserData.id)
  if (!!index) {
    let updatedList = userGameList.filter(e => e.id !== updatedUserData.id)
    updatedList.push(updatedUserData)
    userGameList = updatedList
    return {
      message: "SUCCESS: User has been updated"
    }
  } else {
    userGameList.push(updatedUserData)
    return {
      message: "SUCCESS: User has been added"
    }
  }
}

/**
 * 
 */
module.exports =  {
  /**
   * Returns the user from the userGameList whose discord id matches its current entries. 
   * Returns undefined if no users are found.
   * @param {Snowflake} userId The desired user's discord id
   */
  getUser: function (userId) {
    return userGameList.find( e => e.id === userId)
  },

  /**
   * 
   * @param {Object} userData An object containing the 
   * @param {Snowflake} userData.id The discord ID of the user being updated
   */
  saveUser: function (userData) {
    return updateGameList(userData)
  },

  /**
   * Returns a complete list of users that have the given game listed in their list of games
   * @param {String} game Name of the game being searched for.
   * @returns {Array<Object>} A list of user objects
   */
  checkGame: function (game) {

    return userGameList.filter(user => user.games.indexOf(game) >= 0)
  },

  /**
   * Returns an array listing the top 5 most owned games on the current server.
   * @returns {Array} List of games along with the number of users that own them
   */
  topFiveGames: function() {
    let topGameMap = new Map();
    userGameList.map(user => {
      user.games.map(game => {
        if (topGameMap.has(game)) {
          const newVal = topGameMap.get(game) + 1
          topGameMap.set(game, newVal)
        } else {
          topGameMap.set(game, 1)
        }
      })
    })

    let topGameArray = []
    topGameMap.forEach((num, game) =>
      topGameArray.push({
        name: game,
        num: num
      })
    )
    topGameArray.sort((a, b) => b.num - a.num)
    return topGameArray.slice(0, 5)
  }

}