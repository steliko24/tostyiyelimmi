const Discord = require('discord.js');
const db = require("quick.db");
const {prefix} = require('../ayarlar.json')

exports.run = async (client, message, args) => {
    message.delete()
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botlist) return;

    let botekle;
    let boteklesart;
    let boteklelog;
    let botlar;
    let sertfika;
    let tester;
    if(db.get(`${message.guild.id}.kanallar.boteklemekural`)){boteklesart=`<#${db.get(`${message.guild.id}.kanallar.boteklemekural`)}> <:tvacik:822432625397858346>`} else {boteklesart=`\`Ayarlanmadı\` <:tvkapali:822432622264713237>`}
    if(db.get(`${message.guild.id}.kanallar.botlog`)){boteklelog=`<#${db.get(`${message.guild.id}.kanallar.botlog`)}> <:tvacik:822432625397858346>`} else {boteklelog=`\`Ayarlanmadı\` <:tvkapali:822432622264713237>`}
    if(db.get(`${message.guild.id}.kanallar.botekle`)){botekle=`<#${db.get(`${message.guild.id}.kanallar.botekle`)}> <:tvacik:822432625397858346>`} else {botekle=`\`Ayarlanmadı\` <:tvkapali:822432622264713237>`}
    if(db.get(`${message.guild.id}.roller.botrol`)){botlar=`<@&${db.get(`${message.guild.id}.roller.botrol`)}> <:tvacik:822432625397858346>`} else {botlar=`\`Ayarlanmadı\` <:tvkapali:822432622264713237>`}
    if(db.get(`${message.guild.id}.roller.sertfikali`)){sertfika=`<@&${db.get(`${message.guild.id}.roller.sertfikali`)}> <:tvacik:822432625397858346>`} else {sertfika=`\`Ayarlanmadı\` <:tvkapali:822432622264713237>`}
    if(db.get(`${message.guild.id}.roller.tester`)){tester=`<@&${db.get(`${message.guild.id}.roller.tester`)}> <:tvacik:822432625397858346>`} else {tester=`\`Ayarlanmadı\` <:tvkapali:822432622264713237>`}
    const ayarlar = new Discord.MessageEmbed()
    .setDescription(`
Bot ekle kanalı : **${botekle}**
Bot ekleme kuralları kanalı : **${boteklesart}**
Bot ekle log kanalı : **${boteklelog}**
Botlar rolü : **${botlar}**
Sertifikalı bot sahibi rolü : **${sertfika}**
Bot Tester rolü : **${tester}**
`)
    .setAuthor(client.user.username, client.user.avatarURL())
    .setFooter(client.user.username, client.user.avatarURL())
    message.channel.send(ayarlar)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "ayarlar",
  description: "",
  usage: ""
};