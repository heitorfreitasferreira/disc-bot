const execute = (bot, msg, args) => {
  let string = "voce pode me pedir:\n"
  bot.commands.forEach(command => {
    if (command.help) {
      string += `\n**${process.env.PREFIX}${command.name}**: ${command.help}`
    }
  })
  return msg.channel.send(string)
}

module.exports = {
  name: "help",
  execute,
}