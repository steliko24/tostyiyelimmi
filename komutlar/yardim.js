const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
    message.delete()
    let botlist = db.get(`${message.guild.id}.kanallar.botekle`)
    if(message.channel.id == botlist) return;
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
  let sayfalar = [`**Not:**\n\nBot List İle Eklenen Botun Sahibi SUNUCUDAN çıkar ise \nBotu da sahibi ile birlikte Çıkartılır`,`
> **__${prefix}kurulum__** - BotList kanallarını kurar!
> **__${prefix}red-sıfırla__** - Belirtilen botun reddedilmesi sıfırlanır.
> **__${prefix}botun-sahibi__** - Belirtilen botun sahibini belirtir.
`,`
> **__${prefix}botekle__** - Bot ekleme isteği yollar!
> **__${prefix}sertifika__** - Sertifika alma isteği yollar!
> **__${prefix}onayla__** - Belirtilen botu onaylar!
> **__${prefix}reddet__** - Belirtilen botu reddeder!
> **__${prefix}sertifika-onayla__** - Belirtilen botun sertifika isteğini onaylar!
> **__${prefix}sertifika-reddet__** - Belirtilen botun sertifika isteğini reddeder!
`,`
> **__${prefix}sıfırla__** - BotList sistemi ayarlarını sıfırlar!
> **__${prefix}ayarlar__** - BotList sistemi ayarlarını belirtir!
`,`
> **__${prefix}kullanıcı-bilgi__** - Belirtilen üyenin bilgilerini belirtir!
> **__${prefix}istatistik__** - Botun durumunu belirtir!  
> **__${prefix}davet__** - Botun davet linkini belirtir!
> **__${prefix}sil__** - Belirtilen miktarda mesaj siler!
> **__${prefix}prefix__** - Sunucuya özel prefixi ayarlar!
`]; 
  let sayfa = 1;

  const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setColor("PURPLE")
    .setFooter(`${client.user.username} - Sayfa ${sayfa} - ${sayfalar.length}`, client.user.avatarURL())
    .setDescription(sayfalar[sayfa-1])

  message.channel.send(embed).then(msg => {

    msg.react('⏪').then( r => {
      msg.react('⏩')
      
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter);
      const forwards = msg.createReactionCollector(forwardsFilter);
  
      backwards.on('collect', r => {
        if (sayfa === 1) return;
        sayfa--;
        r.users.remove(message.author.id)
        embed.setDescription(sayfalar[sayfa-1]);
        embed.setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`);
        msg.edit(embed)
      })

      forwards.on('collect', r => {
        if (sayfa === sayfalar.length) return;
        sayfa++;
        r.users.remove(message.author.id)
        embed.setDescription(sayfalar[sayfa-1]);
        embed.setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`);
        forwards;
        msg.edit(embed)
      })

    })

  })
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım","y","h","help"],
  category: "admin",
  permLevel: 0,
  kategori : "Üyelerin kullana bileceği komutlar",
};

module.exports.help = {
  name: 'yardım',
  description: 'Gelişmiş Sayfalı Yardım.',
  usage: 'yardım'
}; 
