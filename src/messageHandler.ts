import { client, clientMention } from './client.js';
import { handleModelResponse } from './model.js';
import { Message } from 'discord.js';
import { User, addUser, getUser, updateUser } from './database.js';
import { getRandomNumber, logError } from './utils/systemUtils.js';

client.on('messageCreate', async (message: Message) => {
    if (message.author.id === client.user?.id) return;

    if (clientMention(message, client)) {
        await handleModelResponse(message);
    };

    await handleUserExperience(message);
});

async function handleUserExperience(message: Message) {
    let user = getUser(message.author.id);

    if (!user) {
        const newUser: User = {
            id: message.author.id,
            username: message.author.username,
            displayName: message.author.displayName,
            xp: getRandomNumber(1, 5),
            avatarURL: message.author.displayAvatarURL(),
        };

        try {
            addUser(newUser);
            user = newUser;
        } catch (error) {
            logError(error, `Error adding user ${newUser.username}`);
            return;
        };
    };

    user.xp += getRandomNumber(1, 5);
    if (user.displayName != message.author.displayName) {
        user.displayName = message.author.displayName;
    };

    try {
        updateUser(user);
    } catch (error) {
        logError(error, `Error updating user ${user.username}`);
    };
};