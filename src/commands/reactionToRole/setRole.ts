import { CommandInteraction, CommandInteractionOptionResolver, TextChannel } from 'discord.js';
import { loadReactions, saveReactions } from './reactions.js';
import { ir } from '../../utils/utils.js';

const reactionsConfig = loadReactions();

const setRole = async (interaction: CommandInteraction): Promise<void> => {
    try {
        const options = interaction.options as CommandInteractionOptionResolver;

        const messageId = options.getString('message_id');
        const emoji = options.getString('emoji');
        const role = options.getRole('role');

        if (!messageId || !emoji || !role) {
            await interaction.reply(ir('Invalid input', true));
            return;
        }

        if (!reactionsConfig.messages[messageId]) {
            reactionsConfig.messages[messageId] = {};
        }

        const message = await (interaction.channel as TextChannel).messages.fetch(messageId);
        await message.react(emoji);

        reactionsConfig.messages[messageId][emoji] = role.id;
        saveReactions(reactionsConfig);

        await interaction.reply(ir('Role set successfully', true));
    } catch (error) {
        await interaction.reply(ir('Error setting role', true));
        console.error(error);
    }
};

export { setRole };
