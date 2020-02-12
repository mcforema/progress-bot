const { db, Track } = require('../models');

async function execute(message, args) {
  const track = await Track.findOne({
    where: {
      item_tag: `${args[0]}_${message.author.id}`
    }
  });

  if (!track) return message.reply('El track ingresado no existe.');

  return message.reply(`Trackeando \`${track.item}\`. Vas ${track.current_progress} de ${track.value}`);
}

module.exports = {
  name: 'check',
  description: 'Checks for a tracked item',
  args: true,
  usage: '<item>',
  cooldown: 5,
  execute
};
