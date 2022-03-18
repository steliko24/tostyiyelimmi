const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " BERK");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000)


const Discord = require('discord.js');
const client = new Discord.Client({
  fetchAllMembers: true,
  partials: ["MESSAGE", "USER", "REACTION"]
});
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const fs = require('fs');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const ytdl = require('ytdl-core');
const generator = require('generate-password');
const db = require('quick.db')
const moment = require('moment');
const ms = require('parse-ms');
const GIFEncoder = require('gifencoder');
require('moment-duration-format')
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on("message", async message => {
  let kanal = db.get(`${message.guild.id}.kanallar.botekle`)
  if(message.channel.id==kanal){
    if(message.member.hasPermission("ADMINISTRATOR")) return;
    if(message.author.id == "918899233011159081") return;
    if (!message.content.startsWith(prefix+"botekle")){
      if (!message.content.startsWith(prefix+"bot-ekle")){
        if (!message.content.startsWith(prefix+"sertifika")){
          message.delete().catch(err => message.channel.send(new Discord.MessageEmbed().setDescription("`"+err+`\` yüzünden [mesajı](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/) silemiyorum!`)).then(s => s.delete({timeout:7500})));
          message.channel.send("Bu kanalda botekle hariç bir komut kullanamazsınız!").then(s => s.delete({timeout: 3000}))
        }
      }
    }
  }
})
client.on("guildMemberAdd", async member => {
  if(member.user.bot){
    let botrol = db.get(`${member.guild.id}.roller.botrol`)
    member.roles.add(botrol)
  }
})
client.on("guildMemberRemove", async member => {
  if(db.get(`${member.guild.id}.${member.id}.botlar`)){
    db.get(`${member.guild.id}.${member.id}.botlar`).forEach(botid => {
      member.guild.members.cache.get(botid).kick("Sahibi sunucudan çıktı!");
    })
    db.set(`${member.guild.id}.${member.id}.durum`, "yasaklı")
    member.guild.channels.cache.get(db.get(`${member.guild.id}.kanallar.botlog`)).send(
      new Discord.MessageEmbed()
      .setDescription(`${member} sunucudan çıktığı için botları otomatik olarak sunucudan atıldı!`)
      .setColor("#ff0000")
      .setAuthor(client.user.username, client.user.avatarURL())
      .setFooter(client.user.username, client.user.avatarURL())
    )  
  }
})

