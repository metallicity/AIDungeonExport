# AIDungeonExport

This repo contains a script to export a user's [AI Dungeon](https://play.aidungeon.io) adventures.

It must be run in a browser console open on the AI Dungeon site, logged in as the user whose adventures you want to save. I acknowledge that this isn't a great approach in terms of safety (you generally shouldn't run scripts you don't understand on pages that you've logged into), but this is really the best way to make the export process as accessible to as many less technical users as possible.

To run the script, log into AI Dungeon, and on any page open the web console. Most desktop browsers can do this by pressing F12 on your keyboard, but you can check [this answer](https://webmasters.stackexchange.com/questions/8525/how-do-i-open-the-javascript-console-in-different-browsers#answer-77337) for more specific steps on various browsers.

Once you have the console open, paste the contents of [the export.js script](https://raw.githubusercontent.com/metallicity/AIDungeonExport/main/export.js) into the text prompt, and hit "enter". This will start the process of downloading your adventures. When it is finished, you can click the links to download the raw JSON data, or download a text file containing all adventures (with description, tags, world info, remember, etc.) in a human-readable format.
