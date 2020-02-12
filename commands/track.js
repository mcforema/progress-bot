const { db, Track } = require('../models');

async function execute(message, args) {
  const amount = parseInt(args[1]);
  if (isNaN(amount)) {
    return message.reply('El valor del item a trackear debe ser un numero. EJ: !track kzarka 10000000000');
  }

  const track = await Track.create({
    item_tag: `${args[0]}_${message.author.id}`,
    item: args[0],
    value: args[1],
    username: message.author.username,
    discord_id: message.author.id,
    current_progress: 0
  });

  return message.reply(`Trackeando \`${track.item}\`. Vas 0 de ${track.value}`);
}

module.exports = {
  name: 'track',
  description: 'Creates a new tracking item',
  args: true,
  usage: '<item> <valor en silver>',
  cooldown: 5,
  execute
};
