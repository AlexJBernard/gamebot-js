const { 
  SlashCommandBuilder,
  MessageFlags,
  ChatInputCommandInteraction
} = require('discord.js')
const database = require('../../database/memoryDatabase')

const addGameToUser = function(userData, game) {
  return {
    ...userData, 
    games: [...userData.games, game]
  }
}

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
    const { id, username } = interaction.member.user;
    const currentUserData = database.getUser(id)
    // If the current user is not recorded, create a new userData object
    const userData = currentUserData ? currentUserData : {
      id,
      username,
      games: []
    }

    let response = `ERROR: User already possess game ${game}`
    if (userData.games.indexOf(game) < 0) {
      const updatedUserData = addGameToUser(userData, game)
      database.saveUser(updatedUserData)
      console.log(updatedUserData.games)
      response = 'Game Successfully Added!'
    }

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction Data within the sent slash command
     */
    await interaction.reply({
      content: response,
      flags: MessageFlags.Ephemeral
    })
  },
}