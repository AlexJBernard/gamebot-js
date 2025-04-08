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
   * @param {*} gamename 
   */
  findUsersWithGame: function(gamename) { }
}

/**
 * @type {Array{Object}} A list of users along with their registered games
 */
let userGameList = []

/**
 * 
 */
const memoryDatabase = {

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