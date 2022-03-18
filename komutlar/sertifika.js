  const Discord = require("discord.js");
  const db = require("quick.db");
  const ayarlar = require("../ayarlar.json");

  exports.run = async (client, message, args) => {
    message.delete()
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)

    if(!botlist) return message.reply("BotList sistemi ayarlanmadı!");
    if(message.channel.id != botlist) return message.reply("Bu komut sadece <#"+botlist+"> kanalında kullanıla bilir!");

    let botlari = db.get(`${message.guild.id}.${message.author.id}.botsayisi`)
    db.add(`${message.guild.id}.botlar.sira`, 1)
    let sira = db.get(`${message.guild.id}.botlar.sira`)
    if(!args[0]) return message.reply("Bot idsi belirt!").then(s => s.delete({timeout: 5000}));
    let bottag = client.users.fetch(args[0]).catch(() => {return message.channel.send('Belirtilen bot bulunamadı!')})
    let test = 0;
    if(db.get(`${message.guild.id}.${message.author.id}.botlar`)){
      db.get(`${message.guild.id}.${message.author.id}.botlar`).filter(a => a == args[0]).forEach(bot => {
        test=1
      })
    }
    if(test!=1) return message.reply("Bu botu önce botekle komutu ile başvurman gerek!").then(s => s.delete({timeout: 5000}));
    if(db.get(`${message.guild.id}.${message.author.id}.sertifikaistek`)) return message.reply("Bir sertifika isteğinde bulundun zaten.").then(s => s.delete({timeout: 5000}));
    db.set(`${message.guild.id}.${message.author.id}.sertifikaistek`, true)
    message.reply("<a:yes_tick:810137273055969280> Başvurun belirtildi!").then(s => s.delete({timeout: 5000}));
    message.author.send("<a:yes_tick:810137273055969280>`"+bottag.tag+"` isimli botunuz ile **__sertifika__** için başvurdunuz.Durum yenilendiğinde size belirteceğiz!")
    message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).send(
      new Discord.MessageEmbed()
      .setColor("#00ffff")
      .setDescription(`Başvuran : <@${message.author.id}>\nBaşvuranın idsi : **${message.author.id}**\nBaşvurduğu bot : \`${bottag.tag}\`\nBot idsi : **${args[0]}**\nBaşvurduğu bot sayısı : **${botlari+1}**\nTest sırası : **${sira}**\n\n[0 Perm](https://discord.com/oauth2/authorize?client_id=${args[0]}&permissions=0&scope=bot) | [8 Perm](https://discord.com/oauth2/authorize?client_id=${args[0]}&permissions=8&scope=bot)`)
      .setTitle(`Sertifika başvurusu!`)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setFooter(client.user.username, client.user.avatarURL())
    )
  };
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sertifikat","certificate","свидетельство"],
    permLevel: 0
  };

  exports.help = {
    name: "sertifika",
    description: "",
    usage: ""
  };
