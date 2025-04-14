const { SlashCommandBuilder } = require('discord.js')
const database = require('../../database/memoryDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription("Display's the current user's complete list of games"),
  async execute(interaction) {
    await interaction.reply("ERROR: COMMAND WORK-IN-PROGRESS")
  }
}