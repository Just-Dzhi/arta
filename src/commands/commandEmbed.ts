import { embed, ir, hasInteractionPermission, getGuildEmoji } from '../utils/utils.js';
import { logError } from '../utils/systemUtils.js';
import { CommandInteraction, CommandInteractionOptionResolver, PermissionsBitField, GuildEmoji, Collection } from 'discord.js';

const replaceEmojis = async (description: string, guildEmojis: Collection<string, GuildEmoji>): Promise<string> => {
    const emojiRegex = /:(\w+):/g;
    return description.replace(emojiRegex, (match, emojiName) => {
        const emoji = getGuildEmoji(`:${emojiName}:`, guildEmojis);
        return emoji ? emoji.toString() : match;
    });
};

async function createEmbed(interaction: CommandInteraction): Promise<void> {
    try {
        if (!hasInteractionPermission(interaction, PermissionsBitField.Flags.Administrator)) {
            await interaction.reply(ir('You do not have permission to use this command :(', true));
            return;
        };

        const options = interaction.options as CommandInteractionOptionResolver;
        const title: string | null = options.getString('title');
        const description: string | null = options.getString('description');
        const ephemeral: boolean | null = options.getBoolean('ephemeral');

        if (title && description) {
            const guild = interaction.guild;
            if (!guild) {
                await interaction.reply(ir('Guild not found!', true));
                return;
            };
            const guildEmojis = guild.emojis.cache;

            const formattedDescription = await replaceEmojis(description.replace(/\\n/g, '\n'), guildEmojis);
            await interaction.reply(embed(title, formattedDescription, ephemeral ?? false));
        } else {
            await interaction.reply(ir(`Title or description is missing!`, true));
        };
    } catch (error) {
        logError(error);
        await interaction.reply(ir(`I'm sleeping and will answer later~`, true));
    };
};

export { createEmbed };