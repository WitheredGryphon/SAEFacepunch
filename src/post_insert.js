var title = $('#breadcrumb #lastelement').text().trim();
if(title == 'Reply to Thread' || title == 'Edit Post' || title == 'Post New Thread')
	$('#vB_Editor_001_save').after("\n<input type='button' class='button' value='Add Emotes' id='sae_addemotes'>");
else
	$('#qr_preview').after("\n<input type='button' value='Add Emotes' id='sae_addemotes' style='padding: 2px 3px;'>");
var unsafeWindow = this['unsafeWindow'] || window;
var fuse = new Fuse(emoteText);

$(document).ready(function() {
	$('#sae_addemotes').click(function(e) {
		var text = $('textarea[role=textbox]').val();
		Object.keys(emotes).forEach(function(emote) {
			text = text.replace(new RegExp(emote.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&'), 'g'), '[img]' + emotes[emote] + '[/img]');
		});
		$('textarea[role=textbox]').val(text);
	});
	var editor = $('#vB_Editor_QR');
	if(title == 'Reply to Thread' || title == 'Edit Post' || title == 'Post New Thread') editor = $('#vB_Editor_001');
	editor.after("<style>" + stylesheet + "</style>");
	editor.after("<div id='sae_emotesdialog_bg'></div>");
	$('#sae_emotesdialog_bg').after("<div id='sae_emotesdialog'></div>");
	$('#sae_emotesdialog').append("<div id='sae_emotesdialog_header'>Emoticons</div>");
	$('#sae_emotesdialog_header').append("<a href='javascript:void(null);' id='sae_emotesdialog_close'>&times;</a>");
	$('#sae_emotesdialog_bg').click(hideDialog);
	$('#sae_emotesdialog_close').click(hideDialog);
	$('#sae_emotesdialog').append("<div id='sae_emotesdialog_container'></div>");

	$('#sae_emotesdialog_container').append("<div class='sae_emotesdialog_sectionheader'>Facepunch Emoticons</div>");
	$('#sae_emotesdialog_container').append("<div id='sae_emotesdialog_fpcontainer'></div>");
	fpEmotes.forEach(function(emote) {
		var img = 'http://facepunch.com/fp/emoot/' + emote.replace(/:/g, '') + '.gif';
		emoticonElement('#sae_emotesdialog_fpcontainer', 'fp', emote, img);
	});

	$('#sae_emotesdialog_container').append("<div class='sae_emotesdialog_sectionheader'>Something Awful Emoticons</div>");
	$('#sae_emotesdialog_container').append("<input type='text' id='sae_emotesdialog_sasearch' placeholder='Search Emoticons'>");
	$('#sae_emotesdialog_container').append("<div id='sae_emotesdialog_sasearchcontainer'></div>");
	$('#sae_emotesdialog_sasearch').keypress(function(e) {
		if(e.which != 13) return;
		var text = $('#sae_emotesdialog_sasearch').val();
		var results = fuse.search(text);
		var resultEmotes = [];
		(results.length > 10 ? results.slice(0, 9) : results).forEach(function(result) {
			resultEmotes.push(emoteText[result]);
		});
		$('#sae_emotesdialog_sasearchcontainer').empty();
		resultEmotes.forEach(function(emote) {
			emoticonElement('#sae_emotesdialog_sasearchcontainer', 'sa', emote, emotes[emote]);
		});
		$('#sae_emotesdialog_container').scrollTop($('#sae_emotesdialog_container')[0].scrollHeight);
		return false;
	});

	CKEDITOR.on('instanceReady', function(){
		$('a[title=Smiley]').attr('onclick', '').attr('onkeydown', '').attr('onfocus', '');
		$('a[title=Smiley]').click(showDialog);
	});
	function hideDialog()
	{
		$('#sae_emotesdialog').css('display', 'none');
		$('#sae_emotesdialog_bg').css('display', 'none');
	}
	function showDialog()
	{
		$('#sae_emotesdialog').css('display', 'block');
		$('#sae_emotesdialog_bg').css('display', 'block');
	}
	function insertEmoticon(emote)
	{
		var location = $('textarea[role=textbox]')[0].selectionStart;
		if(!location) location = 0;
		var text = $('textarea[role=textbox]').val();
		text = text.substring(0, location) + (fpEmotes.indexOf(emote) != -1 ? emote : '[img]' + emotes[emote] + '[/img]') + text.substring(location, text.length); 
		$('textarea[role=textbox]').val(text);
	}
	function emoticonElement(container, id, emote, img)
	{
		$(container)
			.append("<div class='sae_emotesdialog_emoticon' id='sae_"+id+"emote_"+emote.replace(/:/g, '')+"' title='"+emote+"'><div class='sae_emotesdialog_emoticon_container'><img src='"+img+"' alt='"+emote+"'></div><div class='sae_emotesdialog_emoticon_text'>"+emote+"</div></div>")
		$('#sae_'+id+'emote_'+emote.replace(/:/g, '')).click(function(e) {
			insertEmoticon(emote);
		});
	}
});