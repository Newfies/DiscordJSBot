require('dotenv').config();
const {Client, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionsBitField, Permissions, Embed, Activity, ActivityType, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

// Functions
function log(message, loglevel){
    if (loglevel == 1){
        console.log(`[LOG] ${message}`); // Log As INFO
        return;
    }
    if (loglevel == 2){
        console.log(`[WARNING] ${message}`); // Log As WARNING
        return;
    }
    if (loglevel == 3){
        console.log(`[ERROR] ${message}`); // Log As ERROR
        return;
    }
    else {
        console.log(`[LOGGING ERROR] Logging Failed Due To Incorrect/Missing loglevel`); // Log As Failed To Log
        return;
    }
}

client.on("ready", (discordbot) => {
    // Log To Console That The Bot Is Running
    log(`${discordbot.user.tag} is now running!`, 1);

    // Discord Bot Status Activities
    const activites = [
        {
            name: 'Gav on YouTube | youtube.com/@GvNx',
            type: ActivityType.Watching,
            // url: 'https://www.youtube.com/watch?v=vqYBoxDrhDw',
        },
        /*
        {
            name: 'Ready or Not',
            type: ActivityType.Playing,
        },
        {
            name: 'Minecraft',
            type: ActivityType.Playing,
        },
        {
            name: 'Mortal Kombat 11',
            type: ActivityType.Playing,
        },
        {
            name: 'Roblox',
            type: ActivityType.Playing,
        },
        */
        {
            name: 'to be better than Glitchy The Companion',
            type: ActivityType.Competing,
        },
        {
            name: 'Gav on Twitch | twitch.tv/SimplyGav',
            type: ActivityType.Watching,
            // url: 'https://twitch.tv/simplygav',
        },
        {
            name: 'music provided by ChillHop',
            type: ActivityType.Listening,
        }
    ]

    // Discord Bot Status Randomizes Every 10 Seconds
    setInterval(() => {
        const random = Math.floor(Math.random()*activites.length);
        client.user.setActivity(activites[random]);
        log(`Bot has changed activities!`, 1);
    }, 15000);

    // Sets Discord Bot Status To "Streaming zaap.bio/gav" With A Link To "https://twitch.tv/giftcard/buy"
    client.user.setActivity({
        name: `Gav's Commands`,
        type: ActivityType.Listening,
    });

    // Makes A Slash Command For "/ping"
    // Responds With "Pong!"
    const ping = new SlashCommandBuilder()
    .setName ('ping')
    .setDescription('This is a ping command!');

    // Makes A Slash Command For "/shutdown"
    // Shuts Down The Bot
    const shutdown = new SlashCommandBuilder()
    .setName ('shutdown')
    .setDescription('This is a command to stop the bot!');

     // Makes A Slash Command For "/sayto"
     // Says Set Message To The Selected User, Mentioning Them
     const sayto = new SlashCommandBuilder()
     .setName ('sayto')
     .setDescription('This is a command to have the bot say something to the chosen user!')
     .addUserOption(option =>
        option
        .setName('user')
        .setDescription(`Who's Recieving This Message?`)
        .setRequired(true)
     )
     .addStringOption(option =>
        option
        .setName('message')
        .setDescription('Whats The Message?')
        .setRequired(true)
     )

    // Creates The Commands
    client.application.commands.create(ping);
    client.application.commands.create(shutdown);
    client.application.commands.create(sayto);
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName==='ping') {
        interaction.reply('Pong!');
        log(`Bot Answers To Ping Command`, 1);
    }
    if(interaction.commandName==='sayto') {
        const userOption = interaction.options.getUser('user');
        const messageOption = interaction.options.getString('message');
        if (!userOption && !messageOption){
            log(`Bot Fails To Complete SayTo Command, Due To A Missing Message And User`, 3);
            return interaction.reply('Command is missing a user and a message');
        }
        if (!userOption) {
            log(`Bot Fails To Complete SayTo Command, Due To A Missing User`, 3);
            return interaction.reply('Command is missing a user');
        }
        if (!messageOption) {
            log(`Bot Fails To Complete SayTo Command, Due To A Missing Message`, 3);
            return interaction.reply('Command is missing a message');
        }
        if(userOption && messageOption){
            interaction.reply(`${userOption.toString()}, ${messageOption}!`);
            log(`Bot Answers To SayTo Command`, 1);
        }
    }
    if(interaction.commandName==='shutdown') {
        interaction.reply('Shutting down...');
        log(`Bot Is Now Shutting Down`, 2);
        client.destroy();
    }
})

// Login To Discord Bot Token
client.login(process.env.MY_HOT_STEAMY_AND_SEXY_TOKEN);
