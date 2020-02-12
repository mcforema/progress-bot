const { db, Track } = require('../models');
const Discord = require('discord.js');
const canvas = require('../lib/draw_progress.js');

async function execute(message, args) {
  const amount = parseInt(args[1]);
  if (isNaN(amount)) {
    return message.reply('El valor a restar debe ser un numero. EJ: !restar kzarka 90000000');
  }

  const track = await Track.findOne({ where: { item_tag: `${args[0]}_${message.author.id}` } });

  if (!track) return message.reply('El track ingresado no existe.');

  new_value = parseInt(track.current_progress) - amount;

  if (new_value < 0) {
    track.current_progress = 0;
  } else {
    track.current_progress = new_value;
  }

  await track.save()

  let percentage = track.current_progress * 100 / track.value;
  const attachment = new Discord.Attachment(await canvas.draw_progress(percentage), 'progress-banner.png');

  return message.reply(`\`Item -> ${track.item}\`: Vas ${track.current_progress} de ${track.value} (${percentage}%)`, attachment);
}

module.exports = {
  name: 'deduct',
  aliases: ['restar', 'quitar', 'descontar', 'subtract'],
  description: 'Creates a new tracking item',
  args: true,
  usage: '<item> <silver a restar>',
  cooldown: 5,
  execute
};
