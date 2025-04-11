/**
 * SLASH COMMAND:
 * Tests whether the current bot is online and detecting commands.
 */

const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Tests bot's connection"),
  async execute(interaction) {
    await interaction.reply("pong!")
  }
}