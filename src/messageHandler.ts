import { client, clientMention } from './client.js';
import { Message } from 'discord.js';

client.on('messageCreate', async (message: Message) => {
    if (message.author.id === client.user?.id) return;

    if (clientMention(message, client)) {
        await message.reply('meow ^^');
    };
});