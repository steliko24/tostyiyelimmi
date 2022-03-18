const Discord = require("discord.js"),
client = new Discord.Client();
const ayarlar = require('../ayarlar.json')

exports.run = async(yashinu, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES") && message.author.id != ayarlar.sahip) return message.reply(`Bu komutu kullanabilmek için "MESAJLARI YÖNET" iznine sahip olmalısın!`).then(s => s.delete({timeout:5000}));
  if (!args[0] || isNaN(args[0])) return message.reply(`Temizlenecek mesaj miktarını belirtmelisin! (İstediğin kadar)`);
  await message.delete();
  let sayi = Number(args[0]);
  let silinen = 0;
  for (var i = 0; i < (Math.floor(sayi/100)); i++) {
    await message.channel.bulkDelete(100).then(r => silinen+=r.size);
    sayi = sayi-100;
  };
  if (sayi > 0) await message.channel.bulkDelete(sayi).then(r => silinen+=r.size);
  message.reply(`**${silinen}** adet mesaj silindi!`).then(s => s.delete({ timeout: 5000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["",""],
  permLevel: 0
};

exports.help = {
  name: "",
  description: "",
  usage: ""
};