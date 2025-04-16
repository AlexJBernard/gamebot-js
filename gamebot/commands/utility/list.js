const { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction
} = require('discord.js')
const database = require('../../database/memoryDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription("Displays the top 5 games owned by all users of the current server"),
  
  
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction Data within the sent slash command
   */
  async execute(interaction) {
    console.log(database.topGames())
    await interaction.reply("ERROR: COMMAND WORK-IN-PROGRESS")
  }
}