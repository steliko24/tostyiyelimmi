const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(client, message, args) => {
    let botekle = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botekle) return message.delete();
    if (
      !message.member.hasPermission("ADMINISTRATOR") &&
      message.member.roles.has(db.get(`${message.guild.id}.roller.tester`))
    ) {
      return message.channel.send(
        "Bu komutu kullanmak için \`YÖNETİCİ\` yetkisi veya `"+message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.tester`)).name+"` rolüne sahip olmanız gerek!"
      );
    }
    if(!message.mentions.users.first()){
      if(!args[0]){
        return message.reply(new Discord.MessageEmbed().setDescription("Bir botu etiketle veya idsini belirt!")).then(s => s.delete({timeout:5000}))
      } else {
        if(!message.guild.members.cache.get(args[0])) return message.reply(new Discord.MessageEmbed().setDescription("Belirtilen id ile bir bot bu sunucuda bulunamadı!")).then(s => s.delete({timeout:5000}))
        if(!message.guild.members.cache.get(args[0]).user.bot) return message.reply(new Discord.MessageEmbed().setDescription("Belirtilen id ile bir bot bu sunucuda bulunamadı!")).then(s => s.delete({timeout:5000}))
        if(!db.get(`${message.guild.id}.botunsahibi.${args[0]}`)) return message.reply(new Discord.MessageEmbed().setDescription("Belirtilen bot sisteme kaydedilmedi!")).then(s => s.delete({timeout:5000}))
        if(db.get(`${message.guild.id}.botunsahibi.${args[0]}`)) return message.reply(new Discord.MessageEmbed().setDescription("<@"+args[0]+"> isimli botun sahibi <@"+db.get(`${message.guild.id}.botunsahibi.${args[0]}`)+"> olarak bulundu!"))
      }
    } else {
        if(!message.guild.members.cache.get(message.mentions.users.first().id)) return message.reply(new Discord.MessageEmbed().setDescription("Belirtilen id ile bir bot bu sunucuda bulunamadı!")).then(s => s.delete({timeout:5000}))
        if(!message.guild.members.cache.get(message.mentions.users.first().id).user.bot) return message.reply(new Discord.MessageEmbed().setDescription("Belirtilen id ile bir bot bu sunucuda bulunamadı!")).then(s => s.delete({timeout:5000}))
        if(!db.get(`${message.guild.id}.botunsahibi.${message.mentions.users.first().id}`)) return message.reply(new Discord.MessageEmbed().setDescription("Belirtilen bot sisteme kaydedilmedi!")).then(s => s.delete({timeout:5000}))
        if(db.get(`${message.guild.id}.botunsahibi.${message.mentions.users.first().id}`)) return message.reply(new Discord.MessageEmbed().setDescription("<@"+message.mentions.users.first().id+"> isimli botun sahibi <@"+db.get(`${message.guild.id}.botunsahibi.${message.mentions.users.first().id}`)+"> olarak bulundu!"))
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = { 
  name: 'botunsahibi', 
  description: '',
  usage: '',
};