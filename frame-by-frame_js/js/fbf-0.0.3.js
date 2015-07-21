/* ！~。~
 * fbf.js-0.0.3;
 * 用于产生css3逐帧动画
 * 目前只应用于webkit内核浏览器
 * 作者微博：折腾笔记
 * date:2015-7-21;
 * 依赖jq;
 * 压缩版本采用YUI Compressor
 */
;(function ($) {
	$.fn.fbf = function(options,callback) {
		var $this=this;
		$this.css('-webkit-animation','none');
		var config={
			width:$this.width(),//舞台宽度默认元素宽度----->可选参数
			height:$this.height(),//舞台高度默认元素高度----->可选参数
			img:'',//图片地址(如用相对路径请以实际发生动画的页面为准)------------------------------->必填
			frames:0,//总帧数，默认自动计算----->可选参数
			speed:100,//帧速，默认0.1秒----->可选参数
			loop:false,//循环，默认关闭----->可选参数
			start:0,//开始帧，0为第一帧------------------------------->必填
			end:0,//结束帧,缺省为0------------------------------->必填
		}
		var settings = $.extend({},config, options);//将一个空对象做为第一个参数,以保护默认config不受污染
		($('#f_b_f_s').length)||$('head').append('<style id="f_b_f_s">');		
		var $bfbs=$('#f_b_f_s'),
			bfbsh='',
			bfbimg=new Image,
			loop='infinite';
		settings.loop?settings.end+=1:loop='normal forwards';
		bfbimg.src=settings.img;
		bfbimg.load;
		$(bfbimg).on('load',function(){
			settings.frames=(settings.frames||bfbimg.width/settings.width);
			bfbsh='@-webkit-keyframes f_b_f{0% {background-position: '+(-settings.width*(settings.start))+' 0;}100% {background-position: '+(-((settings.end))*settings.width)+'px 0;}}';
			$bfbs.html(bfbsh);			
			$this.css({
				'width':settings.width+'px',
				'height':settings.height+'px',
				'background':'url("'+bfbimg.src+'") 0 0 no-repeat',
				'-webkit-animation':'f_b_f '+(((settings.end||settings.frames)-settings.start)*settings.speed/1000)+'s steps('+((settings.end)-settings.start)+' , end) '+loop
			});
			if(typeof callback == "function")		
			setTimeout(callback,((settings.end||settings.frames)-settings.start)*settings.speed);
			
		});	
		return $this;
	}
})(jQuery);