client.on("guildCreate", async(guild) => {
  let dil = db.get(`${guild.id}.dil`)
  if(!dil){    
      let soru = new Discord.MessageEmbed()
      .addFields(
          {
            name: `🇹🇷 Dil sistemi 🇹🇷`,
            value: `Sunucuna ayarlanmam için bir dil seç.\nÇeviriler 100% doğru olmaya bilir!`,
            inline: true
          },
          {
            name: `🇦🇿 Dil sistemi 🇦🇿`,
            value: `Serverdə qurmağım üçün bir dil seçin. Tərcümə 100% düzgün olmaya bilər!`,
            inline: false
          },
          {
            name: `🇬🇧 Language system 🇬🇧`,
            value: `Choose a language for me to set on the server. Translations may not be 100% correct!`,
            inline: true
          },
          {
            name: `🇷🇺 Языковая система 🇷🇺`,
            value: `Выберите язык, который я буду устанавливать на сервере. Перевод может быть неправильным на 100%!`,
            inline: false
          },
      )
      .setAuthor(client.user.username, client.user.avatarURL())
      .setFooter(client.user.username, client.user.avatarURL())
      .setTitle("Bilgilendirme - Məlumat - Information - Информация")
      .setImage("")
    guild.owner.send(soru).then(async function(sentEmbed) {
    const emojiArray = ["🇹🇷","🇦🇿","🇬🇧","🇷🇺"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name);
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    await sentEmbed.react(emojiArray[1]).catch(function() {});
    await sentEmbed.react(emojiArray[2]).catch(function() {});
    await sentEmbed.react(emojiArray[3]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter);
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "🇹🇷") {
        sentEmbed.delete()
        db.set(`${guild.id}.dil`, "TR")
        guild.owner.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription("<a:tbldeveloper:828629948184264704> Dilim sunucunuzda 🇹🇷 **TR** olarak ayarlandı. <a:tbldeveloper:828629948184264704>"))
      }
      if (reaction.emoji.name === "🇦🇿") {
        sentEmbed.delete()
        db.set(`${guild.id}.dil`, "AZ")
        guild.owner.send(new Discord.MessageEmbed().setColor("#aaaaaa").setDescription("<a:tbldeveloper:828629948184264704> Dilim serverinizdə 🇦🇿 **AZ** olaraq təyin olundu. <a:tbldeveloper:828629948184264704>"))
      }
      if (reaction.emoji.name === "🇬🇧") {
        sentEmbed.delete()
        db.set(`${guild.id}.dil`, "EN")
        guild.owner.send(new Discord.MessageEmbed().setColor("#ffaaff").setDescription("<a:tbldeveloper:828629948184264704> My language is set to 🇬🇧 **EN** on your server. <a:tbldeveloper:828629948184264704>"))
      }
      if (reaction.emoji.name === "🇷🇺") {
        sentEmbed.delete()
        db.set(`${guild.id}.dil`, "RU")
        guild.owner.send(new Discord.MessageEmbed().setColor("#ff00dd").setDescription("<a:tbldeveloper:828629948184264704> На вашем сервере для язык установлено значение 🇷🇺 **RU**. <a:tbldeveloper:828629948184264704>"))
      }
    });
  });
  } else {
    let embed = new Discord.MessageEmbed()
    .setImage("")
    
    if(dil=="TR"){
      guild.owner.send(embed.setColor("#ff0000").setDescription(`Bu sunucuya daha önce eklendiğimde dilim 🇹🇷 **TR** olarak ayarlandığı için otomatik olarak tekrar ayarladım.`))
    }
    if(dil=="AZ"){
      guild.owner.send(embed.setColor("#aaaaaa").setDescription(`Əvvəllər bu serverə əlavə olunduğum zaman dilim 🇦🇿 **AZ** olaraq təyin olunduğundan, yenidən avtomatik olaraq qurdum.`))
    }
    if(dil=="EN"){
      guild.owner.send(embed.setColor("#ffaaff").setDescription(`Since my language was set to 🇬🇧 **EN** when I was added to this server before, I set it up again automatically.`))
    }
    if(dil=="RU"){
      guild.owner.send(embed.setColor("#ff00dd").setDescription(`Поскольку мой язык был установлен на 🇷🇺 **RU**, когда я был добавлен на этот сервер раньше, я автоматически настроил его снова.`))
    }
  }
    client.users.cache.get("730860373862908071").send("<a:tvonaylanma:800045615132180521><a:tvonaylanma:800045615132180521>\n======================\n> **Bir sunucuya eklendim!**\nSunucu ismi: **__"+guild.name+"__**\nSunucudaki toplam üye: **__"+guild.memberCount+"__**\nKurucu ismi: **__"+client.users.cache.get(guild.owner.id).tag+"__**\nToplam üye: **__"+client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()+"__**\nToplam sunucu: **__"+client.guilds.cache.size+"__**")
})
client.on("guildDelete", async(guild) => {
    client.users.cache.get("730860373862908071").send("<a:tvreddet:800045804173525002><a:tvreddet:800045804173525002>\n======================\n> **Bir sunucudan atıldım!**\nSunucu ismi: **__"+guild.name+"__**\nSunucudaki toplam üye: **__"+guild.memberCount+"__**\nKurucu ismi: **__"+client.users.cache.get(guild.owner.id).tag+"__**\nToplam üye: **__"+client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()+"__**\nToplam sunucu: **__"+client.guilds.cache.size+"__**")
})

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;


client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Could not find any commands");
    return;
  }
  jsfile.forEach(f => {
    let props = require(`./cmds/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);

  let jsfile1 = files.filter(f => f.split(".").pop() === "js");
  if (jsfile1.length <= 0) {
    console.log("Could not find any events");
    return;
  }
  jsfile1.forEach(f => {
    const eventName = f.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${f}`);

    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
console.log(`Ready ;)`)
})





client.login(process.env.token);
