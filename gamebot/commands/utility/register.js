const { 
  SlashCommandBuilder,
  MessageFlags,
  ChatInputCommandInteraction
} = require('discord.js')

const User = require('../../class/user')
const database = require('../../database/jsonDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registers game for the given user')
    .addStringOption(opt => {
      return opt.setName("game")
        .setDescription("The name of the added game")
        .setRequired(true);
    }),

  /**
   * 
   * @param {ChatInputCommandInteraction} interaction Data within the sent slash command
   */
  async execute(interaction) {
    const game = interaction.options.getString("game");

    // Correct user input 
    // Trim lead and trailing whitespaces
    // Set all characters to lowercase
    // Replace each string of spaces with a single '-'
    const gameCorrected = game.trim().toLowerCase()
    
    const { id, username } = interaction.member.user;
    const currentUserData = database.getUser(id)
    // If the current user is not recorded, create a new userData object
    const userData = currentUserData ? currentUserData : new User(id, username, [])
    console.log(userData)

    let response = `ERROR: User already possess game ${game}`
    if (!userData.hasGame(game)) {
      userData.addGame(game)
      database.saveUser(userData)
      response = 'Game Successfully Added!'
    }

    await interaction.reply({
      content: response,
      flags: MessageFlags.Ephemeral
    })
  },
}