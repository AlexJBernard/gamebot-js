
const fs = require('fs');
const User = require('../class/user')

const fileUrl = './data/data.json';

/** 
 * @returns {Array<User>} A list of User class objects
*/
const getUserList = () => {
  const readStream = fs.readFileSync(fileUrl);

  const data = JSON.parse(readStream);
  /**
   * @type {Array<User>} a list of 
   */
  let userData = []

  return userData;
}

/**
 * @param {User} userData
 */
const updateUserList = (userData) => {
  const userList = getUserList()
  /**
   * @type {Array<User.object>}
   */
  let output = []
  userList.forEach((user) => {
    output.push(user.object)
  })

  fs.writeFileSync('./data/data.json', JSON.stringify(output),
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
   * @returns 
   */
  saveUser: function(userData) {
    updateUserList(userData)
    return null
  },

  /**
   * 
   * @param {String} game 
   * @returns 
   */
  checkGame: function (game) {
    return null
  },

  /**
   * @param {Number} num The number of top games to show
   * @returns {Array<Object>}
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