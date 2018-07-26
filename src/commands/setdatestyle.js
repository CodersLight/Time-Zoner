const embedutils = require('../embedutils.js');
const timeutils = require('../timeutils.js');
const db = require('../database.js').PREFERENCES;

module.exports.run = (client, message, config) => {
  const [,style] = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const id = message.author.id;

  let current = db.has(id) ? db.get(id) : config.defaultPreferences;

  if(timeutils.isValidDateFormat(style)) {
    current.dateStyle = timeutils.dateStyles[style];
    db.set(userID, current);

    message.channel.send(embedutils.styleSetSuccess('date', style));
  } else {
    message.channel.send(embedutils.styleSetError('date', style, timeutils.validDateStyles));
  }
};
