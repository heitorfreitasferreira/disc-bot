const search = require("yt-search")
const ytdl = require("ytdl-core-discord")
const Discord = require('discord.js');

const execute = (bot, msg, args) => {
  const pedido = args.join(" ")
  try {
    search(pedido, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result && result.videos.length > 0) {
          const song = result.videos[0]
          playSong(bot, msg, song)
        }
      }
    })
  } catch (e) {

  }
}


const playSong = async (bot, msg, song) => {
  if (!song) {
    return
  }
  if (!msg.member.voice.channel) {
    return msg.reply("Entre em um canal para que eu possa tocar a música")
  }
  let queue = bot.queues.get(msg.member.guild)

  if (!queue) {
    const conn = await msg.member.voice.channel.join()
    queue = {
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song]
    }
    queue.dispatcher = await queue.connection.play(await ytdl(song.url), {
      type: "opus",
    })
    console.log(queue);
    //console.log(song);




    queue.dispatcher.on('start', () => {
      const mensagemEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setURL(song.url)
        .setTitle(song.title)
        .setImage(song.image)
        .setTimestamp(song.timestamp);
      msg.channel.send(mensagemEmbed)
    })

    //msg.channel.send(`>>> ${song.url}`)
    queue.dispatcher.on("finish", () => {
      queue.songs.shift();
      playSong(bot, msg, queue.songs[0]);
    })
    bot.queues.set(msg.member.guild.id, queue)
  } else {
    queue.songs.push(song);
    console.log(queue.songs);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}
module.exports = {
  name: "toca",
  help: "Reproduz a música solicitada no canal de quem estiver pedindo",
  execute,
}