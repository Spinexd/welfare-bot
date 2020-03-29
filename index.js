const Discord = require('discord.js');
const client = new Discord.Client();
 
let praefix = '!';
const regions = ['euw', 'na', 'eune'];


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
   

client.on('message', msg => {
  const content = msg.cleanContent.trim(); // removes trailing & leading spaces

  if(content === `${praefix}stats`) {
    return msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
  }

  if(content === `${praefix}help`) {
   /* const praefixedRegions = regions.map(region => [prefix, region].join('')).join(' ');
    console.log(praefixedRegions); */

    return msg.channel.send(`Available commands: \n !euw \n !na \n !eune`);
  }

  // this will loop over regions and will be null if no match was found, or will be the region if a match was found
  const region = regions.find(region => content.startsWith(`${praefix}${region}`));
  
  if(region) {
    console.log(`found a match for a profile request in region: ${region}`);
    // now we know we have a string matching with ${praefix}${region}SOMETHING_HERE_THAT_WE_NEED
    // so lets remove the praefix and region from the string that we only have SOMETHING_HERE_THAT_WE_NEED

    const accountName = content.substr(`${praefix}${region}`.length).trim(); // cut off the string at the length of praefix and region 
 
    const params = new URLSearchParams({
      userName: accountName
    }).toString();
    
    const url = `https://${region}.op.gg/summoner/${params}`;

    return msg.channel.send(url);
  }
});
 
client.login('NjkxNjc5NTYzNzg0Mzg4NjUw.XoANhQ.jReorwc-ha2tGpUv087N_Q_W9AQ');