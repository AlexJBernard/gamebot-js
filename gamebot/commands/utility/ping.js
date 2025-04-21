/**
 * SLASH COMMAND:
 * Tests whether the current bot is online and detecting commands.
 */

const { 
  SlashCommandBuilder,
  ChatInputCommandInteraction
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Tests bot's connection"),
  
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction Data within the sent slash command
   */
  async execute(interaction) {
    await interaction.reply("pong!")
  }
}