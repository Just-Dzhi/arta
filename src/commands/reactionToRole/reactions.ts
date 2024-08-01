import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const reactionsFilePath = resolve(__dirname, 'reactions.json');

interface Reactions {
    messages: Record<string, Record<string, string>>;
};

const loadReactions = (): Reactions => {
    if (fs.existsSync(reactionsFilePath)) {
        const data = fs.readFileSync(reactionsFilePath, 'utf-8');
        return JSON.parse(data);
    } else {
        saveReactions({ messages: {} });
        return { messages: {} };
    };
};

const saveReactions = (reactions: Reactions): void => {
    fs.writeFileSync(reactionsFilePath, JSON.stringify(reactions, null, 2), 'utf-8');
};

export { loadReactions, saveReactions };
