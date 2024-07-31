import { MessageReaction, User } from 'discord.js';
import fs from 'fs';
import { client } from '../../client.js';

const configPath = './src/reactions.json';
let config: { messages: Record<string, Record<string, string>> } | undefined;

const loadConfig = (): void => {
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } else {
        config = { messages: {} };
    };
};

client.on('messageReactionAdd', async (reaction: MessageReaction, user: User): Promise<void> => {
    if (user.bot) return;
    if (!config) loadConfig();

    const { message } = reaction;
    if (!message.guild) return;

    const roleId = config.messages[message.id]?.[reaction.emoji.name ?? ''];
    if (roleId) {
        try {
            const member = await message.guild.members.fetch(user.id);
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
                await member.roles.add(role);
            } else {
                console.warn(`Role with ID ${roleId} not found.`);
            };
        } catch (error) {
            console.error(`Error adding role ${roleId} to user ${user.tag}: ${error}`);
        };
    };
});

client.on('messageReactionRemove', async (reaction: MessageReaction, user: User): Promise<void> => {
    if (user.bot) return;
    if (!config) loadConfig();

    const { message } = reaction;
    if (!message.guild) return;

    const roleId = config.messages[message.id]?.[reaction.emoji.name ?? ''];
    if (roleId) {
        try {
            const member = await message.guild.members.fetch(user.id);
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
                await member.roles.remove(role);
            } else {
                console.warn(`Role with ID ${roleId} not found.`);
            };
        } catch (error) {
            console.error(`Error removing role ${roleId} from user ${user.tag}: ${error}`);
        };
    };
});
