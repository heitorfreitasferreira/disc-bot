//import Discord from 'discord.js'
const Discord = require("discord.js")

const dotenv = require("dotenv")
dotenv.config()
const localVars = process.env

const bot = new Discord.Client()
bot.on("ready", () => {
  console.log("pai ta on como " + bot.user.username);
})
bot.login(localVars.TOKEN)