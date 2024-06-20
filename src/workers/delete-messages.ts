import dayjs from "dayjs";
import {Client} from "../types/client";
import {BaseGuildTextChannel, Channel, ChannelType} from "discord.js";

const THRESHOLD_MIN = Number.parseInt(process.env.BACKUP_REQUEST_AUTO_DELETE_AFTER_MIN);
const threshold = () => dayjs().subtract(THRESHOLD_MIN, 'minutes');
const dynoUid = process.env.DYNO_USER_ID;

export default async (client: Client) => {
    const channel: Channel | null = await client.channels.fetch(process.env.BACKUP_REQUEST_CHANNEL);
    if (channel === null) {
        console.warn("Backup request channel does not exist");
        return;
    }
    if (!(channel instanceof BaseGuildTextChannel)) {
        console.warn("Backup request channel is not a text channel");
        return;
    }

    channel.messages.fetch({ limit: 100 })
        .then((messages) => {
            if (messages.size !== 1) {
                console.info(`Fetched messages from ${channel.name}: ${messages.size}`);
            }
            messages.forEach((message) => {
                if (dayjs(message.createdTimestamp).isBefore(threshold()) && message.author.id !== dynoUid) {
                    message.delete()
                        .then((deletedMessage) => console.log(`Deleted 1 message from ${deletedMessage.channel.name}`))
                        .catch((e) => console.log(e.httpStatus, e.message, e.path));
                }
            });
        })
        .catch((e) => console.log(e.httpStatus, e.message, e.path));
};
