const embedutils = require('../embedutils.js');
const timeutils = require('../timeutils.js');
const db = require('../database.js').ZONES;

module.exports.run = (client, message, config) => {
  const [,rawID] = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const id = rawID.replace(/[<@!>]/g, '');

  if(db.has(id)) {
    const formattedTime = timeutils.getTimeIn(db.get(id), timeutils.getFormatFor(message.author.id));
    message.channel.send(embedutils.timeGetEmbed(id, message.guild, formattedTime));
  } else {
    message.channel.send(embedutils.timezoneNotYetSetEmbed(id, message.guild));
  }
};
