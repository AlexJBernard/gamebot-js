const { SlashCommandBuilder } = require('discord.js')
import { memoryDatabase } from '../../database/database'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registers game for the given user')
    .addStringOption(opt => {
      return opt.setName("game")
        .setDescription("The name of the added game")
        .setRequired(true)
    }),
  async execute(interaction) {

  }
}