import { ir } from '../utils/utils.js';
import { logError } from '../utils/systemUtils.js';
import { CommandInteraction } from 'discord.js';

async function nsfw(interaction: CommandInteraction) {
    try {
        await interaction.reply(ir(`https://youtu.be/dQw4w9WgXcQ`, false));
    } catch (error) {
        logError(error);
        await interaction.reply(ir(`I'm sleeping and will answer later~`, true));
    };
};

export { nsfw };