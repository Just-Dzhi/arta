import { ir, embed } from '../utils/utils.js';
import { logError } from '../utils/systemUtils.js';
import { CommandInteraction } from 'discord.js';

async function help(interaction: CommandInteraction) {
    try {
        const description: string = ``
        + `Hello! My name is Arta, you can talk to me by simply pinging me or replying to one of my messages.\n`
        + `\n**You can also use the following commands:**`
        + `\n1. /help - show info about Arta\n`
        + `\n2. /info - show info about u\n`
        + `\n3. /nsfw - get random nsfw picture hehe\n`

        await interaction.reply(embed('Hi~ My name is Arta ^^', description, true));
    } catch (error) {
        logError(error);
        await interaction.reply(ir(`I'm sleeping and will answer later~`, true));
    };
};

export { help };