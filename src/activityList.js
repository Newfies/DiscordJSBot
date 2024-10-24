const { ActivityType } = require('discord.js');

const activityList = [
    {
        name: 'Gav on YouTube | youtube.com/@GvNx',
        type: ActivityType.Watching,
    },
    {
        name: 'A Battle Against Glitchy The Companion',
        type: ActivityType.Competing,
    },
    {
        name: 'Gav on Twitch | twitch.tv/SimplyGav',
        type: ActivityType.Watching,
    },
    {
        name: 'music provided by ChillHop',
        type: ActivityType.Listening,
    }
];

module.exports = activityList;
