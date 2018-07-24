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

module.exports.timezoneSetSuccessEmbed = (zone) => {
	const embed = new Discord.MessageEmbed()
		.setColor(3381759)
		.addField('Success!', `Your time zone has been set to \`${zone}\`!`)
		.setFooter('Made by SkyHawk#1058');

	return embed;
};

const displayFromID = (id, guild) => {
	return guild.members.get(id).displayName;
};
const possesive = (str) => {
	return str[str.length - 2] !== 's' ? str + '\'s' : str + '\'';
};

module.exports.timezoneGetEmbed = (id, guild, zone) => {
	const embed = new Discord.MessageEmbed()
		.setColor(3381759)
		.addField('Success!', `${possesive('\`' + displayFromID(id, guild) + '\`')} time zone is \`${zone}\`!`)
		.setFooter('Made by SkyHawk#1058');

	return embed;
};

module.exports.timeGetEmbed = (id, guild, time) => {
	const embed = new Discord.MessageEmbed()
		.setColor(3381759)
		.addField('Success!', `It is \`${time}\` for \`${displayFromID(id, guild)}\`.`)
		.setFooter('Made by SkyHawk#1058');

	return embed;
};

module.exports.timezoneNotYetSetEmbed = (id, guild) => {
	const embed = new Discord.MessageEmbed()
		.setColor(3381759)
		.addField('ERROR', `\`${displayFromID(id, guild)}\` hasn't set their timezone yet!`)
		.setFooter('Made by SkyHawk#1058');

	return embed;
};
