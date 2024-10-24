require('dotenv').config();
const {Client, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions, Embed, Activity, ActivityType, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("ready", (discordbot) => {
    // Log To Console That The Bot Is Running
    console.log(`${discordbot.user.tag} is now running!`);

    // Discord Bot Status Activities
    const activites = [
        {
            name: 'buy Gav giftcards',
            type: ActivityType.Streaming,
            url: 'https://twitch.tv/giftcard/buy',
        },
        {
            name: 'zaap.bio/gav',
            type: ActivityType.Watching,
        },
        {
            name: 'to music by ChillHop',
            type: ActivityType.Listening,
        }
    ]

    // Discord Bot Status Randomizes Every 10 Seconds
    setInterval(() => {
        const random = Math.floor(Math.random()*activites.length);
        client.user.setActivity(activites[random]);
    }, 10000);

    // Sets Discord Bot Status To "Streaming zaap.bio/gav" With A Link To "https://twitch.tv/giftcard/buy"
    client.user.setActivity({
        name: 'zaap.bio/gav',
        type: ActivityType.Streaming,
        url: 'https://twitch.tv/giftcard/buy',
    });

    // Makes A Slash Command For "/ping"
    const ping = new SlashCommandBuilder()
    .setName ('ping')
    .setDescription('This is a ping command!');

    // Makes A Slash Command For "/hello"
    const hello = new SlashCommandBuilder()
    .setName ('hello')
    .setDescription('This is a hello command!');

    // Creates The Commands
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

// Login To Discord Bot Token
client.login(process.env.MY_HOT_STEAMY_AND_SEXY_TOKEN);