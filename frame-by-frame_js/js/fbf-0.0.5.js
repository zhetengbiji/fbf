/* ！~。~
 * fbf.js v0.0.5 (https://github.com/zhetengbiji/fbf);
 * 用于产生css3逐帧动画
 * 目前只应用于webkit内核浏览器
 * 作者微博：折腾笔记
 * 最后更新:2015-12-13;
 * 依赖jQuery;
 */
;
(function($, window) {

	window.FBF = function(ele, opt) {
		this.$element = $(ele);
		this.$fbfStyle = $('<style></style>');
		var config = {
			width: $(ele).width(),
			height: $(ele).height(),
			img: '',
			frames: 0,
			speed: 100,
			loop: false,
			start: 0,
			end: 'null',
		};
		this.options = $.extend({}, config, opt);
		$('head').append(this.$fbfStyle);
		this.init();
	}
	FBF.prototype = {
		init: function() {
			var $this = this;
			var $element = this.$element;
			var settings = this.options;
			var $fbfImg = $(new Image);
			this.$fbfImg = $fbfImg;
			this.ready = false;

			$fbfImg.one('load', function() {
				if (!$this.ready) $this.imgReady();
			});
			$fbfImg[0].src = settings.img;
		},
		imgReady: function() {
			this.ready = true;
			var $element = this.$element;
			var settings = this.options;
			var $fbfImg = this.$fbfImg;
			$element.css({
				'-webkit-animation': 'none',
				'width': settings.width + 'px',
				'height': settings.height + 'px',
				'background': 'url("' + $fbfImg[0].src + '") 0 0 no-repeat',
				'background-size': 'auto 100%',
			});
			settings.frames = (settings.frames || $fbfImg[0].width / settings.width);
			if (typeof settings.end !== "number") settings.end = settings.frames - 1;
		},
		reInit: function(opt) {
			this.options = $.extend({}, this.options, opt);
			this.init();
		},
		play: function(opt, callback) {
			var $this = this;
			var $element = this.$element;
			var $fbfStyle = this.$fbfStyle;
			var $fbfImg = this.$fbfImg;
			var animationName = 'f_b_f' + (new Date().getTime());
			var loop = 'infinite';
			$element.css('-webkit-animation', 'none');

			function play() {
				var settings = $.extend({}, $this.options, opt);
				var fNum = Math.abs(settings.end - settings.start);
				settings.loop ? settings.end += 1 : loop = 'normal forwards';
				$fbfStyle.html('@-webkit-keyframes ' + animationName + '{0% {-webkit-transform: translate3d(0, 0, 0);background-position: ' + (-settings.width * (settings.start)) + 'px 0;}100% {-webkit-transform: translate3d(0, 0, 0);background-position: ' + (-((settings.end)) * settings.width) + 'px 0;}}');
				$element.css({
					'-webkit-animation': animationName + ' ' + (fNum * settings.speed / 1000) + 's steps(' + fNum + ' , end) ' + loop
				});
				if (typeof callback === "function") setTimeout(callback, fNum * settings.speed);
			}
			if (this.ready) {
				play();
			} else {
				$fbfImg.one('load', function() {
					if (!$this.ready) $this.imgReady();
					play();
				});
			}

		}
	}
})(jQuery, window);
