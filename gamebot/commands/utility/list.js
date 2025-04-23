const { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  MessageFlags
} = require('discord.js')
const database = require('../../database/jsonDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription("Displays the top 5 games owned by all users of the current server"),
  
  
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction Data within the sent slash command
   */
  async execute(interaction) {
    const topFive = database.topFiveGames()
    let response = "ERROR: NO REGISTERED GAMES"

    if (topFive.length > 0) {
      response = "MOST OWNED GAMES:"
      topFive.forEach(game => response += '\n' + game.name + '\n\tUsers: ' + game.num)
    }

    await interaction.reply({
      content: response,
      flags: MessageFlags.Ephemeral
    })
  }
}