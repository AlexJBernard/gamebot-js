/**
 * The following command allows the user to select a game to remove from a ActionRow GUI.
 * 
 * 
 */

const {
  // Functions
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,

  // Classes used for in-code documentation
  ChatInputCommandInteraction,
  MessageFlags
} = require('discord.js')

/** Database file used for storage */
const database = require('../../database/jsonDatabase')

/**
 * 
 * @param {Array<String>} games An array of strings listing 
 * @param {number} page Page number being displayed. Determines the starting index
 */
function setButtons(games, page) {
  
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-menu")
    .setDescription("Lets the user choose a game from their list to remove"),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction Data sent from the given user interaction
     */
  async execute(interaction) {

    /** 
     * Data about the current user stored in the bot's database. 
     */
    const user = database.getUser(interaction.member.user.id)

    if (!user || user.games.length == 0) {
      // If the user does not have any games, send error
      await interaction.reply({
        content: "ERROR: User does not have games",
        flags: MessageFlags.Ephemeral
      })
    } else {
      // Otherwise, begin sending the menu
      /** 
       * ActionRow containing options for the user to remove from their game list  
       */
      const row = new ActionRowBuilder()

      /**
       * List of buttons added in the given action row
       */
      let buttons = []

      // Create button objects for each game in the user game list
      user.games.forEach(game => {
        buttons.push(new ButtonBuilder()
          .setCustomId(game)
          .setLabel(`Remove ${game}`)
          .setStyle(ButtonStyle.Danger)
        )
      })

      // 
      buttons.push(new ButtonBuilder()
        .setCustomId('Cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary)
      )
      row.addComponents(buttons)

      // Send the user a menu of games they can remove
      let menuResponse = await interaction.reply({
        content: 'Select a game to remove',
        components: [row],
        withResponse: true,
        flags: MessageFlags.Ephemeral
      })

      // 
      try {
        let inMenu = true
        while (inMenu) {
          // Read the user's remove request
          const request = await menuResponse.resource.message.awaitMessageComponent({
            time: 60_000
          })

          if (request.customId === 'Next') {

          }
        }

        if (request.customId === 'Cancel') {
          await request.update({
            content: 'Remove request canceled',
            components: [],
            flags: MessageFlags.Ephemeral
          })
        } else {
          user.removeGame(request.customId);
          database.saveUser(user);
          await request.update({
            content: `${request.customId} has been removed.`,
            components:[],
            flags: MessageFlags.Ephemeral
          })
        }
        
      } catch {

        // Default error response
        await interaction.editReply({ 
          content: 'Confirmation not received within 1 minute.', 
          components: [],
          flags: MessageFlags.Ephemeral
        })
      }
    }
  }
}