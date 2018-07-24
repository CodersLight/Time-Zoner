const Discord = require('discord.js');
const config = require('./config.json');

module.exports.timezoneNotFoundEmbed = (zone) => {
	const embed = new Discord.MessageEmbed()
		.setColor(3381759)
		.addField('ERROR', `Time zone \`${zone}\` not found!\nDo \`${config.prefix}zones\` to see a list of valid zones!`)
		.setFooter('Made by SkyHawk#1058');

	return embed;
};

module.exports.timeSuccessEmbed = (zone, time) => {
	const embed = new Discord.MessageEmbed()
		.setColor(3381759)
		.addField(`Current \`${zone.toUpperCase()}\` Time`, `${time}`)
		.setFooter('Made by SkyHawk#1058');

	return embed;
};
