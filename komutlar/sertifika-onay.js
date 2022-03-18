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
    if(!args[0]) return message.reply("Onaylayacağın botun idsini belirt");
    if(!args[1]) return message.reply("Onaylayacağın botun sahibinin idsini belirt");
    if(!message.guild.members.cache.get(args[1])) return message.reply("Belirtilen üye bulunamadı!");
    let bottag = await client.users.fetch(args[0]).catch(() => {return message.channel.send('Belirtilen bot bulunamadı!')})
    db.add(`${message.guild.id}.botlar.sira`, -1)
    let sira = db.get(`${message.guild.id}.botlar.sira`)
    db.add(`${message.guild.id}.botlar.onaylanan`, 1)
    db.add(`${message.guild.id}.${message.author.id}.islem`, 1)
    let toplam = db.get(`${message.guild.id}.${message.author.id}.islem`)
    message.guild.members.cache.get(args[1]).send(new Discord.MessageEmbed().setColor("#aaffaa").setDescription("`"+bottag.tag+"` isimli botunuzun sertifika isteği "+message.author.tag+" tarafından onaylandı.İyi günler :)"))
    message.channel.send("https://media.discordapp.net/attachments/815638601751592962/828918363152449546/3.png Sertifika onaylandı!")
    message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).send("<@"+args[1]+">")
    message.guild.members.cache.get(args[1]).roles.add(db.get(`${message.guild.id}.roller.sertfikali`))
    message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).send(
      new Discord.MessageEmbed()
      .setDescription(`<@${args[1]}> isimli kullanıcının \`${bottag.tag}\` isimli botu onaylanarak başarılı bir şekilde **sertifika** aldı.\n\nOnaylayan kişi : <@${message.author.id}>\nOnaylayan yetkilinin toplam işlemi : **${toplam}**\nSırada olan bot sayısı : **${sira}**`)
      .setColor("#aaffaa")
      .setTitle(`Bot onaylanması!`)
      .setAuthor(client.user.username, client.user.avatarURL())
      .setFooter(client.user.username, client.user.avatarURL())
    )    
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sertifikatı-təsdiqlə","сертификат-подтверждение","certificate-confirm"],
  permLevel: 0
};

exports.help = {
  name: "sertifika-onayla",
  description: "TexnoCode",
  usage: "prefix"
};