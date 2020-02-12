const { db, Track } = require('../models');
const Discord = require('discord.js');
const canvas = require('../lib/draw_progress.js');

async function execute(message, args) {
  const track = await Track.findOne({
    where: {
      item_tag: `${args[0]}_${message.author.id}`
    }
  });

  if (!track) return message.reply('El track ingresado no existe.');

  let percentage = track.current_progress * 100 / track.value;

  const attachment = new Discord.Attachment(await canvas.draw_progress(percentage), 'progress-banner.png');

  const exampleEmbed = new Discord.RichEmbed()
  .setColor('#0099ff')
  .setTitle(`Item: ${track.item} ${percentage}%`)
  .setDescription(`Vas ${track.current_progress} de ${track.value}`)
  .attachFiles([attachment])
  .setImage('attachment://progress-banner.png');

  // return message.channel.send(`Trackeando \`${track.item}\`. Vas ${track.current_progress} de ${track.value}`, attachment);
  return message.channel.send(exampleEmbed);
}

module.exports = {
  name: 'check',
  description: 'Checks for a tracked item',
  args: true,
  usage: '<item>',
  cooldown: 5,
  execute
};
