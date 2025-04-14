const { SlashCommandBuilder } = require('discord.js')
const database = require('../../database/memoryDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-user")
    .setDescription("Displays the given user's current list of games")
    .addStringOption(opt => {
      return opt.setName("username")
        .setDescription("The desired user's username")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction.reply("COMMAND WORK-IN-PROGRESS")
  }
}