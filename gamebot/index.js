const fs = require('node:fs');
const path = require('node:path');

const { 
  clientId, 
  guildId,
  token 
} = require('./config.json');

const { 
  Client, 
  Collection, 
  Events, 
  GatewayIntentBits, 
  MessageFlags
} = require('discord.js');

// Creates a new Discord Client instance
const client = new Client(
  { 
    intents: [
      GatewayIntentBits.Guilds
    ] 
  });

/**
 * Discord.js collection containing all '/' commands.
 */
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error("ERROR: Invalid command name!")
    return;
  }

  try {
    await command.execute(interaction);
  } catch(error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "", flags: MessageFlags.Ephemeral });
    } else {
      await interaction.reply({ content: "There was an error", flags: MessageFlags.Ephemeral })
    }
  }
});

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Uses Discord token to login.
client.login(token);