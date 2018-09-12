const Discord = require("discord.js");
const config = require("./config.json");
const constants = require("./constants.js");
const logger = require("./logger.js");

client = new Discord.Client();

client.on("ready", () => {
    logger.info("Lily is online");
});

var cmdList = {
    "hug": {
        name: "hug",
        description: "Hug a fellow Wrimo.",
        usage: "[@user]",
        process: function(client,msg,suffix) {
            if (msg.mentions.members.size > 0) {
                // hug with @ hugs @-user
                msg.mentions.members.forEach(function(member) {

                    msg.channel.send(member + ", would you like a hug?");
                  });
            } else if (!(suffix == "")) {
                // hug with another suffix hugs the text
                msg.channel.send("*Lily hugs " + suffix + ".*");
            } else {
                // hug without suffix hugs author

                msg.channel.send(msg.author + ", would you like a hug?");
            }
        }
    },
    "fetch": {
        name: "fetch",
        description: "Find an <item> for a fellow Wrimo.",
        usage: "item [@user]",
		process: function(client,msg,suffix) {
            var args = suffix.split(" ");
            // choose fetch text
            var choiceID = (Math.floor(Math.random() * constants.FETCH_LIST
                .length));
            if (msg.mentions.members.size > 0) {
                // fetch with @-mention fetches the item for the mentioned user
                msg.mentions.members.forEach(function(member) {
                    msg.channel.send(member + ", would you like a hug?");
                });
            } else if (!(suffix == "")) {
                // fetch with suffix fetches the item for the author
                var msgToSend = constants.FETCH_LIST[choiceID].replace
                    ("%u", suffix);
                msg.channel.send(msgToSend);
            } else {
                // fetch without suffix throws error
                msg.channel.send(msg.author + ", I need to know what to get!");
            }
        }
    },
    "pillow": {
        name: "pillow",
        description: "Pillow a fellow Wrimo.",
        usage: "[@user]",
		process: function(client,msg,suffix) {
            // choose pillow text
            var choiceID = (Math.floor(Math.random() * constants.PILLOW_LIST
                .length));
            if (!(suffix == "")) {
                // pillow with suffix pillows the text
                var msgToSend = constants.PILLOW_LIST[choiceID].replace
                    ("%u", suffix);
                msg.channel.send(msgToSend);
            } else {
                // pillow without suffix pillows author
                var msgToSend = constants.PILLOW_LIST[choiceID].replace
                    ("%u", msg.author);
                msg.channel.send(msgToSend);
            }
		}
    },
    "weather": {
        name: "weather",
        description: "What's the weather like today?",
		process: function(client,msg,suffix) {
            var choiceID = (Math.floor(Math.random() * constants.WEATHER_LIST
                .length));
            msg.channel.send(constants.WEATHER_LIST[choiceID]);
		}
    },
    "roll": {
        name: "roll",
        description: "Rolls any combination of the given options,"
            + " separated by the + operator",
        usage: "x, x y, xdy",
        type: "other",
        process: function(client,msg,suffix) {
            var diceString = "";
            var diceSum = 0;
            var faces = suffix.split("+");
            for (var i = 0; i < faces.length; i++) {
                if(Number.isInteger(Number(faces[i]))) { // Single number
                    if (faces.length == 1) { // Treat as a 1dx roll
                        var roll = (Math.floor(Math.random() * Number(faces[i]))
                            + 1)
                        diceString += roll;
                        diceSum += roll;
                    } else { // Add to the other rolls
                        diceString += "(" + Number(faces[i]) + ")";
                        diceSum += Number(faces[i]);
                    }
                } else if (faces[i].split("d").length == 2) { // RPG-style roll
                    rpgRoll = faces[i].split("d");
                    if (rpgRoll[0] == "") {
                        rpgRoll[0] = 1;
                    }
                    if (!Number.isInteger(Number(rpgRoll[0])) ||
                        !Number.isInteger(Number(rpgRoll[1]))) {
                        diceString = "Error: Both values in an RPG-style roll"
                            + " must be integers.";
                        diceSum = 0;
                        break;
                    } else {
                        if(rpgRoll[0] > 20) {
                            diceString = "ERROR: TOO BIG.";
                            diceSum = 0;
                            break;
                        } else {
                            for (var j = 0; j < Number(rpgRoll[0]); j++){
                                var roll = (Math.floor(Math.random() *
                                    Number(rpgRoll[1])) + 1)
                                diceString += roll;
                                if (j < (Number(rpgRoll[0]) - 1)) {
                                    diceString += ", "
                                }
                                diceSum += roll;
                            }
                        }
                    }
                } else if(faces[i].split(" ").length == 2){ // Range roll
                    rangeRoll = faces[i].split(" ");
                    if (!Number.isInteger(Number(rangeRoll[0])) ||
                        !Number.isInteger(Number(rangeRoll[1]))) {
                        diceString = "Error: Both values in a range roll"
                            + " must be integers.";
                        diceSum = 0;
                        break;
                    } else {
                        if(Number(rangeRoll[0]) < Number(rangeRoll[1])){
                            var roll = (Math.floor(Math.random() * (1 + Number
                                (rangeRoll[1]) - Number(rangeRoll[0]))
                                + Number(rangeRoll[0])));
                            diceString += roll;
                            diceSum += roll;
                        } else {// First number is larger than second
                            diceString = "Error: The first number in a range"
                                + " roll must be smaller than the second.";
                            diceSum = 0;
                            break;
                        }
                    }
                } else {
                    diceString = "Error: " + faces[i] + " is not a valid roll.";
                    diceSum = 0;
                    break;
                }
                if (i < (faces.length - 1)) {
                    diceString += ", "
                }
            }
            msg.channel.send(diceString);
            if (diceSum > 0) {
                msg.channel.send("Total = " + diceSum);
            }
        }
    },
    "choose": {
        name: "choose",
        description: "Selects an item from a list <list> of items,"
            + " separated by commas",
        usage: "list",
        type: "other",
		process: function(client,msg,suffix) {
            var items = suffix.split(",");
            var choiceID = (Math.floor(Math.random() * items.length));
            msg.channel.send(msg.author + ", from " + suffix + ", I selected **"
                + items[choiceID].trim() + "**");
		}
    }
}

