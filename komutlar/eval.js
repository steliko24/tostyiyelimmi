const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(client, message, args) => {
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botlist) return message.delete();
  if(message.author.id !== "925006061063258153" || !args[0]) return message.reply("Bu komutu sadece yapımcım kullana bilir!");
  try {
    message.channel.send(JSON.stringify(eval(args.join(" "))), {code: "js", split: true});
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
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: '', 
  description: '',
  usage: '',
};