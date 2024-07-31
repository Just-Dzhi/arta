import { client } from './client.js';
import { ir } from './utils/utils.js';
import { help } from './commands/commandHelp.js';
import { createEmbed } from './commands/commandEmbed.js';
import { setRole } from './commands/reactionToRole/setRole.js';

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'help':
            await help(interaction);
            break;
        case 'embed':
            await createEmbed(interaction);
            break;
        case 'set_role':
            await setRole(interaction);
            break;
        default:
            await interaction.reply(ir(`ouch... Error in commandHandler!`, true));
            break;
    };
});