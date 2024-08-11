import { Client, IntentsBitField, Message } from 'discord.js';
import 'dotenv/config';

const clientName: string[] = (process.env.DISCORD_CLIENT_NAME || '').split(',').map(name => name.trim());

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,
    ]
});

function clientMention(message: Message, client: Client): boolean {
    console.log(clientName);
    return !message.mentions.everyone && !message.author.bot &&
    (message.mentions.has(client.user!.id) || clientName.some(name => message.content.toLowerCase().includes(name)));
};

export { client, clientMention };