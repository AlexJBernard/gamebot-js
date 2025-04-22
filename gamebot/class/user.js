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
   * 
   * @param {String} username The username for the given Discord member
   * @param {Snowflake} userId The userId for the given Discord member
   * @param {Array} games List of games owned by this user
   */
  constructor(username, userId, games) {
    this.username = username;
    this.userId = userId;
    this.games = games;
  }

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
  set addGame(game) {
    if (this.games.indexOf(game) >= 0) {
      return false
    }
    
    const newList = [...this.games, game]
    this.games = newList
    return true
  }

  /**
   * @param {String} game Name of the game being removed
   */
  set removeGame(game) {
    if (this.games.indexOf(game) < 0) {
      return false
    }

    const newList = this.games.filter((item) => {
      return item === game;
    })
    this.games = newList
  }

  /**
   * 
   * @param {String} game 
   * @returns 
   */
  hasGame(game) {
    return this.games.includes(game)
  }


}

module.exports = User