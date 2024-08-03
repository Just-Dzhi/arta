import { Message } from 'discord.js';

interface MessageContext {
    role: "assistant" | "user";
    content: string;
};

const conversationContexts: Record<string, MessageContext[]> = {};

function initializeConversation(userId: string): void {
    if (!conversationContexts[userId]) {
        conversationContexts[userId] = [
            {
                role: "assistant",
                content: "Hello everyone"
            }
        ];
    };
};

function addUserMessage(userId: string, message: Message): void {
    conversationContexts[userId].push({
        role: "user",
        content: `${message.content.replace(/<@!?(\d+)>/g, '').trim()}`
    });
};

function addAssistantMessage(userId: string, messageContent: string): void {
    conversationContexts[userId].push({
        role: "assistant",
        content: messageContent
    });
};

function getConversationContext(userId: string): MessageContext[] {
    return conversationContexts[userId];
};

export { initializeConversation, addUserMessage, addAssistantMessage, getConversationContext };
