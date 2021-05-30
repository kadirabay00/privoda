const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.token;
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var prefix = process.env.prefix;

client.on("ready", () => {
  console.log(`Bot şuan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.login(process.env.token);

client.on("ready", async function() {
const voiceChannel = "838431487732088882"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})

//------------------------------------------------------------------------------------------------------------\\

client.on('voiceStateUpdate', async (oldState, newState) => {
  if (newState.channel != null && newState.channel.name.startsWith('➕│2 Kişilik Oda')) {newState.guild.channels.create(`|| ${newState.member.displayName}`, {type: 'voice',
    parent: newState.channel.parent,})
   .then((cloneChannel) => {newState.setChannel(cloneChannel);
    cloneChannel.setUserLimit(2);})}
  if (newState.channel != null && newState.channel.name.startsWith('➕│3 Kişilik Oda')) {newState.guild.channels.create(`|| ${newState.member.displayName}`, {type: 'voice',
    parent: newState.channel.parent,})
   .then((cloneChannel) => {newState.setChannel(cloneChannel);
    cloneChannel.setUserLimit(3);})}
if (newState.channel != null && newState.channel.name.startsWith('➕│4 Kişilik Oda')) {newState.guild.channels.create(`|| ${newState.member.displayName}`, {type: 'voice',
    parent: newState.channel.parent,})
   .then((cloneChannel) => {newState.setChannel(cloneChannel);
    cloneChannel.setUserLimit(4);})}
if (newState.channel != null && newState.channel.name.startsWith('➕│5 Kişilik Oda')) {newState.guild.channels.create(`|| ${newState.member.displayName}`, {type: 'voice',
    parent: newState.channel.parent,})
   .then((cloneChannel) => {newState.setChannel(cloneChannel);
    cloneChannel.setUserLimit(5);})}
if (newState.channel != null && newState.channel.name.startsWith('➕│15 Kişilik Oda')) {newState.guild.channels.create(`|| ${newState.member.displayName}`, {type: 'voice',
    parent: newState.channel.parent,})
   .then((cloneChannel) => {newState.setChannel(cloneChannel);
    cloneChannel.setUserLimit(15);})}
// Kullanıcı ses kanalından ayrılınca ve kanalda kimse kalmazsa kanalı siler;
if (oldState.channel != undefined) {
  if (oldState.channel.name.startsWith('||')) {
    if (oldState.channel.members.size == 0) {oldState.channel.delete();}
      else { // İlk kullanıcı ses kanalından ayrılınca kanaldaki başka kullanıcı adını kanal adı yapar.
        let matchMember = oldState.channel.members.find(x => `|| ${x.displayName}` == oldState.channel.name);
        if (matchMember == null) {
        oldState.channel.setName(`|| ${oldState.channel.members.random().displayName}`)
          }
       }
     }
   }
});

//------------------------------------------------------------------------------------------------------------\\





//------------------------------------------------------------------------------------------------------------\\

require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (process.env.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});
