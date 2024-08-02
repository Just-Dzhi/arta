import Database from 'better-sqlite3';
import { logError } from './utils/systemUtils.js';
const database = new Database('users.db');

interface User {
    id: string;
    username: string;
    displayName: string;
    xp: number;
    avatarURL: string;
};

const userFields: Record<keyof User, string> = {
    id: 'TEXT PRIMARY KEY',
    username: 'TEXT',
    displayName: 'TEXT',
    xp: 'INTEGER',
    avatarURL: 'TEXT'
};

const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
    ${Object.entries(userFields).map(([field, type]) => `${field} ${type}`).join(', ')}
)`;

database.prepare(createTableQuery).run();

const addUser = (user: User): void => {
    const fields = Object.keys(userFields).join(', ');
    const placeholders = Object.keys(userFields).map(field => `@${field}`).join(', ');
    const stmt = database.prepare(`INSERT INTO users (${fields}) VALUES (${placeholders})`);

    try {
        stmt.run(user);
    } catch (error) {
        logError(error, 'Error adding user');
    };
};

const getUser = (id: string): User | null => {
    const stmt = database.prepare('SELECT * FROM users WHERE id = ?');

    try {
        const user = stmt.get(id) as User;
        return user || null;
    } catch (error) {
        logError(error, `Error fetching user with id ${id}`);
        return null;
    };
};

const updateUser = (user: User): void => {
    const assignments = Object.keys(userFields).map(field => `${field} = @${field}`).join(', ');
    const stmt = database.prepare(`UPDATE users SET ${assignments} WHERE id = @id`);

    try {
        stmt.run(user);
    } catch (error) {
        logError(error, `Error updating user with id ${user.id}`);
    };
};

const deleteUser = (id: string): void => {
    const stmt = database.prepare(`DELETE FROM users WHERE id = ?`);

    try {
        stmt.run(id);
    } catch (error) {
        logError(error, `Error deleting user with id ${id}`);
    };
};

const getAllUsers = (): User[] => {
    const stmt = database.prepare(`SELECT * FROM users`);

    try {
        const users = stmt.all() as User[];
        return users;
    } catch (error) {
        logError(error, 'Error fetching all users');
        return [];
    };
};

export { User, addUser, getUser, updateUser, deleteUser, getAllUsers };