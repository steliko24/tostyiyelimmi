const db = require("quick.db");
const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botlist) return message.delete();
    message.reply(
      new Discord.MessageEmbed()
      .setAuthor("Davet etmek için tıkla", client.user.avatarURL(),)
      .setTitle("Destek sunucumuz!")
      .setURL("https://discord.gg/ZyQxat8WVh")
      .setThumbnail(client.user.avatarURL())
    )
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "",
  description: "",
  usage: ""
};