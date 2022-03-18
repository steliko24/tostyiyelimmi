 const db = require("quick.db");
 const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    message.delete()
    let botekel = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botekel) return
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
    if(!args[0]) return message.reply("Reddedeceğin botun idsini belirt!");
    if(!args[1]) return message.reply("Reddedeceğin botun sahibinin idsini belirt!");
    if(!args[2]) return message.reply("Reddedilme sebebini belirt!") 
    let bottag = await client.users.fetch(args[0]).catch(() => {return message.channel.send('Belirtilen bot bulunamadı!')})
    if(!message.guild.members.cache.get(args[1])) return message.reply("Belirtilen üye bulunamadı!");
    let sebeb = args.slice(2).join(" ")
    db.add(`${message.guild.id}.botlar.sira`, -1)
    let sira = db.get(`${message.guild.id}.botlar.sira`)
    db.add(`${message.guild.id}.botlar.reddedilen`, 1)
    db.add(`${message.guild.id}.${message.author.id}.islem`, 1)
    let toplam = db.get(`${message.guild.id}.${message.author.id}.islem`)
    message.channel.send("<a:no_tick:810137272979685377> Bot Reddedildi!")
    message.guild.members.cache.get(args[1]).send(new Discord.MessageEmbed().setColor("#ffaaaa").setDescription("`"+bottag.tag+"` isimli botunuzun sertifika isteği "+message.author.tag+" tarafından `"+sebeb+"` sebebi ile reddedildi."))
    message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).send("<@"+args[1]+">")
    message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).send(
      new Discord.MessageEmbed()
      .setDescription(`<@${args[1]}> isimli kullanıcının \`${bottag.tag}\` isimli botun **sertifika** isteği **reddedildi**.\nReddedilme sebebi : \`\`\`${sebeb}\`\`\`\n\nReddeden kişi : <@${message.author.id}>\nReddeden yetkilinin toplam işlemi : **${toplam}**\nSırada olan bot sayısı : **${sira}**`)
      .setColor("#ffaaaa")
      .setTitle(`Bot reddedilmesi!`)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setFooter(client.user.username, client.user.avatarURL())
    )    
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sertifikat-rədd-et","certificate-reject","сертификат-отклонить"],
  permLevel: 0
};

exports.help = {
  name: "sertifika-reddet",
  description: "TexnoCode",
  usage: "prefix"
};