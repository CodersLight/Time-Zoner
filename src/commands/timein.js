const timeutils = require('../timeutils.js');
const embedutils = require('../embedutils.js');

module.exports.run = (client, message, config) => {
	const [,zone] = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const timeIn = timeutils.getTimeIn(zone, timeutils.getFormatFor(message.author.id));

	if(timeIn !== null) {
		message.channel.send(embedutils.timeSuccessEmbed(zone, timeIn));
	} else {
		message.channel.send(embedutils.timezoneNotFoundEmbed(zone));
	}
};
