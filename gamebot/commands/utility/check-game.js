const { SlashCommandBuilder } = require('discord.js')
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
  async execute(interaction) {
    const game = interaction.options.getString("game");
    const games = database.checkGame(game);

    await interaction.reply("Input Received!")
  }
}