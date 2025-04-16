const { 
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  MessageFlags
} = require('discord.js')
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
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction Data within the sent slash command
     */
  async execute(interaction) {
    const game = interaction.options.getString("game");
    const users = database.checkGame(game);

    let response = `ERROR: No users have been recorded with the following game: ${game}`
    
    if (users.length > 0) {
      response = `## Users with game \"${game}\"`
      users.map(user => {
        response += "\n" + user.username
      })
    }
  
    await interaction.reply({
      content: response,
      flags: MessageFlags.Ephemeral
    })
  }
}