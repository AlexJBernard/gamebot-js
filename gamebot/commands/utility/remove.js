const { SlashCommandBuilder } = require('discord.js')
const database = require('../../database/memoryDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Removes the given game from the user's list of games")
    .addStringOption(opt => {
      return opt.setName("game")
        .setRequired(true)
        .setDescription("Game to be removed.")
    }),
  async execute(interaction) {
    await interaction.reply("ERROR: COMMAND WORK-IN-PROGRESS")
  }
}