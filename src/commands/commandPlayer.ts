import { CommandInteraction, CommandInteractionOptionResolver } from 'discord.js';
import { playSong, skipSong, stopSong, pauseSong, resumeSong, showQueue, removeSongFromQueue } from '../musicPlayer.js';
import { ir } from '../utils/utils.js';
import { logError } from '../utils/systemUtils.js';

async function player(interaction: CommandInteraction) {
    try {
        const options = interaction.options as CommandInteractionOptionResolver;
        const commandType = options.getSubcommand();

        switch (commandType) {
            case 'play':
                const query: string | null = options.getString('query');
                if (!query) {
                    await interaction.reply(ir('Please provide a song name or URL.', true));
                    return;
                };
                await playSong(interaction, query);
                break;

            case 'skip':
                await skipSong(interaction);
                break;

            case 'stop':
                await stopSong(interaction);
                break;

            case 'pause':
                await pauseSong(interaction);
                break;

            case 'resume':
                await resumeSong(interaction);
                break;

            case 'queue':
                await showQueue(interaction);
                break;

            case 'remove':
                const position: number | null = options.getInteger('position');
                if (position === null || position < 1) {
                    await interaction.reply(ir('Please provide a valid position number.', true));
                    return;
                };
                await removeSongFromQueue(interaction, position);
                break;

            default:
                await interaction.reply(ir('Invalid subcommand.', true));
                return;
        };
    } catch (error) {
        logError(error);
        await interaction.reply(ir(`I'm sleeping and will answer later~`, true));
    };
};

export { player };