import { User, addUser } from '../database.js';
import { getRandomNumber, logError } from './systemUtils.js';
import { Message, GuildMember } from 'discord.js';

function addUserToDB(userSource: any) {
    try {
        const user = extractUserData(userSource);

        const userData: User = {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            xp: getRandomNumber(1, 5),
            avatarURL: user.displayAvatarURL(),
        };

        addUser(userData);
        return userData;
    } catch (error) {
        logError(error, 'error adding user to database');
    };
};

function extractUserData(userSource: any) {
    if (userSource instanceof Message) {
        return userSource.author;
    } else if (userSource instanceof GuildMember) {
        return userSource.user;
    } else {
        throw new Error('Unsupported user source type');
    };
};

export { addUserToDB };