const { SlashCommandBuilder } = require('discord.js')
import { database } from '../../database/memoryDatabase.js'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registers game for the given user')
    .addStringOption(opt => {
      return opt.setName("game")
        .setDescription("The name of the added game")
        .setRequired(true);
    }),
  async execute(interaction) {
    const game = interaction.options.getString("game");
    const { id, user } = interaction.member.user;
  }
}