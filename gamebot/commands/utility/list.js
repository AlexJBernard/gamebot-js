const { 
  SlashCommandBuilder,
  ChatInputCommandInteraction ,
  MessageFlags
} = require('discord.js')
const database = require('../../database/jsonDatabase')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Displays the given user's current list of games")
    .addUserOption(opt => {
      return opt.setName("user")
        .setDescription("The user who's list is being checked.")
        .setRequired(false);
    }),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const user = interaction.options.getUser("user") ?? interaction.member.user;
    const userData = database.getUser(user.id)

    let response = "ERROR: User not registered";

    if (userData) {
      response = user.username + "\n"
      response += userData.games.toString()
    }

    await interaction.reply({
      content: response,
      flags: MessageFlags.Ephemeral
    })
  }
}