const { db, Track } = require('../models');

async function execute(message, args) {
  const amount = parseInt(args[1]);
  if (isNaN(amount)) {
    return message.reply('El valor a agregar debe ser un numero. EJ: !sumar kzarka 90000000');
  }

  const track = await Track.findOne({ where: { item_tag: `${args[0]}_${message.author.id}` } });

  if (!track) return message.reply('El track ingresado no existe.');

  track.current_progress = parseInt(track.current_progress) + amount;

  let success_message = `\`${track.item}\`: Vas ${track.current_progress} de ${track.value}`

  if (track.current_progress >= track.value) {
    track.current_progress = track.value;
    success_message = `:tada: Felicidades! concretaste la meta para \`${track.item}\`! Tienes ${track.current_progress}`
  }

  await track.save()

  return message.reply(success_message);
}

module.exports = {
  name: 'add',
  description: 'Creates a new tracking item',
  args: true,
  usage: '<item> <silver a agregar>',
  cooldown: 5,
  aliases: ['sumar', 'guardar', 'agregar', 'save'],
  execute
};
