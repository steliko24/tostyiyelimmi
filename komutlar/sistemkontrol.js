const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(client, message, args) => {
    message.delete()
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botlist) return;
  if(message.author.id !== message.guild.ownerID) return message.reply("Bu komutu sadece sunucu sahibi kullana bilir!");
    message.channel.send("Dmni kontrol et!")
  try {
    message.guild.owner.send(JSON.stringify(db.get(message.guild.id)), {code: "js", split: true});
  } catch(err) {
    try {
      message.channel.send(err, {code: "xl", split: true});
    } catch(err) {
      message.channel.send("Hatayı atarken hata verdi wtf");
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = { 
  name: '', 
  description: '',
  usage: '',
};