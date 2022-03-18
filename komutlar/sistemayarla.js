const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
    message.delete()
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botlist) return;
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  if (message.author.id != message.guild.owner && !message.member.hasPermission("ADMINISTRATOR") && message.author.id != ayarlar.sahip) {
    const embed = new Discord.MessageEmbed()
    .setDescription("**Ne yazık ki bu komutu kullanamazsın.**")
    .setColor("BLACK");
    message.channel.send(embed);
    return;
  }
  let embed = new Discord.MessageEmbed()
  .setDescription("Sistemi ayarlamak için bir sistem türü belirtmen gerek!\nÖrneğin : `"+prefix+"sistem-ayarla botekle #botekle`\n\n> **__Sistemler__ :**\n `log` `botekle` `botonayred` `boteklemekural-mesaj` `botekle-mesaj` `bottestsesli` `bottestnsfw` `bottest` `boteklemekural` `bottester` `botrol` `sertifika`")
  .setColor("#ffff00")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setFooter(client.user.username, client.user.avatarURL())

  let embed2 = new Discord.MessageEmbed()
  .setDescription("Sistemi ayarlamak için bir sistem türü belirtmen gerek!\nÖrneğin : `"+prefix+"sistem-ayarla boteklemekural-mesaj isim `**__`Bot Ekleme Kuralları`__**\n\n> **__Sistemler__ :**\n`mesaj-id` `alt-bilgi` `açıklama` `isim` `renk` `kiçik-resim` `büyük-resim` `altbilgi-resim`")
  .setColor("#000000")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setFooter(client.user.username, client.user.avatarURL())
  let embed3 = new Discord.MessageEmbed()
  .setDescription("Sistemi ayarlamak için bir sistem türü belirtmen gerek!\nÖrneğin : `"+prefix+"sistem-ayarla botekle-mesaj isim `**__`Bot Ekleme Kanalı`__**\n\n> **__Sistemler__ :**\n`mesaj-id` `alt-bilgi` `açıklama` `isim` `renk` `kiçik-resim` `büyük-resim` `altbilgi-resim`")
  .setColor("#000000")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setFooter(client.user.username, client.user.avatarURL())
  switch(args[0]){
    default:
      message.reply(embed)
      break;
    case "log":
    case "logkanal":
    case "log-kanal":
    case "botlog":
    case "bot-log":
    case "bot-log-kanal":
    case "boteklelog":
    case "boteklelogkanal":
    case "botekle-log-kanal":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.kanallar.botlog`)){
              db.delete(`${message.guild.id}.kanallar.botlog`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.kanallar.botlog`)){
            return message.reply("Bu kanal zaten önceden <#"+db.get(`${message.guild.id}.kanallar.botlog`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla botlog sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.channels.first()) return message.reply("Kanalı ayarlamam için bir kanal etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.kanallar.botlog`, message.mentions.channels.first().id)
      break;
    case "botekle":
    case "boteklekanal":
    case "botekle-kanal":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.kanallar.botekle`)){
              db.delete(`${message.guild.id}.kanallar.botekle`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.kanallar.botekle`)){
            return message.reply("Bu kanal zaten önceden <#"+db.get(`${message.guild.id}.kanallar.botekle`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla botekle sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.channels.first()) return message.reply("Kanalı ayarlamam için bir kanal etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.kanallar.botekle`, message.mentions.channels.first().id)
      break;
    case "botonayred":
    case "bot-onay-red":
    case "bot-onayla-reddet":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.kanallar.botonayred`)){
              db.delete(`${message.guild.id}.kanallar.botonayred`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.kanallar.botonayred`)){
            return message.reply("Bu kanal zaten önceden <#"+db.get(`${message.guild.id}.kanallar.botonayred`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla botonayred sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.channels.first()) return message.reply("Kanalı ayarlamam için bir kanal etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.kanallar.botonayred`, message.mentions.channels.first().id)
      break;
    case "bottestsesli":
    case "bot-test-sesli":
    case "bottest-sesli":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.kanallar.bottestsesli`)){
              db.delete(`${message.guild.id}.kanallar.bottestsesli`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.kanallar.bottestsesli`)){
            return message.reply("Bu kanal zaten önceden <#"+db.get(`${message.guild.id}.kanallar.bottestsesli`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla bottestsesli sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.channels.first()) return message.reply("Kanalı ayarlamam için bir kanal etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.kanallar.bottestsesli`, message.mentions.channels.first().id)
      break;
    case "bottestnsfw":
    case "bot-test-nsfw":
    case "bottest-nsfw":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.kanallar.bottestnsfw`)){
              db.delete(`${message.guild.id}.kanallar.bottestnsfw`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.kanallar.bottestnsfw`)){
            return message.reply("Bu kanal zaten önceden <#"+db.get(`${message.guild.id}.kanallar.bottestnsfw`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla bottestnsfw sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.channels.first()) return message.reply("Kanalı ayarlamam için bir kanal etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.kanallar.bottestnsfw`, message.mentions.channels.first().id)
      break;
    case "bottest":
    case "bot-test":
    case "bottest":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.kanallar.bottest`)){
              db.delete(`${message.guild.id}.kanallar.bottest`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.kanallar.bottest`)){
            return message.reply("Bu kanal zaten önceden <#"+db.get(`${message.guild.id}.kanallar.bottest`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla bottest sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.channels.first()) return message.reply("Kanalı ayarlamam için bir kanal etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.kanallar.bottest`, message.mentions.channels.first().id)
      break;
    case "boteklemekural":
    case "bot-ekleme-kural":
    case "botekleme-kural":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.kanallar.boteklemekural`)){
              db.delete(`${message.guild.id}.kanallar.boteklemekural`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.kanallar.boteklemekural`)){
            return message.reply("Bu kanal zaten önceden <#"+db.get(`${message.guild.id}.kanallar.boteklemekural`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla boteklemekural sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.channels.first()) return message.reply("Kanalı ayarlamam için bir kanal etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.kanallar.boteklemekural`, message.mentions.channels.first().id)
      break;
    case "bottester":
    case "bot-tester":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.roller.tester`)){
              db.delete(`${message.guild.id}.roller.tester`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.roller.tester`)){
            return message.reply("Bu rol zaten önceden <@&"+db.get(`${message.guild.id}.roller.tester`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla boteklemekural sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.roles.first()) return message.reply("Kanalı ayarlamam için bir rol etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.roller.tester`, message.mentions.roles.first().id)
      break;
    case "botrol":
    case "bot-rol":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.roller.botrol`)){
              db.delete(`${message.guild.id}.roller.botrol`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.roller.botrol`)){
            return message.reply("Bu rol zaten önceden <@&"+db.get(`${message.guild.id}.roller.botrol`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla boteklemekural sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.roles.first()) return message.reply("Kanalı ayarlamam için bir rol etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.roller.botrol`, message.mentions.roles.first().id)
      break;
    case "sertifika":
    case "sertifika-rol":
          if(args[1]=="sıfırla" || args[1]=="sifirla" || args[1]=="reset"){
            if(db.get(`${message.guild.id}.roller.sertfikali`)){
              db.delete(`${message.guild.id}.roller.sertfikali`)
              return message.reply("Sistem başarılı bir şekilde sıfırlandı!")
            } else {
              return message.reply("Sistem zaten ayarlanmadı!")
            }
          }
          if(db.get(`${message.guild.id}.roller.sertfikali`)){
            return message.reply("Bu rol zaten önceden <@&"+db.get(`${message.guild.id}.roller.sertfikali`)+"> olarak ayarlandı! Sıfırlamak için `"+prefix+"sistem-ayarla boteklemekural sıfırla`").then(s => s.delete({timeout:5000}))
          }
          if(!message.mentions.roles.first()) return message.reply("Kanalı ayarlamam için bir rol etiketlemen gerek!").then(s => s.delete({timeout:5000}))
          message.reply("Sistem başarılı bir şekilde ayarlandı!")
          db.set(`${message.guild.id}.roller.sertfikali`, message.mentions.roles.first().id)
      break;
    case "boteklemekural-mesaj":
      switch(args[1]){
        default:
          message.reply(embed2)
          break;
        case "mesaj-id":
          if(!args[2]) return message.reply("Lütfen bir id belirt!")
          if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.boteklemekural`))){
            if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.boteklemekural`)).messages.cache.fetch(args[2])){
                db.set(`${message.guild.id}.mesajlar.botkuralmesaj`, args[2])
                return message.reply("Sistem başarılı bir şekilde ayarlandı!");
            } else {
              return message.reply("Bot ekleme kurallar kanalında bu idye sahip mesaj bulunamadı!")
            }
          } else {
            return message.reply("Bot ekleme kurallar kanalı bulunamadı!")
          }
          break;
        case "alt-bilgi":
          if(!args[2]) return message.reply("Lütfen bir alt-bilgi belirt!")
          break;
        case "açıklama":
          if(!args[2]) return message.reply("Lütfen bir açıklama belirt!")
          break;
        case "isim":
          if(!args[2]) return message.reply("Lütfen bir isim belirt!")
          break;
        case "renk":
          if(!(/^#[0-9A-F]{6}$/i.test(args[2]))) return message.reply('Bu bir hex code değil.');
          break;
        case "kiçik-resim":
          if(!args[2] || !args[2].startsWith("https://") || !args[2].startsWith("http://") || !args[2].endsWith(".gif") || !args[2].endsWith(".png") || !args[2].endsWith(".PNG") || !args[2].endsWith(".jpg")){
            return message.reply("Lüften bir resim linki belirtiniz! Linkin sonunun `.gif .png .jpg` gibi formatlarda bittiğinden emin olun!")
          }
          break;
        case "büyük-resim":
          if(!args[2] || !args[2].startsWith("https://") || !args[2].startsWith("http://") || !args[2].endsWith(".gif") || !args[2].endsWith(".png") || !args[2].endsWith(".PNG") || !args[2].endsWith(".jpg")){
            return message.reply("Lüften bir resim linki belirtiniz! Linkin sonunun `.gif .png .jpg` gibi formatlarda bittiğinden emin olun!")
          }
          break;
        case "altbilgi-resim":
          if(!args[2] || !args[2].startsWith("https://") || !args[2].startsWith("http://") || !args[2].endsWith(".gif") || !args[2].endsWith(".png") || !args[2].endsWith(".PNG") || !args[2].endsWith(".jpg")){
            return message.reply("Lüften bir resim linki belirtiniz! Linkin sonunun `.gif .png .jpg` gibi formatlarda bittiğinden emin olun!")
          }
          break;
      }
      break;
    case "botekle-mesaj":
      switch(args[1]){
        default:
          message.reply(embed3)
          break;
        case "mesaj-id":
          if(!args[2]) return message.reply("Lütfen bir id belirt!")
          if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botekle`))){
            if(message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botekle`)).messages.cache.fetch(args[2])){
                db.set(`${message.guild.id}.mesajlar.boteklemesaj`, args[2])
                return message.reply("Sistem başarılı bir şekilde ayarlandı!");
            } else {
              return message.reply("Botekle kanalında bu idye sahip mesaj bulunamadı!")
            }
          } else {
            return message.reply("Botekle kanalı bulunamadı!")
          }
          break;
        case "alt-bilgi":
          if(!args[2]) return message.reply("Lütfen bir alt-bilgi belirt!")
          break;
        case "açıklama":
          if(!args[2]) return message.reply("Lütfen bir açıklama belirt!")
          break;
        case "isim":
          if(!args[2]) return message.reply("Lütfen bir isim belirt!")
          break;
        case "renk":
          if(!(/^#[0-9A-F]{6}$/i.test(args[2]))) return message.reply('Bu bir hex code değil.');
          break;
        case "kiçik-resim":
          if(!args[2] || !args[2].startsWith("https://") || !args[2].startsWith("http://") || !args[2].endsWith(".gif") || !args[2].endsWith(".png") || !args[2].endsWith(".PNG") || !args[2].endsWith(".jpg")){
            return message.reply("Lüften bir resim linki belirtiniz! Linkin sonunun `.gif .png .jpg` gibi formatlarda bittiğinden emin olun!")
          }
          break;
        case "büyük-resim":
          if(!args[2] || !args[2].startsWith("https://") || !args[2].startsWith("http://") || !args[2].endsWith(".gif") || !args[2].endsWith(".png") || !args[2].endsWith(".PNG") || !args[2].endsWith(".jpg")){
            return message.reply("Lüften bir resim linki belirtiniz! Linkin sonunun `.gif .png .jpg` gibi formatlarda bittiğinden emin olun!")
          }
          break;
        case "altbilgi-resim":
          if(!args[2] || !args[2].startsWith("https://") || !args[2].startsWith("http://") || !args[2].endsWith(".gif") || !args[2].endsWith(".png") || !args[2].endsWith(".PNG") || !args[2].endsWith(".jpg")){
            return message.reply("Lüften bir resim linki belirtiniz! Linkin sonunun `.gif .png .jpg` gibi formatlarda bittiğinden emin olun!")
          }
          break;
      }
      break;
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "sistem-ayarla",
  description: "",
  usage: ""
};
