/**
 * 
 * jQuery_readStatus by SunKao
 * 
 */
;(function($) {
	$(window).scrollTop(0);
	$.fn.readstatus = function(settings) {
		//default value
		var _defaultSettings = {
						        pic: 'http://www.iconsdb.com/icons/download/orange/sun-2-512.gif',
						        bottom: 10,
						        left: '10',
						        maxWidth: 50,
								maxHeight: 50,
								appendTo: 'body',
								float:'left'
							    };	
		var _settings = $.extend(_defaultSettings, settings);
		//產生圖片並插入至article
		var img = $('<img>')
					.attr({
						'id': 'status',
						'src': _settings.pic
					})
					.css({
						'bottom': _settings.bottom+'px',
						'left': function (){
							var value;
							switch(_settings.float){
								case 'left':
									value = _settings.left;
								break;
								case 'right':
									value = $(window).width()-_settings.left-_settings.maxWidth;
								break;									
							}
							return value+'px';
						},
						'max-height': _settings.maxWidth+'px',
						'max-height': _settings.maxHeight+'px',
						'position': 'fixed'
					})
					.appendTo(_settings.appendTo);
		//等圖片load進來再執行，必免取不到高度
		$( "img#status" ).load(function() {
			var window_height = $(window).height();//視窗若視高度

			var div_height = $('#status').height();//元件高度
			var div_bottom = $('#status').css('bottom');
			div_bottom = parseInt(div_bottom, 10);//取得元件與邊框留白的高度，型態為數字
			var document_height = $(document).height();//文件高度
			var init_scrollBottom = $(document).scrollTop()+window_height;//一開始scrollBar下緣高度

			var init_gap = document_height - init_scrollBottom;//scrollBar下緣與文章下緣差距
			var scrollBottom,persent;

			$(document).scroll(function(event) {
				scrollBottom = ($(document).scrollTop()+window_height)-init_scrollBottom;//判斷滾動後scrollBar下緣與一開始scrollBar下緣高度的差
				persent = scrollBottom / init_gap;//高度差與初始差距的比例
				persent = ((window_height-div_bottom-div_height-div_bottom)*persent)+div_bottom;//((視窗高度-上方留白-元件高度-下方留白)*比例)+留白
				$('#status').css('bottom', persent+'px');
				
			});	
		});
	};
	
})(jQuery);