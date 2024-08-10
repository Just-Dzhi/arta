import { ir, embed } from '../utils/utils.js';
import { logError } from '../utils/systemUtils.js';
import { CommandInteraction, CommandInteractionOptionResolver, User } from 'discord.js';
import { getUser } from '../database.js';

async function info(interaction: CommandInteraction) {
    try {
        const options = interaction.options as CommandInteractionOptionResolver;
        const user: User | null = options.getUser('user');
        const userData = getUser(user.id);

        if (userData) {
            await interaction.reply(embed(
                `${userData.displayName}`,
                `
                | XP: ${userData.xp}
                | Level: ${userData.level}
                | Message Count: ${userData.messageCount}
                `, true,
                `${userData.avatarURL}`
            ));
        } else {
            await interaction.reply(ir('User data not found in the database.', true));
        };
    } catch (error) {
        logError(error);
        await interaction.reply(ir(`I'm sleeping and will answer later~`, true));
    };
};

export { info };