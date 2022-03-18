const Discord = require('discord.js'); 
const db = require("quick.db")
const moment = require('moment')
moment.locale('tr')
exports.run = (codeming, message, args) => {
    message.delete()
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botlist) return;
if(!message.mentions.users.first()){
    let botlar = db.get(`${message.guild.id}.${message.author.id}.botlar`)
    let botlar2;
    if(!botlar){
      botlar2="Bir bot eklenmedi"
    } else {
      botlar2=botlar.join(" ")
    }
    let cce = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(codeming.user.username, codeming.user.avatarURL({dynamic: true}))
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .setFooter(`${message.author.tag}'ın kullanıcı bilgileri.`)
    .setTimestamp()
    .addField(`Kullanıcının botlarının idleri`,"`"+botlar2+"`")
    .addField("Tarihler", `Hesap oluşturulma tarihi: **${moment(message.author.createdAt).format("DD.MM.YYYY")}** \nSunucuya katılım tarihi: **${moment(message.author.joinedAt).format("DD.MM.YYYY")}**`)
    .addField("Genel bilgiler", `Sunucudaki rolleri: ${message.guild.members.cache.get(message.author.id).roles.cache.map(r => r).join(' **|** ') || "**Bu kullanıcıda hiçbir rol bulunmuyor**"}`)
    message.channel.send(cce)
} else {
    let uye = message.mentions.users.first()
    let botlar = db.get(`${message.guild.id}.${uye.id}.botlar`)
    let botlar2;
    if(!botlar){
      botlar2="Bir bot eklenmedi"
    } else {
      botlar2=botlar.join(" ")
    }
    let cce = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(codeming.user.username, codeming.user.avatarURL({dynamic: true}))
    .setThumbnail(uye.avatarURL({dynamic: true}))
    .setFooter(`${uye.tag}'ın kullanıcı bilgileri.`)
    .setTimestamp()
    .addField(`Kullanıcının botlarının idleri`,"`"+botlar2+"`")
    .addField("Tarihler", `Hesap oluşturulma tarihi: **${moment(uye.createdAt).format("DD.MM.YYYY")}** \nSunucuya katılım tarihi: **${moment(uye.joinedAt).format("DD.MM.YYYY")}**`)
    .addField("Genel bilgiler", `Sunucudaki rolleri: ${message.guild.members.cache.get(uye.id).roles.cache.map(r => r).join(' **|** ') || "**Bu kullanıcıda hiçbir rol bulunmuyor**"}`)
    message.channel.send(cce)
}
  
};

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ["","",""], 
  permLevel: 0 
};

exports.help = {
  name: ''
};