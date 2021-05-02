# AIDungeonExport

This repo contains a script to export a user's [AI Dungeon](https://play.aidungeon.io) adventures.

It must be run in a browser console open on the AI Dungeon site, logged in as the user whose adventures you want to save. I acknowledge that this isn't a great approach in terms of safety (you generally shouldn't run scripts you don't understand on pages that you've logged into), but this is really the best way to make the export process as accessible to as many less technical users as possible.

To run the script, log into AI Dungeon, and on any page open the web console. Most desktop browsers can do this by pressing F12 on your keyboard, but you can check [this answer](https://webmasters.stackexchange.com/questions/8525/how-do-i-open-the-javascript-console-in-different-browsers#answer-77337) for more specific steps on various browsers.

Once you have the console open, paste the contents of [the export.js script](https://raw.githubusercontent.com/metallicity/AIDungeonExport/main/export.js) into the text prompt, and hit "enter". This will start the process of downloading your adventures. When it is finished, you can click the links to download the raw JSON data, or download a text file containing all adventures (with description, tags, world info, remember, etc.) in a human-readable format.

### Running as Bookmarklet (for Mobile Browsers)

You can also run the script through a bookmark, if you can't access the console, but the steps are a bit trickier:

 - First, go to [the page](https://raw.githubusercontent.com/metallicity/AIDungeonExport/main/export.js) with the raw script text, and select all and copy it.

 - Then, bookmark the page (or any page really), and then edit the bookmark.

 - Rename the bookmark to something like "AIDungeon Export"

 - Delete the bookmark url, and replace it with: `javascript:(function(){})()`.

 - Then paste the script contents in between the `{}` in the url.

 - Hit the save/done button, or exit the bookmark edit view if there is no such button.

 - Navigate to the AI Dungeon site in your browser, and make sure you are logged in.

 - Type the name of the bookmark you chose earlier in the url bar (or otherwise bring up the bookmark) and select it.

 - The script will start running.

 - When it is finished, you can download the adventure text, or the raw JSON data.

