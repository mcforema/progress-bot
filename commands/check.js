const { db, Track, Plan } = require('../models');
const { embed_creator } = require('../lib/embed_creator.js');
const { plan_embed } = require('../lib/plan_embed.js');

async function execute(message, args) {

  if (args[0] == 'plan') {
    const plan = await Plan.findOne({
      where: {
        discord_id: message.author.id
      }
    });

    if (!plan) return message.reply('No tienes ningun plan creado. Usa !plan para crear uno');

    return message.channel.send(
      await plan_embed(plan.name, plan.current_progress, plan.goal, plan.daily_avg)
    );
  } else {
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
}

module.exports = {
  name: 'check',
  description: 'Checks for a tracked item',
  args: true,
  usage: '<item>',
  cooldown: 5,
  execute
};
