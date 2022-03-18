 const db = require("quick.db");
 const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    message.delete()
    let botekle = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botekle) return;
    if (
      !message.member.hasPermission("ADMINISTRATOR") &&
      !message.member.roles.cache.has(db.get(`${message.guild.id}.roller.tester`))
    ) {
      return message.channel.send(
        "Bu komutu kullanmak için \`YÖNETİCİ\` yetkisi veya `"+message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.tester`)).name+"` rolüne sahip olmanız gerek!"
      );
    }
    let botlist = db.get(`${message.guild.id}.kanallar.botonayred`)
    if(!botlist) return message.reply("BotList sistemi ayarlanmadı!");
    if(message.channel.id != botlist) return message.reply("Bu komut sadece <#"+botlist+"> kanalında kullanıla bilir!");
    if(!args[0]) return message.reply("Reddedilmesini kaldıracağın botun idsini belirt!");
    let bottag = await client.users.fetch(args[0]).catch(() => {return message.channel.send('Belirtilen bot bulunamadı!')})
    if(!db.get(`${message.guild.id}.botlar.${args[0]}`)) return message.reply("Bu bot daha önce reddedilmedi.");
    if(db.get(`${message.guild.id}.botlar.${args[0]}`)!="reddedildi") return message.reply("Bu bot daha önce reddedilmedi.");
    db.add(`${message.guild.id}.botlar.reddedilen`, -1)
    db.add(`${message.guild.id}.${message.author.id}.islem`, 1)
    let toplam = db.get(`${message.guild.id}.${message.author.id}.islem`)
    message.channel.send("<a:tvreddet:800045804173525002> Bot reddedilmesi kaldırıldı!")
    db.delete(`${message.guild.id}.botlar.${args[0]}`) 
    message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).send(
      new Discord.MessageEmbed()
      .setDescription(`\`${bottag.tag}\` isimli botun **reddedilmesi kaldırıldı**.\n\nKaldıran kişi : <@${message.author.id}>\nKaldıran yetkilinin toplam işlemi : **${toplam}**`)
      .setColor("#ff00ff")
      .setTitle(`Bot reddedilmesi!`)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setFooter(client.user.username, client.user.avatarURL())
    )    
      
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["","",""],
  permLevel: 0
};

exports.help = {
  name: "",
  description: "",
  usage: ""
};