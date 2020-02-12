const { db, Track } = require('../models');

async function execute(message) {
  const tracks = await Track.findAll({ where: { discord_id: message.author.id } });

  let tracksString = tracks.map(t => t.item).join(', ');

  return message.reply(`Trackeando \`${tracksString}\`. Usa \`!check <item>\` para ver el progreso de un item`);
}

module.exports = {
  name: 'tracks',
  description: 'Lists your tracked items',
  args: false,
  usage: '',
  cooldown: 5,
  execute
};
