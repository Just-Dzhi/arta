import { CommandInteraction, CommandInteractionOptionResolver, TextChannel } from 'discord.js';
import { getReactions, saveReactions } from './reactions.js';
import { ir } from '../../utils/utils.js';

async function setRole(interaction: CommandInteraction): Promise<void> {
    try {
        const options = interaction.options as CommandInteractionOptionResolver;

        const messageId: string | null = options.getString('message_id');
        const emoji: string | null = options.getString('emoji');
        const roleName: any | null = options.getRole('role');

        if (!getReactions.messages[messageId]) {
            getReactions.messages[messageId] = {};
        };

        const message = await (interaction.channel as TextChannel).messages.fetch(messageId);
        await message.react(emoji);

        getReactions.messages[messageId][emoji] = roleName.id;
        saveReactions(getReactions);
        interaction.reply(ir('Ready', true));
    } catch (error) {
        interaction.reply(ir('Error', true));
        console.error(error);
    };
};

export { setRole };