const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// Token se sada uzima iz Replit sekreta
const TOKEN = process.env.TOKEN;

client.once('ready', () => {
  console.log(`Bot ulogovan kao ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "!kviz") {
    console.log("Kviz komanda aktivirana.");
    const sent = await message.channel.send("Da li je Naruto Uzumaki iz Hyuga Klana?");
    await sent.react("✅").catch(console.error);
    await sent.react("❌").catch(console.error);
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Greška pri fetchovanju reakcije:', error);
      return;
    }
  }

  if (user.bot) return;
  if (reaction.message.author.id !== client.user.id) return;

  if (reaction.emoji.name === '✅') {
    reaction.message.channel.send(`<@${user.id}> Tačan odgovor ✅`);
  } else if (reaction.emoji.name === '❌') {
    reaction.message.channel.send(`<@${user.id}> Netačno ❌`);
  }
});

client.login(TOKEN);
