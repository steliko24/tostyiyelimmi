const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

exports.run = async(yashinu, message, args) => {
    message.delete()
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botlist) return;
    if (message.author.id != message.guild.owner && !message.member.hasPermission("ADMINISTRATOR") && message.author.id != ayarlar.sahip) {
      const embed = new Discord.MessageEmbed()
      .setDescription("**Ne yazık ki bu komutu kullanamazsın.**")
      .setColor("BLACK");
      message.channel.send(embed);
      return;
    }
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**Onaylıyor musunuz? Bunu yaparsan BotList sistemi tamamen sıfırlanır!**`)
  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["✅"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
        if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.boteklemekural`))) {message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.boteklemekural`)).delete() }
        if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`))) {message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).delete() }
        if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botekle`))) {message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botekle`)).delete() }
        if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.kategori`))) {message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.kategori`)).delete() }
        if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.bottest`))) {message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.bottest`)).delete() }
        if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.bottestnsfw`))) {message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.bottestnsfw`)).delete() }
        if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.bottestsesli`))) {message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.bottestsesli`)).delete() }
        if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botonayred`))) {message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botonayred`)).delete() }
        if(message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.botrol`))) {message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.botrol`)).delete() }
        if(message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.sertfikali`))) {message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.sertfikali`)).delete() }
        if(message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.tester`))) {message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.tester`)).delete() }
        db.delete(`${message.guild.id}`)
        message.reply("Sistem başarılı şekilde sıfırlandı!")
      }
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: "",
  description: "",
  usage: ""
};
