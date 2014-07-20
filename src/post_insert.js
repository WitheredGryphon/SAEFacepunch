$('#qr_preview').after("\n<input type='button' value='Add Emotes' id='sae_addemotes' style='padding: 2px 3px;'>");
$(document).ready(function() {
	$('#sae_addemotes').click(function(e) {
		var text = $('textarea[role=textbox]').val();
		Object.keys(emotes).forEach(function(emote) {
			text = text.replace(new RegExp(emote.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&'), 'g'), '[img]' + emotes[emote] + '[/img]');
		});
		$('textarea[role=textbox]').val(text);
	});
});