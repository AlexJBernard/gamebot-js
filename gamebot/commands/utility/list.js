const { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  MessageFlags
} = require('discord.js')
const database = require('../../database/jsonDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription("Displays the top games owned by all users of the current server")
    .addIntegerOption(option => 
      option 
        .setName("games")
        .setDescription("The total number of games to display.\nSet to 5 by default.")
    ),
  
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction Data within the sent slash command
   */
  async execute(interaction) {
    const num = interaction.options.getInteger('games') ?? 5;

    const list = database.topGames(num)
    let response = "ERROR: NO REGISTERED GAMES"

    if (list.length > 0) {
      response = "MOST OWNED GAMES:"
      list.forEach(game => response += '\n' + game.name + '\n\tUsers: ' + game.num)
    }

    await interaction.reply({
      content: response,
      flags: MessageFlags.Ephemeral
    })
  }
}