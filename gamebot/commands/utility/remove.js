const { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  MessageFlags
} = require('discord.js')

const User = require('../../class/user')
const database = require('../../database/jsonDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Removes the given game from the user's list of games")
    .addStringOption(opt => {
      return opt.setName("game")
        .setRequired(true)
        .setDescription("Game to be removed.")
    }),
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction Data within the sent slash command
     */
  async execute(interaction) {
    const game = interaction.options.getString("game");

    const nameTrimmed = game.trim().toLowerCase()
    const regex = new RegExp("\\S+", "g")
    const regexResult = nameTrimmed.match(regex)

    if (regexResult) {
      const id = interaction.member.user.id
      const currentUserData = database.getUser(id)
      let response = `ERROR: GAME, **${regexResult}** NOT FOUND IN YOUR GAME LIST`;

      if (currentUserData.hasGame(regexResult)) {
        currentUserData.removeGame(regexResult)
        database.saveUser(currentUserData)
        response = `Game **${regexResult}** removed!`
      }
    } else {
      response `ERROR: INVALID INPUT.`
    }

    await interaction.reply({
      content: response,
      flags: MessageFlags.Ephemeral
    })
  }
}