const { db, Track } = require('../models');
const { embed_creator } = require('../lib/embed_creator.js');

async function execute(message, args) {
  const track = await Track.findOne({
    where: {
      item_tag: `${args[0]}_${message.author.id}`
    }
  });

  if (!track) return message.reply('El track ingresado no existe.');

  let percentage = (track.current_progress * 100 / track.value).toFixed(2);

  return message.channel.send(
    await embed_creator(track.item, track.current_progress, track.value, percentage)
  );
}

module.exports = {
  name: 'check',
  description: 'Checks for a tracked item',
  args: true,
  usage: '<item>',
  cooldown: 5,
  execute
};
