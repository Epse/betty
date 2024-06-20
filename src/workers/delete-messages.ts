import dayjs from "dayjs";
import {Client} from "../types/client";
import {BaseGuildTextChannel, Channel, ChannelType} from "discord.js";

export default async (client: Client) => {
    const THRESHOLD_MIN = global.config.backup_request.delete_after_minutes;
    const threshold = () => dayjs().subtract(THRESHOLD_MIN, 'minutes');

    if (global.config.backup_request.channel_id.length === 0) {
        return; // nop
    }

    const channel: Channel | null = await client.channels.fetch(global.config.backup_request.channel_id);
    if (channel === null) {
        console.warn("Backup request channel does not exist");
        return;
    }
    if (!(channel instanceof BaseGuildTextChannel)) {
        console.warn("Backup request channel is not a text channel");
        return;
    }

    channel.messages.fetch({limit: 100})
        .then((messages) => {
            if (messages.size !== 1) {
                console.info(`Fetched messages from ${channel.name}: ${messages.size}`);
            }
            messages.forEach((message) => {
                if (dayjs(message.createdTimestamp).isBefore(threshold())
                    && global.config.backup_request.ignore_uids.findIndex(x => x === message.author.id) === -1) {
                    message.delete()
                        .then((deletedMessage) => console.log(`Deleted 1 message from ${deletedMessage.channel.name}`))
                        .catch((e) => console.log(e.httpStatus, e.message, e.path));
                }
            });
        })
        .catch((e) => console.log(e.httpStatus, e.message, e.path));
};
