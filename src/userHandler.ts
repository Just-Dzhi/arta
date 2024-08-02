import { client } from './client.js';
import { GuildMember } from 'discord.js';
import { addUser, deleteUser } from './database.js';
import { logError } from './utils/systemUtils.js';

client.on('guildMemberAdd', async (member: GuildMember) => {
    try {
        const userData = {
            id: member.user.id,
            username: member.user.username,
            displayName: member.user.displayName,
            xp: 0,
            avatarURL: member.user.displayAvatarURL(),
        };

        addUser(userData);
    } catch (error) {
        logError(error, 'error adding user to database');
    };
});

client.on('guildMemberRemove', async (member: GuildMember) => {
    try {
        deleteUser(member.id);
    } catch (error) {
        logError(error, 'error delete user to database');
    };
});