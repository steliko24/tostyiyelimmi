  const Discord = require("discord.js");
  const db = require("quick.db");
  const ayarlar = require("../ayarlar.json");

  exports.run = async (client, message, args) => {
    message.delete()
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)

    if(!botlist) return message.reply("BotList sistemi ayarlanmadı!");
    if(message.channel.id != botlist) return message.reply("Bu komut sadece <#"+botlist+"> kanalında kullanıla bilir!");

    let botlari = db.get(`${message.guild.id}.${message.author.id}.botsayisi`)
    db.add(`${message.guild.id}.botlar.sira`, 1)
    let sira = db.get(`${message.guild.id}.botlar.sira`)
    if(!botlari){
      db.set(`${message.guild.id}.${message.author.id}.botsayisi`, 0)
      botlari=0
    }
    if(botlari < 3){

      if(!args[0]) return message.reply("Bir id belirt!").then(s => s.delete({timeout: 5000}));
      if(!args[1]) return message.reply("Bir prefix belirt!").then(s => s.delete({timeout: 5000}));
      if(!args[2]) return message.reply("Bir DBL durumu belirt!").then(s => s.delete({timeout: 5000}));
      if(!args[3]) return message.reply("Botun hakkında bilgi belirt! Örneğin : `moderasyon, herkesi banla komutu yoktur`").then(s => s.delete({timeout: 5000}));
      let bottag = await client.users.fetch(args[0]).catch(() => {return message.channel.send('Discordda böyle bir kullanıcı bulunmuyor!').then(s => s.delete({timeout:5000}))})
      if(!bottag.bot) return message.channel.send('Discordda böyle bir bot bulunmuyor!').then(s => s.delete({timeout:5000}));
      if(db.get(`${message.guild.id}.${message.author.id}.durum`)){
        if(db.get(`${message.guild.id}.${message.author.id}.durum`) == "yasaklı") return message.reply("Bu sunucudan 1 kere çıktığınız için karalisteye eklendiniz.Bu durumu yetkililere belirterek karalisteden çıka bilirsiniz!").then(s => s.delete({timeout: 5000}));
      } 
      let ozgecmis = db.get(`${message.guild.id}.botlar.${args[0]}`)
      if(ozgecmis){
        if(ozgecmis=="onaylandi"){
          return message.reply("Bu bot zaten önceden eklendi ve onaylandı!").then(s => s.delete({timeout: 5000}));
        }
        if(ozgecmis=="reddedildi"){
          return message.reply("Bu bot önceden eklendi ama reddedildi! Tekrar eklemek için durumu reddeden yetkiliye belirt!").then(s => s.delete({timeout: 5000}));
        }
      }
      if(db.get(`${message.guild.id}.${message.author.id}.botlar`)){
        db.get(`${message.guild.id}.${message.author.id}.botlar`).filter(a => a == args[0]).forEach(bot => {
          return message.reply("Zaten `"+bottag.tag+"` botunu daha önceden ekledin!").then(s => s.delete({timeout: 5000}));
        }) 
      }
      message.reply("<a:loading:810137414055362671> Başvurun belirtildi!").then(s => s.delete({timeout: 5000}));
      message.author.send("<a:loading:810137414055362671> `"+bottag.tag+"` isimli botunuz ile başvurdunuz.Durum yenilendiğinde size belirteceğiz!")
      db.push(`${message.guild.id}.${message.author.id}.botlar`, args[0])
      db.add(`${message.guild.id}.${message.author.id}.botsayisi`, 1)
      message.guild.channels.cache.get(db.get(`${message.guild.id}.kanallar.botlog`)).send(
        new Discord.MessageEmbed()
        .setColor("#0000ff")
        .setDescription(`Başvuran : <@${message.author.id}>\nBaşvuranın idsi : **${message.author.id}**\nBaşvurduğu bot : \`${bottag.tag}\`\nBaşvurduğu bot sayısı : **${botlari+1}**\nTest sırası : **${sira}**\n\n> Bot idsi : ${args[0]}\n> Bot prefixi : ${args[1]}\n> DBL onayı : ${args[2]}\n> Hakkında : \`\`\`${args.slice(3).join(" ")}\`\`\`\n\n[0 Perm](https://discord.com/oauth2/authorize?client_id=${args[0]}&permissions=0&scope=bot) | [8 Perm](https://discord.com/oauth2/authorize?client_id=${args[0]}&permissions=8&scope=bot)`)
        .setTitle(`Bot başvurusu!`)
        .setImage("")
        .setAuthor(client.user.username, client.user.avatarURL())
        .setFooter(client.user.username, client.user.avatarURL())
      )
      db.set(`${message.guild.id}.botunsahibi.${args[0]}`, message.author.id)
    } else {
      message.reply("En fazla 3 bot ekleye bilirsin.Daha fazla eklemek için top.ggden bana oy ver.").then(s => s.delete({timeout: 5000}));
    }
  };
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["add-bot","botekle","bot-əlavə-et","добавить-бота"],
    permLevel: 0
  };

  exports.help = {
    name: "bot-ekle",
    description: "",
    usage: ""
  };
