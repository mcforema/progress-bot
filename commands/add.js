const { db, Track } = require('../models');
const Discord = require('discord.js');
const canvas = require('../lib/draw_progress.js');

async function execute(message, args) {
  const amount = parseInt(args[1]);
  if (isNaN(amount)) {
    return message.reply('El valor a agregar debe ser un numero. EJ: !sumar kzarka 90000000');
  }

  const track = await Track.findOne({ where: { item_tag: `${args[0]}_${message.author.id}` } });

  if (!track) return message.reply('El track ingresado no existe.');

  track.current_progress = parseInt(track.current_progress) + amount;

  let percentage = track.current_progress * 100 / track.value;
  let success_message = `\`Item -> ${track.item}\`: Vas ${track.current_progress} de ${track.value} (${percentage}%)`

  if (track.current_progress >= track.value) {
    track.current_progress = track.value;
    percentage = 100
    success_message = `:tada: Felicidades! concretaste la meta para \`${track.item}\`! Tienes ${track.current_progress}`
  }

  await track.save()
  
  const attachment = new Discord.Attachment(await canvas.draw_progress(percentage), 'progress-banner.png');

  return message.reply(success_message, attachment);
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
