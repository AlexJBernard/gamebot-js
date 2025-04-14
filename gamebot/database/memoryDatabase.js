
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
   * 
   * @param {String} game Name of the game being searched for.
   */
  checkGame: function (game) {
    return userGameList
  }

}