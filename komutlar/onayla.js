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
    let bottag = await client.users.fetch(args[0]).catch(() => {return message.channel.send('Belirtilen bot bulunamadı!')})
    if(!message.guild.members.cache.get(args[1])) return message.reply("Belirtilen üye bulunamadı!");
    let ozgecmis = db.get(`${message.guild.id}.botlar.${args[0]}`)
    if(ozgecmis){
      if(ozgecmis=="onaylandi"){
        return message.reply("Bu bot önceden onaylandı!");
      }
      if(ozgecmis=="reddedildi"){
        return message.reply("Bu bot önceden reddedildi!");
      }
    }
    db.add(`${message.guild.id}.botlar.sira`, -1)
    let sira = db.get(`${message.guild.id}.botlar.sira`)
    db.add(`${message.guild.id}.botlar.onaylanan`, 1)
    db.add(`${message.guild.id}.${message.author.id}.islem`, 1)
    let toplam = db.get(`${message.guild.id}.${message.author.id}.islem`)
    message.guild.members.cache.get(args[1]).send(new Discord.MessageEmbed().setColor("#00ff00").setDescription("`"+bottag.tag+"` isimli botunuz "+message.author.tag+" tarafından onaylandı.İyi günler :)"))
    message.channel.send("<a:yes_tick:810137273055969280> Bot onaylandı!")
    message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).send("<@"+args[1]+">")
    message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).send(
      new Discord.MessageEmbed()
      .setDescription(`<@${args[1]}> isimli kullanıcının \`${bottag.tag}\` isimli botu **onaylandı**.\n\nOnaylayan kişi : <@${message.author.id}>\nOnaylayan yetkilinin toplam işlemi : **${toplam}**\nSırada olan bot sayısı : **${sira}**`)
      .setColor("#00ff00")
      .setTitle(`Bot onaylanması!`)
      .setImage("")
      .setAuthor(client.user.username, client.user.avatarURL())
      .setFooter(client.user.username, client.user.avatarURL())
    )    
    db.set(`${message.guild.id}.botlar.${args[0]}`, "onaylandi") 
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["təsdiqlə","утвердить","approve"],
  permLevel: 0
};

exports.help = {
  name: "onayla",
  description: "TexnoCode",
  usage: "prefix"
};