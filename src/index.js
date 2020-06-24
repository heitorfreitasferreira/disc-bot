const Discord = require("discord.js")

const fs = require('fs')

const path = require("path")

const dotenv = require("dotenv")
dotenv.config()
const localVars = process.env //abreviação

const bot = new Discord.Client()
bot.commands = new Discord.Collection();
//Importando bibliotecas

const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".js"))
/////////////
for (var filename of commandFiles) {
  const command = require(`./commands/${filename}`)
  bot.commands.set(command.name, command) //comandos que existem nos arquivos dentro do dir commands
} //
////////////

bot.login(localVars.TOKEN)

bot.on("ready", () => {
  console.log("pai ta on como " + bot.user.username);
})


bot.on("message", (msg) => {
  if (!msg.content.startsWith(localVars.PREFIX) || msg.author.bot) return
  const args = msg.content.slice(localVars.PREFIX.length + 1).split(" ") //array com as palavras separadas por espaço
  const command = args.shift() //remove o primeiro item do array args e coloca em command, que é qual ação será executada pelo bot
  try {
    bot.commands.get(command).execute(bot, msg, args)
  } catch (e) {
    return msg.reply("nem to ligado oq vc falou ai mano, se quiser saber oq eu faço manda um ```chora help``` \n")
  }
})