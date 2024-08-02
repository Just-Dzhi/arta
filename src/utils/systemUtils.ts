function logError(error: Error, additionalInfo = ''): void {
    console.log(`\n--------`);
    console.error(`\nError: ${error.message}`);
    if (additionalInfo) {
        console.log(`\nAdditional info: ${additionalInfo}`);
    };

    const errorLocation = error.stack.split('\n')[1].trim();
    console.log(`\nLocation: ${errorLocation}`);
    console.log(`\n--------`);
};

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
};

function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

export { logError, getRandomNumber, formatDate };