const { SlashCommandBuilder } = require('discord.js')
const database = require('../../database/memoryDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-game")
    .setDescription("Displays the full list of users with the following game")
    .addStringOption(opt => {
      return opt.setName("game")
        .setDescription("The name of the game to look for")
        .setRequired(true);
    }),
  async execute(interaction) {
    const game = interaction.options.getString("game");
    const users = database.checkGame(game);
    console.log(users)
    if (users.length == 0) {
      await interaction.reply(`ERROR: No users have been recorded with the following game: ${game}`)
    } else {
      let response = `Users with game \"${game}\"`
      users.map(user => {
        response += "\n" + user.username
      })
  
      await interaction.reply(response)
    }
  }
}