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

client.once('ready', () => {
    loadConfig();
});

const handleReaction = async (reaction: MessageReaction, user: User, addRole: boolean): Promise<void> => {
    if (user.bot) return;

    const { message } = reaction;
    if (!message.guild) return;

    const roleId = config.messages[message.id]?.[reaction.emoji.name ?? ''];
    if (roleId) {
        try {
            const member = await message.guild.members.fetch(user.id);
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
                if (addRole) {
                    await member.roles.add(role);
                } else {
                    await member.roles.remove(role);
                };
            } else {
                console.warn(`Role with ID ${roleId} not found.`);
            };
        } catch (error) {
            console.error(`Error ${addRole ? 'adding' : 'removing'} role ${roleId} to user ${user.tag}: ${error}`);
        };
    };
};

client.on('messageReactionAdd', (reaction: MessageReaction, user: User) => handleReaction(reaction, user, true));
client.on('messageReactionRemove', (reaction: MessageReaction, user: User) => handleReaction(reaction, user, false));
