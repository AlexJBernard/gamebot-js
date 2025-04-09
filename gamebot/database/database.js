/**
 * Interface for all database types
 */
const database = {
  /**
   * 
   * @param {Snowflake} userId 
   */
  getUser: function (userId) { },
  /**
   * 
   * @param {Object} userData 
   */
  saveUser: function (userData) { },
  /**
   * 
   * @param {Array} userList 
   */
  findMostOwned: function(userList) { },
  /**
   * 
   * @param {string} gamename 
   */
  findUsersWithGame: function(gamename) { }
}

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
  } else {
    userGameList.push(updatedUserData)
  }
}

/**
 * 
 */
const memoryDatabase = {
  /**
   * 
   * @param {Snowflake} userId The desired user's discord id
   */
  getUser: function (userId) {
    const user = userGameList.indexOf()
  }

}

/**
 * 
 */
const sqlDatabase = {

}

export {
  memoryDatabase,
  sqlDatabase
}