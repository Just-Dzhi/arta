import fs from 'fs';

const reactionsFilePath = ('./src/reactions.json');

interface Reactions {
    messages: Record<string, Record<string, string>>;
};

function loadReactions(): Reactions {
    if (fs.existsSync(reactionsFilePath)) {
        const data = fs.readFileSync(reactionsFilePath, 'utf-8');
        return JSON.parse(data);
    } else {
        return { messages: {} };
    };
};

function saveReactions(reactions: Reactions): void {
    fs.writeFileSync(reactionsFilePath, JSON.stringify(reactions, null, 2), 'utf-8');
};

const getReactions: Reactions = loadReactions();

export { getReactions, saveReactions };
