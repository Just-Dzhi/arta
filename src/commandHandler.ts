import { client } from './client.js';
import { ir } from './utils/utils.js';
import { help } from './commands/commandHelp.js';
import { nsfw } from './commands/commandNSFW.js';
import { createEmbed } from './commands/commandEmbed.js';
import { setRole } from './commands/reactionToRole/setRole.js';
import { clearAllRoles } from './commands/reactionToRole/clearAllRoles.js';
import { info } from './commands/commandInfo.js';
import { xp } from './commands/commandXP.js';

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
        case 'clear_all_roles':
            await clearAllRoles(interaction);
            break;
        case 'nsfw':
            await nsfw(interaction);
            break;
        case 'info':
            await info(interaction);
            break;
        case 'xp':
            await xp(interaction);
            break;
        default:
            await interaction.reply(ir(`ouch... Error in commandHandler!`, true));
            break;
    };
});