var request = require('request'),
    cheerio = require('cheerio'),
    fs      = require('fs');

var fpEmotes = [":rolleyes:", ":rolleye:", ":rock:", ":zoid:", ":quagmire:", ":yarr:", ":pwn:", ":words:", ":nws:", ":wink:", ":eng101:", ":v:", ":downs:", ":tinfoil:", ":dance:", ":suicide:", ":smile:"];

function findSomethingAwfulEmotes(callback)
{
	request('http://forums.somethingawful.com/misc.php?action=showsmilies', function(err, response, body) {
		if(err || response.statusCode != 200)
			callback('Unable to fetch SA emotes: ' + err);
		var emotes = {};
		var $ = cheerio.load(body);
		$('.smilie').each(function(_, e) {
			var container = $(e);
			var name = container.find('.text').text();
			if(name.length == 2) return; // screw :( and :)
			emotes[name] = container.find('img').attr('src');
		});
		callback(null, emotes);
	});
}

findSomethingAwfulEmotes(function(err, saEmotes) {
	if(err) throw err;
	fpEmotes.forEach(function(k) {
		if(saEmotes[k])
			delete saEmotes[k];
	});
	fs.writeFileSync('emotes.js', '\nvar emotes = ' + JSON.stringify(saEmotes) + ';\n');
});