import { CommandInteraction, CommandInteractionOptionResolver, User, PermissionsBitField } from 'discord.js';
import { getUser, updateUser } from '../database.js';
import { ir, embed, hasInteractionPermission, handleLevelUpOrDown } from '../utils/utils.js';
import { logError } from '../utils/systemUtils.js';

async function xp(interaction: CommandInteraction) {
    try {
        if (!hasInteractionPermission(interaction, PermissionsBitField.Flags.Administrator)) {
            await interaction.reply(ir('You do not have permission to use this command :(', true));
            return;
        };

        const options = interaction.options as CommandInteractionOptionResolver;

        const commandType = options.getSubcommand();
        const target: User | null = options.getUser('target');
        const amount: number = options.getInteger('amount') ?? 0;

        if (!target) {
            await interaction.reply(ir('Target user not specified.', true));
            return;
        };

        if (amount < 0) {
            await interaction.reply(ir('XP amount must be a positive number.', true));
            return;
        };

        let userData = getUser(target.id);

        if (!userData) {
            await interaction.reply(ir('User data not found in the database.', true));
            return;
        };

        switch (commandType) {
            case 'set':
                userData.xp = amount;
                break;
            case 'add':
                userData.xp += amount;
                break;
            case 'subtract':
                userData.xp -= amount;
                break;
            default:
                await interaction.reply(ir('Invalid subcommand.', true));
                return;
        };

        userData = handleLevelUpOrDown(userData);
        updateUser(userData);

        await interaction.reply(embed(
            `${target.displayName}'s Stats Updated`,
            `
            | XP: ${userData.xp} / ${userData.requiredXP}
            | Level: ${userData.level}
            `, true,
            `${target.displayAvatarURL()}`
        ));
    } catch (error) {
        logError(error);
        await interaction.reply(ir(`I'm sleeping and will answer later~`, true));
    };
};

export { xp };