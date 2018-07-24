const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');

fs.readdir('./commands', (err, files) => {
	files.forEach((file) => {
		// Add the commands to the require() cache.
		// eslint-disable-next-line no-unused-vars
		const cache = require(`./commands/${file}`);
	});
});

client.on('ready', () => {
	// eslint-disable-next-line no-console
	console.log('Connected to Discord!');
});

client.on('message', (message) => {
	if(message.author.bot || message.content.indexOf(config.prefix) !== 0) return;

	const command = message.content.slice(config.prefix.length).trim().split(/ +/g).shift().toLowerCase();

	if(command.includes('/') || command.includes('\\')) return;

	if(fs.existsSync(`./commands/${command}.js`)) {
		try {
			const commandFile = require(`./commands/${command}.js`);

			commandFile.run(client, message, config);
		} catch(err) {} // eslint-disable-line no-empty
	}
});

client.login(require('./auth.js').TOKEN);
