import { CommandInteraction, CommandInteractionOptionResolver, TextChannel, PermissionsBitField } from 'discord.js';
import { loadReactions, saveReactions } from './reactions.js';
import { ir, hasInteractionPermission } from '../../utils/utils.js';
import { logError } from '../../utils/systemUtils.js';

const reactionsConfig = loadReactions();

const setRole = async (interaction: CommandInteraction): Promise<void> => {
    try {
        if (!hasInteractionPermission(interaction, PermissionsBitField.Flags.Administrator)) {
            await interaction.reply(ir('You do not have permission to use this command :(', true));
            return;
        };

        const options = interaction.options as CommandInteractionOptionResolver;

        const messageId = options.getString('message_id');
        const emoji = options.getString('emoji');
        const role = options.getRole('role');

        if (!messageId || !emoji || !role) {
            await interaction.reply(ir('Invalid input', true));
            return;
        };

        if (!reactionsConfig.messages[messageId]) {
            reactionsConfig.messages[messageId] = {};
        };

        const message = await (interaction.channel as TextChannel).messages.fetch(messageId);
        await message.react(emoji);

        reactionsConfig.messages[messageId][emoji] = role.id;
        saveReactions(reactionsConfig);

        await interaction.reply(ir('Role set successfully', true));
    } catch (error) {
        await interaction.reply(ir('Error setting role', true));
        logError(error);
    };
};

export { setRole };
