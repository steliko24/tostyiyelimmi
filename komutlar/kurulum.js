const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (bot, message, args, client) => {
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
  let botlistsistemi = db.get(`${message.guild.id}.kanallar`)
  if(botlistsistemi){
      message.reply("BotList sistemi zaten oluşturuldu! `"+prefix+"ayarlar` yazarak ayarlara baka bilirsiniz!")
      return;
  }

  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**BotList kurulumunu onaylıyor musunuz?**`)
    .setFooter(bot.user.username, bot.user.avatarURL());
  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["✅"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter);
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
        sentEmbed.delete()
        message.channel.send(
          `<a:tvkabuledildi:822426530016919562> **İşlem onaylandı! BotList kanalları kuruluyor! Eğer mesajları düzenlemek isterseniz \`${prefix}sistem-ayarla\`**`//, Mesajlar silinirse \`${prefix}embedli-yazı\`
        );
        message.guild.roles.create({data: {
          name: "Botlar",
          color: "#00ddff",
          permissions: [],
          reason: 'Botlist 0 Permli Botlar'
        }}).then(a => {
          db.set(`${message.guild.id}.roller.botrol`, a.id)
        })
        message.guild.roles.create({data: {
          name: "Sertfikalı Bot Sahibi",
          color: "#73fc03",
          permissions: [],
          reason: 'Sertfikalı Bot Sahibi'
        }}).then(a => {
          db.set(`${message.guild.id}.roller.sertfikali`, a.id)
        })
        message.guild.roles.create({data: {
          name: "Bot Tester",
          color: "#9f35s3",
          permissions: [],
          reason: 'Bot Tester'
        }}).then(a => {
          db.set(`${message.guild.id}.roller.tester`, a.id)
        })
        if (!message.guild.channels.cache.find(c => c.name === "▬▬▬「 BotList 」▬▬▬")) {
          await message.guild.channels.create("▬▬▬「 BotList 」▬▬▬", { type: "category" }).then(a => {
            a.setPosition('0');
            db.set(`${message.guild.id}.kanallar.kategori`, a.id)
          }
        )}
        message.guild.channels.create("bot-log", {type: "text"}).then(a => {
          a.setParent(message.guild.channels.cache.find(b => b.name === '▬▬▬「 BotList 」▬▬▬').id)
          db.set(`${message.guild.id}.kanallar.botlog`, a.id)
          a.createOverwrite(message.guild.roles.cache.find(a => a.name === "@everyone"),{SEND_MESSAGES: false,VIEW_CHANNEL: true,READ_MESSAGE_HISTORY: true})
          a.createOverwrite(message.guild.roles.cache.find(a => a.name === "@everyone").id,{SEND_MESSAGES: false,VIEW_CHANNEL: true,READ_MESSAGE_HISTORY: true})
        })
        message.guild.channels.create("bot-ekleme-kurallari", {type: "text"}).then(a => {
          a.setParent(message.guild.channels.cache.find(b => b.name === '▬▬▬「 BotList 」▬▬▬').id)
          db.set(`${message.guild.id}.kanallar.boteklemekural`, a.id)
          a.createOverwrite(message.guild.roles.cache.find(a => a.name === "@everyone"),{SEND_MESSAGES: false,VIEW_CHANNEL: true,READ_MESSAGE_HISTORY: true})
          a.createOverwrite(message.guild.roles.cache.find(a => a.name === "@everyone").id,{SEND_MESSAGES: false,VIEW_CHANNEL: true,READ_MESSAGE_HISTORY: true})
          a.send(new Discord.MessageEmbed()
          .setTitle("Bot Ekleme Kuralları").setImage("https://cdn.discordapp.com/attachments/815638601751592962/828668360182202428/350kb.gif")
          .setAuthor(client.user.username, client.user.avatarURL(), "https://discord.com/oauth2/authorize?client_id=828580799980765184&permissions=8&scope=bot")
          .setFooter(message.guild.name, message.guild.iconURL())
          .setThumbnail(message.guild.iconURL())
          .setDescription(`
            <a:tbldeveloper:828629948184264704> **▬▬▬「 Bot eklemek için gerekenler 」▬▬▬** <a:tbldeveloper:828629948184264704>
            
            > Botunuz 10-dan fazla sunucuda bulunmalı!
            > Botunuz 10.000-den fazla üyeye hizmet vermeli!
            > Botunuzda 15-den fazla komut bulunmalı!
            > Sa-as gibi komutlar ayarlanmalı olmalı!
            > Botu sadece gerçek sahibi eklemeli!
            
            <a:tbldeveloper:828629948184264704> **▬▬▬「 Botta bulunmaması gerekenler 」▬▬▬** <a:tbldeveloper:828629948184264704>
            
            > \`ailemiz\` gibi komutlar!
            > \`dm-duyuru\` \`herkese-rolver\` \`herkesi-banla\` komutu!
            > Epilepsiyi etkileyecek emojiler!
            > Disco rol!
            > NSFW komutu sadece NSFW kanalında kullanılmalı!
            
            <a:tbldeveloper:828629948184264704> **▬▬▬「 Sertfika almak için gerekenler 」▬▬▬** <a:tbldeveloper:828629948184264704>
            
            > Botunuz 75-den fazla sunucuda bulunmalı!
            > Botunuz 150.000-den fazla üyeye hizmet vermeli!
            > Botunuz DBL onaylı olması gerekli!

            <a:tbldeveloper:828629948184264704> **▬▬▬▬▬▬「 Bilgilendirme 」▬▬▬▬▬** <a:tbldeveloper:828629948184264704>

            > **Botunuz DBL onaylı ise direk onaylanır!**
            > **Botunuz üstte belirtilen şartlara uyuyorsa \`bot-ekle\` kanalından başvura bilirsiniz!**
          `)).then(m => {
            db.set(`${message.guild.id}.mesajlar.botkuralmesaj`, m.id)
          })
        })
        message.guild.channels.create("bot-test", {type: "text"}).then(a => {
          a.setParent(message.guild.channels.cache.find(b => b.name === '▬▬▬「 BotList 」▬▬▬').id)
          db.set(`${message.guild.id}.kanallar.bottest`, a.id)
        })
        message.guild.channels.create("bot-test-nsfw", {type: "text", nsfw: true}).then(a => {
          a.setParent(message.guild.channels.cache.find(b => b.name === '▬▬▬「 BotList 」▬▬▬').id)
          db.set(`${message.guild.id}.kanallar.bottestnsfw`, a.id)
        })
        message.guild.channels.create("Bot Test", {type: "voice"}).then(a => {
          a.setParent(message.guild.channels.cache.find(b => b.name === '▬▬▬「 BotList 」▬▬▬').id)
          db.set(`${message.guild.id}.kanallar.bottestsesli`, a.id)
        })
        message.guild.channels.create("bot-ekle", {type: "text"}).then(a => {
          a.send(new Discord.MessageEmbed()
          .setTitle("Bot Ekleme Kanalı").setImage("https://cdn.discordapp.com/attachments/815638601751592962/828668360182202428/350kb.gif")
          .setAuthor(client.user.username, client.user.avatarURL(), "https://discord.com/oauth2/authorize?client_id=828580799980765184&permissions=8&scope=bot")
          .setFooter(message.guild.name, message.guild.iconURL())
          .setThumbnail(message.guild.iconURL())
          .setDescription("> **__Bot eklemek için__ :** \n`"+prefix+"botekle <bot-id> <prefix> <dbl-onayı> <hakkında>`\n\nBot ekleme kurallarına bakmak için <#"+db.get(`${message.guild.id}.kanallar.boteklemekural`)+">\nSertifika almak için `"+prefix+"sertifika <bot-id>`")).then(m => {
            db.set(`${message.guild.id}.mesajlar.boteklemesaj`, m.id)
          })
          a.setParent(message.guild.channels.cache.find(b => b.name === '▬▬▬「 BotList 」▬▬▬').id)
          db.set(`${message.guild.id}.kanallar.botekle`, a.id)
        })
        message.guild.channels.create("bot-onay-red", {type: "text"}).then(a => {
          a.setParent(message.guild.channels.cache.find(b => b.name === '▬▬▬「 BotList 」▬▬▬').id)
          db.set(`${message.guild.id}.kanallar.botonayred`, a.id)
          a.createOverwrite(message.guild.roles.cache.find(a => a.name === "@everyone"),{SEND_MESSAGES: false,VIEW_CHANNEL: false,READ_MESSAGE_HISTORY: true})
          a.createOverwrite(message.guild.roles.cache.find(a => a.name === "@everyone").id,{SEND_MESSAGES: false,VIEW_CHANNEL: false,READ_MESSAGE_HISTORY: true})
          a.createOverwrite(message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.tester`)),{SEND_MESSAGES: true,VIEW_CHANNEL: true,READ_MESSAGE_HISTORY: true})
          a.createOverwrite(message.guild.roles.cache.get(db.get(`${message.guild.id}.roller.tester`)).id,{SEND_MESSAGES: true,VIEW_CHANNEL: true,READ_MESSAGE_HISTORY: true})
        })
      }
    });
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "kurulum",
  description: "",
  usage: ""
};
