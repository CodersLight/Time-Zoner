const timeutils = require('../timeutils.js');
const embedutils = require('../embedutils.js');
const db = require('../database.js').ZONES;

module.exports.run = (client, message, config) => {
  const [,zone] = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const realZone = timeutils.getTimeZoneFromName(zone);
	if(realZone !== null) {
    db.set(message.author.id, realZone.key);
		message.channel.send(embedutils.timezoneSetSuccessEmbed(zone));
	} else {
		message.channel.send(embedutils.timezoneNotFoundEmbed(zone));
	}
};
