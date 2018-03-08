/*!
 * image scale mode lib
 * Copyright 2018, sailaway@github
 *
 */

(function($) {
  'use strict';
  $.ImageShowModeSet = function(el, options) {
    var imagemode = this;
    var AppConfig = {};
    imagemode.$el = $(el);

    imagemode.fitMode = function(imgele,imgw,imgh,fitmode){
        var container = $(imgele).parent();
        var imgdivw = $(container).width();
        var imgdivh = $(container).height();
        var imgelew = imgdivw;
        var imgeleh = imgdivh;
        var adjustw = imgdivw * imgh < imgdivh * imgw;
        var offsettop = 0;
        var offsetleft = 0;
        if (adjustw) {
            imgeleh = imgh * imgdivw  / imgw
            if (fitmode=='center') {
                offsettop = (imgdivh - imgeleh)/2;
            } else if(fitmode == 'end'){
                offsettop = (imgdivh - imgeleh);
            }
        } else {
            imgelew = imgw * imgdivh / imgh
            if (fitmode=='center') {
                offsetleft = (imgdivw - imgelew)/2;
            } else if (fitmode=='end') {
                offsetleft = (imgdivw - imgelew);
            }
        }
        imgele.style.width  = imgelew+"px";
        imgele.style.height = imgeleh+"px";
        imgele.style.left   = offsetleft+"px"
        imgele.style.top    = offsettop+"px"
    }
    imagemode.fillMode = function(imgele,imgw,imgh,fillmode){
        var container = $(imgele).parent();
        var imgdivw = $(container).width();
        var imgdivh = $(container).height();
        var imgelew = imgdivw;
        var imgeleh = imgdivh;
        var adjustw = imgdivw * imgh > imgdivh * imgw;
        var offsettop = 0;
        var offsetleft = 0;
        if (adjustw) {
            imgeleh = imgh * imgdivw  / imgw

            if (fillmode=='center') {
                offsettop = (imgdivh - imgeleh)/2;
            } else if (fillmode=='end') {
                offsettop = (imgdivh - imgeleh);
            }            
        } else {
            imgelew = imgw * imgdivh / imgh
            if (fillmode=='center') {
                offsetleft = (imgdivw - imgelew)/2;
            } else if (fillmode=='end') {
                offsetleft = (imgdivw - imgelew);
            }
        }
        imgele.style.width  = imgelew+"px";
        imgele.style.height = imgeleh+"px";
        imgele.style.left   = offsetleft+"px"
        imgele.style.top    = offsettop+"px"
    }

    imagemode.setadjustmode = function(imgele,imgw,imgh){
        var container = $(imgele).parent();
        container.css('position','relative');
        $(imgele).css('position','absolute');
        if (AppConfig.imagemode == 'fitCenter') {
            imagemode.fitMode(imgele,imgw,imgh,'center')
        } else if(AppConfig.imagemode == 'fitStart'){
            imagemode.fitMode(imgele,imgw,imgh,'start')
        } else if(AppConfig.imagemode == 'fitEnd'){
            imagemode.fitMode(imgele,imgw,imgh,'end')
        } else if(AppConfig.imagemode == 'fillStart'){
            imagemode.fillMode(imgele,imgw,imgh,'start')
        } else if(AppConfig.imagemode == 'fillEnd'){
            imagemode.fillMode(imgele,imgw,imgh,'end')
        } else if(AppConfig.imagemode == 'fillCenter'){
            imagemode.fillMode(imgele,imgw,imgh,'center')
        }
    }

    // Add a reverse reference to the DOM object
    imagemode.$el.data('ImageShowModeSet', imagemode);
    imagemode.init = function() {
      AppConfig = $.extend({}, $.ImageShowModeSet.defaultOptions, options);
      imagemode.$el.each(function(){
        var img = new Image();
        img.src = $(this).attr("src") ;
        var w   = img.width;
        var h   = img.height;
        if(w > 0 && h > 0){
            imagemode.setadjustmode(this,w,h)
        } else {
            $(this).on('load',function(){
                var img = new Image();
                img.src = $(this).attr("src") ;
                var w   = img.width;
                var h   = img.height;  
                imagemode.setadjustmode(this,w,h)
            })
        }
      })
    };

    // fitStart 
    // fitEnd       
    // fitCenter:   居中显示全部内容，宽或高顶满
    // fillStart:   图像start部分填满容器，多余部分剪裁
    // fillEnd:     图像end部分填满容器，多余部分剪裁
    // fillCenter:  图像center部分填满容器，多余部分剪裁
    $.ImageShowModeSet.defaultOptions = {
        imagemode:'fitCenter',
    };
    imagemode.init();
  };

  $.fn.ImageShowModeSet = function(options) {
    return Object.create(new $.ImageShowModeSet(this, options));
  };
}(jQuery));

/**
 *
 * Object.create method for perform as a fallback if method not available.
 * The syntax just takes away the illusion that JavaScript uses Classical Inheritance.
 */
if(typeof Object.create !== 'function') {
  Object.create = function(o) {
    'use strict';

    function F() {}
    F.prototype = o;
    return new F();
  };
}