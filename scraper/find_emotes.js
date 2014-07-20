var request = require('request'),
    cheerio = require('cheerio'),
    fs      = require('fs'),
    imgur   = require('imgur-node-api');

require('dotenv').load();
imgur.setClientID(process.env.IMGUR_API_KEY);

var cache = {};
if(fs.existsSync('imgur_cache.json'))
	cache = JSON.parse(fs.readFileSync('imgur_cache.json'));
console.log('Loaded ' + Object.keys(cache).length + ' emoticons from the imgur cache.');

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

function batchUploadImgur(emotes, callback)
{
	var imgurEmotes = {};
	var stop = false;
	Object.keys(emotes).forEach(function(e) {
		if(cache[e])
			return imgurEmotes[e] = cache[e];
		if(stop) return;
		imgur.upload(emotes[e], function(err, res) {
			if(err) throw err;
			if(!res.success)
			{
				stop = true;
				return callback(imgurEmotes);
			}
			imgurEmotes[e] = res.data.link;
			console.log('Uploaded emote ' + Object.keys(imgurEmotes).length + ' / ' + Object.keys(emotes).length);
			if(Object.keys(imgurEmotes).length >= Object.keys(emotes).length)
				callback(imgurEmotes);
		});
	});
}

findSomethingAwfulEmotes(function(err, saEmotes) {
	if(err) throw err;
	fpEmotes.forEach(function(k) {
		if(saEmotes[k])
			delete saEmotes[k];
	});
	/*batchUploadImgur(saEmotes, function(imgurEmotes) {
		cache = imgurEmotes;
		fs.writeFileSync('imgur_cache.json', JSON.stringify(imgurEmotes));
		console.log('Uploaded ' + Object.keys(cache).length + ' emoticons to imgur.');	*/
		var output = '\nvar emotes = ' + JSON.stringify(saEmotes) + ';\n';
		output += 'var emoteText = ' + JSON.stringify(Object.keys(saEmotes)) + ';\n';
		output += 'var fpEmotes = ' + JSON.stringify(fpEmotes) + ';\n';
		fs.writeFileSync('emotes.js', output);
	//});
});