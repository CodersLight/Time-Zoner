const embedutils = require('../embedutils.js');
const db = require('../database.js').ZONES;

module.exports.run = (client, message, config) => {
  const [,rawID] = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const id = rawID.replace(/[<@!>]/g, '');

  if(db.has(id)) {
    message.channel.send(embedutils.timezoneGetEmbed(id, message.guild, db.get(id)));
  } else {
    message.channel.send(embedutils.timezoneNotYetSetEmbed(id, message.guild));
  }
};
