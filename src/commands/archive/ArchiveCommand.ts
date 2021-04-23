import { Channel, Guild, Message, MessageEmbed, TextChannel } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import archiver from "../../archiver";

export default class CodeCommand extends BaseCommand {
  constructor() {
    super("code", "archive", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    let fetchedMessage: Message;
    let failed: boolean = false;
    await message.channel.messages
      .fetch(args[0])
      .then((fetched) => {
        fetchedMessage = fetched;
      })
      .catch(async (err) => {
        await message.channel
          .send("Message not found")
          .catch((err) => console.log(err));
        failed = true;
      });
    if (failed) {
      return;
    }
    let aId: string = await archiver(client, fetchedMessage);
    let guild: Guild = await client.guilds.fetch("671283498723835914");
    let channel = (await client.channels.fetch(
      "835153318866714674"
    )) as TextChannel;
    let embed = new MessageEmbed()
      .setTitle("Message archived")
      .setDescription(`Archive code: ${aId}`);
    await message.channel.send(embed).catch((err) => console.log(err));
  }
}
