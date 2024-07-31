import { REST, Routes } from 'discord.js';
import { logError } from '../utils/utils.js';
import fs from 'fs';
import 'dotenv/config';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const commands = JSON.parse(fs.readFileSync('./src/commands/commands.json', 'utf8'));

async function refreshCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.DISCORD_CLIENT_ID,
                process.env.DISCORD_GUILD_ID
            ), { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        logError(error, 'Error in refreshing application (/) commands');
    };
};

refreshCommands();