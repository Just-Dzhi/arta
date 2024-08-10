import { client, clientMention } from './client.js';
import { handleModelResponse } from './model.js';
import { Message } from 'discord.js';
import { getUser, updateUser } from './database.js';
import { getRandomNumber, logError } from './utils/systemUtils.js';
import { addUserToDB } from './utils/addUserToDB.js';

client.on('messageCreate', async (message: Message) => {
    if (message.author.id === client.user?.id) return;

    if (clientMention(message, client)) {
        await handleModelResponse(message);
    };

    await handleUserData(message);
});

async function handleUserData(message: Message) {
    let user = getUser(message.author.id);

    if (!user) {
        user = addUserToDB(message);
    };

    user.xp += getRandomNumber(1, 5);
    if (user.displayName != message.author.displayName) {
        user.displayName = message.author.displayName;
    };

    user.messageCount += 1;

    try {
        updateUser(user);
    } catch (error) {
        logError(error, `Error updating user ${user.username}`);
    };
};