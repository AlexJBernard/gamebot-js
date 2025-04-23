/**
 * Adds consistent functionality and structure for user data
 */
class User {

  /**
   * @type {String} The Discord member's username
   */
  username;

  /**
   * @type {Snowflake} The Discord member's userId
   */
  userId;

  /**
   * @type {Array<String>} String list of game names
   */
  games = [];

  /**
   * @returns  A JSON Serializable object
   */
  get object() {
    return {
      username: this.username,
      userId: this.userId,
      games: this.games
    }
  }

  /**
   * @param {String} game The name of the game being added
   */
  addGame(game) {
    if (this.hasGame(game)) {
      return false
    }
    
    const newList = [...this.games, game]
    this.games = newList
    return true
  }

  /**
   * @param {String} game Name of the game being removed
   */
  removeGame(game) {
    if (this.hasGame(game)) {
      this.games = this.games.filter((item) => item !== game)
      return true
    }

    return false
  }

  /**
   * Determines if the current user has the listed game
   * @param {String} game The name of the game being searched for
   * @returns True if the desired game exists in the user's list of games
   */
  hasGame(game) {
    return this.games.includes(game)
  }

  /**
   * 
   * @param {String} username The username for the given Discord member
   * @param {Snowflake} userId The userId for the given Discord member
   * @param {Array<String>} games List of games owned by this user
   */
  constructor(userId, username, games) {
    this.userId = userId;
    this.username = username;
    this.games = games;
  }
}

module.exports = User