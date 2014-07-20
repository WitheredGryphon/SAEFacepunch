# SAEFacepunch

Since Garry purged the emoticons, the forums are boring. There's no :colbert:, no :saddowns:, not even our good friend :911:. The previous solution, sae.tweek.us, worked somewhat, but emoticons only appeared for users who had the userscript installed (which isn't available anymore). That's where this script comes in.

Basically, it adds an "add emotes" button between the "Go Advanced" and "Cancel" buttons on the quick reply form. Nothing appears on the advanced form because no one uses it and the way that editor works (with an iframe, for some reason) makes it too much of an issue to implement it. When the button is clicked, it translates any Something Awful emotes into image tags to that emote.

## Installation

To get the latest version with no fuss, you're going to want [saefacepunch.user.js](https://github.com/cpancake/SAEFacepunch/raw/master/saefacepunch.user.js). Install that with Greasemonkey (Firefox) or Tampermonkey (Chrome).

## "Building"

To keep the avatar list up to date, included (in the `scraper` directory) is a node.js program that will download a list of emoticons from Something Awful (ignoring the ones that Facepunch still has), and write them to emotes.js in `src`. 

You can build an up-to-date version of saefacepunch.user.js by running `make`. This will run the scraper and generate the full userscript.