client.on('message', (msg) => {
    if(msg.isMentioned(client.user)){
        if () {

        } else {
            msg.channel.send("Hi, I'm Lily. I'm here to greet new users, fetch"
                + " things, and offer hugs.  I use the " + constants.CMD_PREFIX
                + " prefix.  Use " + constants.CMD_PREFIX
                + " help to find out more.");
        }
    }
    if(msg.author.id != client.user.id && (msg.content.startsWith(constants
        .CMD_PREFIX))){
        logger.info(msg.author + " entered command " + msg.content);
        var cmdData = msg.content.split(" ")[0]
            .substring(constants.CMD_PREFIX.length).toLowerCase();
        var suffix = msg.content.substring(cmdData.length
            + constants.CMD_PREFIX.length + 1)
		var cmd = cmdList[cmdData];
        if(cmdData === "help"){
            if(suffix){
                var cmd = cmdList[suffix];
                var helpMsg = "";
                try {
                    helpMsg += "Data for " + cmd.name;
                    var cmdUse = cmd.usage;
                    if(cmdUse){
                        helpMsg += " " + cmdUse;
                    }
                    var cmdDesc = cmd.description;
                    if(cmdDesc){
                        helpMsg += ": " + cmdDesc;
                    }
                    helpMsg += "\n"
                    msg.channel.send(helpMsg);
                } catch(e) {
                    msg.channel.send("That command does not exist.");
                }
			} else {
                msg.author.send("**Lily's Commands:**").then(function(){
                var helpMsg = "";
                for(var i in cmdList) {
                    helpMsg += "**" + constants.CMD_PREFIX;
                    var cmdName = cmdList[i].name;
                    if(cmdName){
						helpMsg += cmdName;
                    }
                    var cmdUse = cmdList[i].usage;
                    if(cmdUse){
						helpMsg += " " + cmdUse;
					}
                    var cmdDesc = cmdList[i].description;
                    if(cmdDesc){
						helpMsg += ":** " + cmdDesc;
					}
                    helpMsg += "\n";
                }
                msg.channel.send(msg.author + ", I sent you a DM.");
                msg.author.send(helpMsg);	
			});
		    }
        }
		else if(cmd) {
		    try{
				cmd.process(client,msg,suffix);
			} catch(e){
                msg.channel.send("Unknown error.  See log file for details.");
                logger.error('Error %s: %s.', e, e.stack);
			}
		}
	} else {
		return
    }
});

client.on('guildMemberAdd', member => {
    member.guild.channels.find("name", "general").send("Welcome to "
        + member.guild.name + ", " + member + "! Please read our Code of"
        + " Conduct in " + constants.rulesLoc + ", and introduce yourself in "
        + constants.introLoc + ".\nThe required format for introductions can be"
        + " found in the pinned post."); 
});

process.on('uncaughtException', function(e) {
    logger.error("Error %s: %s.\nLily will now attempt to reconnect.",
        e, e.stack);
    try {
        client.login(config.token);
        fileSystemCheck();
    } catch (e) {
        logger.error("Reconnection failed.\nLily will now terminate.");
        process.exit(1);
    }
  })

client.login(config.token);