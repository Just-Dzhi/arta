import { CommandInteraction, TextChannel, PermissionsBitField } from 'discord.js';
import { loadReactions, saveReactions } from './reactions.js';
import { ir, logError } from '../../utils/utils.js';

const reactionsConfig = loadReactions();

const clearAllRoles = async (interaction: CommandInteraction): Promise<void> => {
    try {
        if (!interaction.memberPermissions?.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply(ir('You do not have permission to use this command :(', true));
            return;
        };

        for (const messageId in reactionsConfig.messages) {
            for (const emoji in reactionsConfig.messages[messageId]) {
                const message = await (interaction.channel as TextChannel).messages.fetch(messageId);
                const reaction = message.reactions.cache.get(emoji);
                if (reaction) {
                    await reaction.remove();
                };
            };
            delete reactionsConfig.messages[messageId];
        };

        saveReactions(reactionsConfig);

        await interaction.reply(ir('All roles have been removed from all messages', true));
    } catch (error) {
        await interaction.reply(ir('Error clearing roles', true));
        logError(error);
    };
};

export { clearAllRoles };