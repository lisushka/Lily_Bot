var rulesLoc = {default: "#server-rules"};
var introLoc = {default: "#introductions"};
var botName = "Lily";
var huggableList = {};
const CMD_PREFIX = "?";
const FETCH_LIST =
    [botName + " rummages in a closet, and fetches %i for %u.",
    botName + " dives into the ocean, and retrieves %i for %u.",
    botName + " hops into a dragon's hoard, and snatches %i for %u.",
    botName + " picks the lock of the treasure chest, and presents %i to %u.",
    botName + " opens the safe, and gets out %i for %u.",
    botName + " waves a magic wand, and conjures %i for %u.",
    botName + " turns off the oven, and removes %i for %u.",
    botName + " climbs through the window, and holds out %i to %u.",
    botName + " goes through the Box of Tricks, and finds %i for %u.",
    botName + " sneaks out of the basement, and proffers %i for %u.",
    botName + " lands an Unidentified Flying Object, and produces %i for %u.",
    botName + " slides down the slippery slope, and offers %i to %u."
];
const PILLOW_LIST =
    [botName + " jumps out of a rabbit hole, and bats %u with a pillow.",
    botName + " shuffles over, and pats %u with a pillow.",
    botName + " pops %u on the head with a pillow, and runs away giggling.",
    botName + " rappels down from the ceiling, and drops a pillow on %u.",
    botName + " peeks around the door, and throws a pillow at %u.",
    botName + " dances in from the garden, and bops %u with a pillow.",
    "A pillow collides with %u.  Hey, where did " + botName + " go?",
    "A pillow suddenly impacts the floor beside %u.  Whoops!",
    botName + " taps %u with a pillow. 'Hey, time to write more!'",
    botName + " sneaks out from under the bed, and aims a pillow at %u.",
    botName + " flips a lever on the Pillow Machine, and shoots pillows at %u.",
    botName + " slits a hole in a pillow, and pours the filling on %u."
];
const WEATHER_LIST =
    ["It's sunny outside.  Oh no, wait, it's raining now.  Typical Melbourne"
        + " weather!",
    "Do you really want to know what the weather is?  It's going to change in"
        + " 5 minutes!",
    "Is that a full moon tonight?  Wow, how beautiful.",
    "The weather is inconsequential.  You don't need *weather* to write!",
    "It's overcast.  It might be day time.  I can't tell.",
    "It's windy.  Why don't you go fly a kite?",
    "What weather?  It's outside that window you never open.",
    "It's sunny, with a hint of garlic in the air.  Vampires stay inside!",
    "It's snowing!  Would you like to make a snow angel?",
    "There are showers in the vicinity.  It's sort of chilly at eight degrees.",
    "It's very wet out there.  Submarine stocks must be soaring!",
    "It's raining cats and dogs.  That explains the noise!"
];

exports.rulesLoc = rulesLoc;
exports.introLoc = introLoc;
exports.botName = botName;
exports.huggableList = huggableList;
exports.CMD_PREFIX = CMD_PREFIX;
exports.FETCH_LIST = FETCH_LIST;
exports.PILLOW_LIST = PILLOW_LIST;
exports.WEATHER_LIST = WEATHER_LIST;