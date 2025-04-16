const { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  MessageFlags
} = require('discord.js')
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
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction Data within the sent slash command
     */
  async execute(interaction) {
    const game = interaction.options.getString("game");
    const id = interaction.member.user.id
    const currentUserData = database.getUser(id)
    let response = `ERROR: ${game} not found in user's game list`;

    if (currentUserData.games.indexOf(game) >= 0) {
      const newList = currentUserData.games.filter(gamename => gamename !== game)
      currentUserData.games = newList
      response = `Game ${game} removed!`
    }

    await interaction.reply({
      content: response,
      flags: MessageFlags.Ephemeral
    })
  }
}