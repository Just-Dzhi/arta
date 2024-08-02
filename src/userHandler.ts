import { client } from './client.js';
import { GuildMember } from 'discord.js';
import { deleteUser } from './database.js';
import { logError } from './utils/systemUtils.js';
import { addUserToDB } from './utils/addUserToDB.js';

client.on('guildMemberAdd', async (member: GuildMember) => {
    addUserToDB(member);
});

client.on('guildMemberRemove', async (member: GuildMember) => {
    try {
        deleteUser(member.id);
    } catch (error) {
        logError(error, 'error delete user to database');
    };
});