
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
const updateUserList = async (userData) => {
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
   */
  topGames: function(num) {
    let topGameMap = newMap();
    const userList = getUserList()

    return null;
  }
}