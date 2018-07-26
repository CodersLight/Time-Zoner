const embedutils = require('../embedutils.js');
const timeutils = require('../timeutils.js');
const db = require('../database.js').PREFERENCES;

module.exports.run = (client, message, config) => {
  const [,style] = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const id = message.author.id;

  let current = db.has(id) ? db.get(id) : config.defaultPreferences;

  if(timeutils.isValidTimeFormat(style)) {
    current.timeStyle = timeutils.timeStyles[style];
    db.set(id, current);

    message.channel.send(embedutils.styleSetSuccess('time', style));
  } else {
    message.channel.send(embedutils.styleSetError('time', style, timeutils.validTimeStyles));
  }
};
