import { MessageReaction, User, GuildMember, TextChannel } from 'discord.js';
import { loadReactions } from './reactions.js';
import { client } from '../../client.js';

const loadReactionsConfig = () => loadReactions();

const updateRole = async (member: GuildMember, roleId: string, addRole: boolean): Promise<void> => {
    try {
        const role = member.guild.roles.cache.get(roleId);
        if (role) {
            if (addRole) {
                await member.roles.add(role);
            } else {
                await member.roles.remove(role);
            }
        }
    } catch (error) {
        console.error(`Error ${addRole ? 'adding' : 'removing'} role ${roleId} to user ${member.user.tag}: ${error}`);
    }
};

const handleReaction = async (reaction: MessageReaction, user: User, addRole: boolean): Promise<void> => {
    if (user.bot || !reaction.message.guild) return;

    const reactionsConfig = loadReactionsConfig();
    const roleId = reactionsConfig.messages[reaction.message.id]?.[reaction.emoji.name ?? ''];

    if (roleId) {
        try {
            const member = await reaction.message.guild.members.fetch(user.id);
            if (member) {
                await updateRole(member, roleId, addRole);
            }
        } catch (error) {
            console.error(`Error fetching member or updating role: ${error}`);
        }
    }
};

client.on('messageReactionAdd', async (reaction: MessageReaction, user: User) => {
    if (user.bot) return;
    await handleReaction(reaction, user, true);
});

client.on('messageReactionRemove', async (reaction: MessageReaction, user: User) => {
    if (user.bot) return;
    await handleReaction(reaction, user, false);
});

const addReactionsToMessages = async () => {
    try {
        const reactionsConfig = loadReactionsConfig();
        for (const [messageId, emojis] of Object.entries(reactionsConfig.messages)) {
            const message = await fetchMessageById(messageId);
            if (message) {
                for (const emoji of Object.keys(emojis)) {
                    await message.react(emoji);
                }
            }
        }
    } catch (error) {
        console.error('Error adding reactions to messages:', error);
    }
};

const fetchMessageById = async (messageId: string) => {
    for (const channel of client.channels.cache.values()) {
        if (channel instanceof TextChannel) {
            try {
                return await channel.messages.fetch(messageId);
            } catch {
                // Continue to the next channel if message is not found
            }
        }
    }
    return null;
};

client.once('ready', () => {
    addReactionsToMessages();
});
