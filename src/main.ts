import { client } from './client.js';
import './messageHandler.js';
import './commandHandler.js';
import './userHandler.js';
import './commands/reactionToRole/reactionHandler.js';
import 'dotenv/config';

client.login(process.env.DISCORD_TOKEN);