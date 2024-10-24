require('dotenv').config();
const {Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("ready", (discordbot) => {
    console.log(`${discordbot.user.tag} is now running!`);
    client.user.setActivity("https://zaap.bio/gav");

    const ping = new SlashCommandBuilder()
    .setName ('ping')
    .setDescription('This is a ping command!');

    const hello = new SlashCommandBuilder()
    .setName ('hello')
    .setDescription('This is a hello command!');

    client.application.commands.create(ping);
    client.application.commands.create(hello);
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName==='ping') {
        interaction.reply('Pong!');
    }
    if(interaction.commandName==='hello') {
        interaction.reply('Hello!');
    }
})

client.login(process.env.MY_HOT_STEAMY_AND_SEXY_TOKEN);