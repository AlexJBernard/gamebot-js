
const fs = require('fs');
const path = require('path');
const User = require('../class/user')

const fileUrl = 'data/data.json';

/** 
 * @returns {Array<User>} A list of User class objects
*/
const getUserList = () => {
  const filePath = path.join(__dirname, fileUrl)
  const readStream = fs.readFileSync(filePath, 'utf8');

  /**
   * @type {Array<Object>} A list of objects obtained from the provided json
   */
  const data = JSON.parse(readStream);

  /**
   * @type {Array<User>} The list of users parsed from the project's json document
   */
  let userData = data.map(
    /**
     * 
     * @param {Object} user An object stored in the data.json file
     * @param {Snowflake} user.id The user's Discord id
     * @param {String} user.username The user's Discord username
     * @param {Array<String>} user.games The recorded list of user games
     * @returns 
     */
    (user) => {
    
      return new User(user.userId, user.username, user.games)
    }
  )
  console.log(userData)

  return userData;
}

/**
 * @param {User} userData
 */
const updateUserList = (userData) => {

  // List of users
  const userList = getUserList()

  /**
   * @type {Array<User.object>}
   */
  let output = userList.filter((user) => user.userId !== userData.userId)
  output.push(userData.object)
  const filePath = path.join(__dirname, fileUrl)

  fs.writeFileSync(filePath, JSON.stringify(output),
    {
      encoding: "utf8",
    }
  );
}

module.exports = {
  getUser: function (userId) {
    const userList = getUserList()
    return userList.find((user) => user.userId === userId)
  },

  /**
   * 
   * @param {User} userData 
   * @returns {Object.String} An object containing the success of the given operation
   */
  saveUser: function(userData) {
    updateUserList(userData)
    return {
      message: "SUCCESS: User Added!"
    }
  },

  /**
   * 
   * @param {String} game 
   * @returns 
   */
  checkGame: function (game) {
    return getUserList().filter(user => user.hasGame(game))
  },

  /**
   * @param {Number} num The number of top games to show
   * @returns {Array<Object>} Returns a list of objects, showing how many users own each game, in descending order
   */
  topGames: function(num) {
    let topGameMap = new Map();
    const userList = getUserList();
    userList.map((user) => {
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
    }))

    topGameArray.sort((a, b) => b.num - a.num)
    return topGameArray.slice(0, num);
  }
}