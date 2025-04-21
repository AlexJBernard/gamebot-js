# gamebot-js
A discord bot used for tracking which games are owned by users of the current server. Allows users to register a list of games they own and compare them to other users on the current server.

## Table of Contents
- [Usage](#Usage)
- [How to Run](#how-to-run)
- [Commands](#commands)
- [To-Do List](#to-do-list)
- [Credits](#credits)

## How To Run
### Requirements
Before attempting to run the following bot, make sure you have the following
- Node.js
- npm package installer
- Discord Bot Token
- Discord Bot Client ID
- Discord Guild ID

### Setup
Within the ```/gamebot``` directory, create a file titled ```config.json``` containing the following data
```json
{
  "token": "{DISCORD TOKEN}",
  "clientId": "{DISCORD CLIENT ID}",
  "guildId": "{DISCORD GUILD ID}"
}
```

All node packages must also be properly installed before running. This can be done by executing the following command,
```bash
npm install
```
from the beforementioned ```/gamebot``` directory

### Running
Before running the command, make sure to register the current slash commands. 
```bash
node deploy-commands.js
```

After all commands have been registered, the bot can be run with the command,
```bash
node index.js
```

## Commands
### /register [*game-name*]
Adds the given game to the user's list of games.

### /remove [*game-name*]
Removes the current game from the user's list of games.

### /list
Lists the top 5 games owned by all users of the server.

### /check-game [*game-name*]
Lists how many users own the game with the given title.

### /check-user [*username*]
Lists all games that have been registered by the current user.

## To-Do List
### Features
- Add connectivity to an existing video game database such as [RAWG.io](https://rawg.io/)
### Technical
- Add project unit tests
- Add SQL Database
- Standardize string inputs
  - Make letters either uppercase or lowercase
  - Trim all whitespace with a single '-'
  - Remove trailing whitespace.
- Modify to be server agnostic (No GuildID)

## Credits
Project code for index and deploy-commands was extended from the [DiscordJS guide](https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses)

Initial programming assistance provided by [Samuel Ruwe](https://github.com/SamuelRuwe)
