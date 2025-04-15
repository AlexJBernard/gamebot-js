# gamebot-js
A discord bot used for tracking which games are owned by users of the current server. Allows users to register a list of games they own and compare them to other users on the current server.

## Table of Contents
- [About](#about)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Commands](#commands)
- [To-Do List](#to-do-list)
- [Credits](#credits)

## About

## Installation
The following project requires node and npm to run.

## How to Run

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
- Standardize string inputs
  - Make letters either uppercase or lowercase
  - Trim all whitespace with a single '-'
  - Remove trailing whitespace.
- Modify to be server agnostic
- Add project unit tests
- Add SQL Database

## Credits