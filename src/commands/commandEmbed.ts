import { embed, ir, hasInteractionPermission  } from '../utils/utils.js';
import { logError } from '../utils/systemUtils.js';
import { CommandInteraction, CommandInteractionOptionResolver, PermissionsBitField } from 'discord.js';

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
            const formattedDescription: string = description.replace(/\\n/g, '\n');
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