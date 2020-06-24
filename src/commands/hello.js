const execute = (bot, msg, args) => {
  return msg.reply("Hello")
}

module.exports = {
  name: "hello",
  help: "Da um oi",
  execute,
}