import { EmbedBuilder, TextChannel, CommandInteraction, GuildEmoji, Collection } from 'discord.js';
import { User } from '../database.js';
import { client } from '../client.js';

function embed(title = 'title', description = 'description', ephemeral = false, thumbnail = client.user.avatarURL()) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(0xffffff)
        .setThumbnail(thumbnail)

    return { embeds: [embed], ephemeral: ephemeral };
};

//ir - interaction reply
function ir(content: string, ephemeral = false) {
    if (content === '') {
        content = `I'm sleeping and will answer later~`
    };
    return { content: content, ephemeral: ephemeral };
};

function hasPermission(userId: string, channel: TextChannel, permission: bigint): boolean {
    const member = channel.guild.members.cache.get(userId);
    if (!member) return false;
    return member.permissions.has(permission);
};

function hasInteractionPermission(interaction: CommandInteraction, permission: bigint): boolean {
    const channel = interaction.channel as TextChannel;
    const user = interaction.user;
    return hasPermission(user.id, channel, permission);
};

const getGuildEmoji = (emojiString: string, guildEmojis: Collection<string, GuildEmoji>): GuildEmoji | null => {
    let emojiName = emojiString.replace(/(:|<|>)/g, '');
    return guildEmojis.find(e => e.name === emojiName) || null;
};

function handleLevelUpOrDown(user: User): User {
    while (user.xp >= user.requiredXP) {
        user.xp -= user.requiredXP;
        user.levelXP += user.requiredXP;
        user.level += 1;
        user.requiredXP = Math.floor(user.requiredXP * 1.1);
    };

    while (user.xp < 0 && user.level > 1) {
        user.level -= 1;
        user.levelXP -= user.requiredXP;
        user.requiredXP = Math.floor(user.requiredXP / 1.1);
        user.xp += user.requiredXP;
    };

    return user;
};

export { embed, ir, hasInteractionPermission, getGuildEmoji, handleLevelUpOrDown };