const { 
  SlashCommandBuilder,
  ChatInputCommandInteraction 
} = require('discord.js')
const database = require('../../database/memoryDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-user")
    .setDescription("Displays the given user's current list of games")
    .addUserOption(opt => {
      return opt.setName("user")
        .setDescription("The user who's list is being checked.")
        .setRequired(true);
    }),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const user = interaction.options.getUser("user")
    const userData = database.getUser(user.id)

    if (userData) {
      let responseText = user.username + "\n"
      responseText += userData.games.toString()
      await interaction.reply(responseText)
    } else {
      await interaction.reply("ERROR: User not registered")
    }
  }
}