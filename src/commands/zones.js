const embedutils = require('../embedutils.js');
const timeutils = require('../timeutils.js');

module.exports.run = (client, message, config) => {
  let zones = '';
  for(const key of Object.keys(timeutils.zones.toJSON())) {
    zones += key + '\n';
  }

  message.author.send(zones).then(() => {
    message.channel.send(embedutils.zoneMessageSuccessEmbed());
  }).catch((e) => {
    message.channel.send(embedutils.zoneMessageFailEmbed());
  });
};
