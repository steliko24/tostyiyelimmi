 const db = require("quick.db");
 const {prefix} = require('../ayarlar.json')

exports.run = async (client, message, args) => {
    message.delete()
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botlist) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Prefix'i değiştirmeniz için \`YÖNETİCİ\` yetkiniz olması lazım!"
      );
    }

    if (args[0] == "sifirla" || args[0] == "sıfırla") {
      db.delete(`prefix_${message.guild.id}`);
      return message.channel.send("Prefix sıfırlandı!");
    }

    if (!args[0]) {
      return message.channel.send("Lütfen bir prefix giriniz");
    }

    if (args[1]) {
      return message.channel.send("İkinci bir prefix yapamazsın!");
    }

    if (args[0].length > 3) {
      return message.channel.send("3 karakterden uzun bir prefix yapamazsın!");
    }

    db.set(`prefix_${message.guild.id}`, args[0]);
    await message.channel.send(`Bot prefixi değiştirildi. Yeni prefix: \`${args[0]}\``);
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["prefix"],
  permLevel: 0
};

exports.help = {
  name: "",
  description: "D1",
  usage: ""
};