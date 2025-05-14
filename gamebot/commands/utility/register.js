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
    let response = `ERROR: INVALID INPUT`

    // Correct user input 
    // Trim lead and trailing whitespaces
    // Set all characters to lowercase
    // Replace each string of spaces with a single '-'
    const nameTrimmed = game.trim().toLowerCase()
    const regex = new RegExp("\\S+", "g")
    const regexResult = nameTrimmed.match(regex)
    if (regexResult) {
      const gameName = regexResult.join('_')
      const { id, username} = interaction.member.user;
      const currentUserData = database.getUser(id)

      const userData = currentUserData ? currentUserData : new User(id, username, [])

      response = `ERROR: User already possesses game **${gameName}**`

      if (!userData.hasGame(gameName)) {
        userData.addGame(gameName)
        database.saveUser(userData)
        response = `### ${gameName}\n was added to your collection.`
      }
    }

    await interaction.reply({
      content: response,
      flags: MessageFlags.Ephemeral
    })
  },
}