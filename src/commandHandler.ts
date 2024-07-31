import { client } from './client.js';
import { ir } from './utils/utils.js';
import { help } from './commands/commandHelp.js';
import { createEmbed } from './commands/commandEmbed.js';

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'help':
            await help(interaction);
            break;
        case 'embed':
            await createEmbed(interaction);
            break;
        default:
            await interaction.reply(ir(`ouch... Error in commandHandler!`, true));
            break;
    };
});