(function($) {
	var methods = {
			init: function(settings) {
						var op = {timeout:1000, clearall: false};
						settings = jQuery.extend(op, settings);
						var startit = false;
						var $document = $(document);
						var toastglobals = $document.data('toast.globals');
						if (toastglobals==null) {
							$document.data('toast.globals', toastglobals={queue: new Array()});
						}
						var toastque = toastglobals.queue;

						startit = toastque.length==0;
						this.each(function(){
							var $this = $(this);
							$this.showIt = function() {
								var html = $(('<div class="pp-toast">' +
								           '<div class="pp-toast-tl"><div class="pp-toast-tr"><div class="pp-toast-tc"></div></div></div>' +
								           '<div class="pp-toast-ml"><div class="pp-toast-mr"><div class="pp-toast-mc"></div></div></div>' +
								           '<div class="pp-toast-bl"><div class="pp-toast-br"><div class="pp-toast-bc"></div></div></div>' +
								           '</div>'));
								var res = $(".pp-toast-mc", html).append($this);
								$(document.body).append(html);
								
								var _win = jQuery(window);
								var resizeDialog = function() {
									var cx = _win.width();
									var cy = _win.height();
									var cw = html.width();
									var ch = html.height();
									html.css('top', Math.max(0,(cy - Math.max(ch+10, 100) )) + _win.scrollTop());
									html.css('left', Math.max(0, (cx - cw) / 2));
								}
								
								_win.bind('resize.toast', resizeDialog);
								_win.bind('scroll.toast', resizeDialog);
								
								var cw = html.width();
								var ch = html.height();
								html.css('top', Math.max(0,(_win.height() - Math.max(ch+10, 100))) + _win.scrollTop());
								html.css('left', Math.max(0, (_win.width() - cw) / 2));
								html.fadeIn('slow');
								html.hideIt = function(){
									html.fadeOut('slow', function(){
									  _win.unbind('resize.toast', resizeDialog);
									  _win.unbind('scroll.toast', resizeDialog);
									  html.remove();
									  if (jQuery.browser.msie) {
										html[0].outerHTML="";
									  }	
									  toastque.shift();
									  if (toastque.length>0)
										  toastque[0].showIt();
									});
								};
								setTimeout(html.hideIt, settings.timeout);
							};
							toastque.push($this);
						});
						
						if (startit) {
							setTimeout(function() { toastque[0].showIt(); }, 0);
						}
					}
	};
	
	$.fn.toast = function( method ) {
	    // Method calling logic
	    if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.toast' );
	    }    
	  
	  };
})(jQuery);