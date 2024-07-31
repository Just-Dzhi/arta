import { EmbedBuilder } from 'discord.js';
import { client } from '../client.js';

function embed(title = 'title', description = 'description', ephemeral = false, thumbnail = client.user.avatarURL()) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(0xffffff)
        .setThumbnail(thumbnail)

    return { embeds: [embed], ephemeral: ephemeral };
};

//ir - interaction reply
function ir(content: string, ephemeral = false) {
    if (content === '') {
        content = `I'm sleeping and will answer later~`
    };
    return { content: content, ephemeral: ephemeral };
};

function logError(error: Error, additionalInfo = ''): void {
    console.log(`\n--------`);
    console.error(`\nError: ${error.message}`);
    if (additionalInfo) {
        console.log(`\nAdditional info: ${additionalInfo}`);
    };

    const errorLocation = error.stack.split('\n')[1].trim();
    console.log(`\nLocation: ${errorLocation}`);
    console.log(`\n--------`);
};

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
};

export { embed, ir, logError, getRandomNumber};