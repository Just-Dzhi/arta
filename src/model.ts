import fs from 'fs';
import { generateText, llamacpp } from 'modelfusion';
import { getConversationContext, addUserMessage, addAssistantMessage, initializeConversation } from './conversation.js';
import { logError } from './utils/utils.js';
import { Message, TextChannel } from 'discord.js';

async function handleModelResponse(message: Message) {
    const userId = message.author.id;
    let typingInterval: NodeJS.Timeout | undefined;

    try {
        typingInterval = startTypingIndicator(message.channel as TextChannel);

        initializeConversation(userId);
        addUserMessage(userId, message);

        const text = await generateText({
            model: llamacpp.CompletionTextGenerator({
                promptTemplate: llamacpp.prompt.ChatML,
                stopSequences: ["<|stop|>"],
            }).withChatPrompt(),
            prompt: {
                system: fs.readFileSync('./modelPrompt.txt', 'utf-8'),
                messages: getConversationContext(userId)
            }
        });

        clearInterval(typingInterval);
        addAssistantMessage(userId, text);
        message.reply(text);
    } catch (error) {
        if (typingInterval) {
            clearInterval(typingInterval);
        };

        logError(error);
        message.reply(`I'm sleeping and will answer later~`);
    };
};

function startTypingIndicator(channel: TextChannel): NodeJS.Timeout {
    channel.sendTyping();
    return setInterval(() => {
        channel.sendTyping();
    }, 2000);
};

export { handleModelResponse };