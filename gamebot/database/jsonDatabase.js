
const fs = require('fs');

const fileUrl = 'data/data.json';

getUserList = () => {
  const readStream = fs.readFileSync('./data/data.json');

  const data = JSON.parse(readStream);
  console.log(JSON.parse(fs.readFileSync('./data/data.json')))
}

/**
 * @param {Array} updatedUserList
 */
updateUserList = (updatedUserList) => {
  const writeStream = fs.writeFileSync('./data/data.json');

  const newdata = JSON.stringify(updatedUserList)
}

module.exports = {
  getUser: function (userId) {
    getUserList()
    return null
  },

  saveUser: function(userData) {
    return null
  },

  checkGame: function (game) {
    return null
  },

  topGames: function(num) {
    return null;
  }
}