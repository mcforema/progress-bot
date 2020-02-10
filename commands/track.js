async createTrack(message, args) {
  const amount = parseInt(args[1]);
  if (isNaN(amount)) {
    return message.reply('El valor del item a trackear debe ser un numero. EJ: !track kzarka 10000000000');
  }

  return message.channel.send(`Trackeando ${args[0]}. Vas 0 de ${amount}`);
}

module.exports = {
  name: 'track',
  description: 'Creates a new tracking item',
  args: true,
  usage: '<item> <valor en silver>',
  cooldown: 5,

};
