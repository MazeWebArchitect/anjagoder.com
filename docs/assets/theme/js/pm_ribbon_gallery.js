/*
 * Created by Pixel-Mafia
 * www.pixel-mafia.com
 * Ribbon Slider
*/
"use strict";

var	liza_ribbon_array = [],
    $liza_rs_wrapper = jQuery('.liza_ribbon_slider_wrapper');

$liza_rs_wrapper.each(function(){
    var $this_obj = jQuery(this);
    liza_ribbon_array['liza_ribbon_' + $this_obj.attr('data-uniqid')] = {};
    var this_array = liza_ribbon_array["liza_ribbon_" + $this_obj.attr('data-uniqid')];        
    this_array.id = $this_obj.attr('data-uniqid');
    this_array.dom = $this_obj;
    this_array.slider = $this_obj.find('.liza_ribbon_slider');
    this_array.active_slide = 0;
    this_array.max = $this_obj.find('.liza_ribbon_slide').length;
    this_array.state = 'loading';
    this_array.slides = [];

    // Options
    if ($this_obj.attr('data-pad') == '') {
        this_array.margin = 0;
    } else {
        this_array.margin = $this_obj.attr('data-pad');
    }
    this_array.autoplay = $this_obj.attr('data-autoplay');
    this_array.interval = $this_obj.attr('data-interval');
    this_array.transition = $this_obj.attr('data-transition');
    this_array.height = $this_obj.attr('data-height');

    // Init
    this_array.init = function() {
        var this_obj = this;
        this.layout(this,'');

        jQuery('body').append('\
            <style>\
                .liza_ribbon_gal_'+ this.id +' .liza_ribbon_slide {\
                    transition: transform '+ this.transition +'ms, opacity 600ms;\
                }\
            </style>');
        
        this_obj.dom.find('.liza_ribbon_slide').each(function(){
            this_obj.slides[jQuery(this).attr('data-count')] = {};
            var this_slide = this_obj.slides[jQuery(this).attr('data-count')],
                $this = jQuery(this);
            
            this_slide.src = $this.attr('data-src');
            this_slide.title = $this.attr('data-title');
            this_slide.ratio = $this.attr('data-ratio');
            this_slide.descr = $this.attr('data-descr');
            
            $this.remove();
        });
        
        // Bind Events
        this_obj.dom.find('.liza_ribbon_prevSlide').on('click', function() {
            var $this = jQuery(this),
                $this_w = $this.parent('.liza_ribbon_slider_wrapper'),
                $this_array = liza_ribbon_array['liza_ribbon_' + $this_w.attr('data-uniqid')];
            $this_array.move.call($this_array, -1);
        });
        
        this_obj.dom.find('.liza_ribbon_nextSlide').on('click', function() {
            var $this = jQuery(this),
                $this_w = $this.parent('.liza_ribbon_slider_wrapper'),
                $this_array = liza_ribbon_array['liza_ribbon_' + $this_w.attr('data-uniqid')];
            $this_array.move.call($this_array, 1);
        });
        
        this_obj.dom.on('mouseenter',function(){
            this_obj.dom.addClass('liza_ribbon_kbrd');
        });
        this_obj.dom.on('mouseleave',function(){
            this_obj.dom.removeClass('liza_ribbon_kbrd');
        });

        // Init First Run
        this.active_slide = 1;
        var s3 = 1;
        var s2 = this.max;
        var s1 = this.max - 1;
        s1 = this.check.call(this_obj, s1);
        var s4 = s3 + 1;
        s4 = this.check.call(this_obj, s4);
        var s5 = s4 + 1;
        s5 = this.check.call(this_obj, s5);
        
        var s1_html = this.get.call(this_obj, s1),
            s2_html = this.get.call(this_obj, s2),
            s3_html = this.get.call(this_obj, s3),
            s4_html = this.get.call(this_obj, s4),
            s5_html = this.get.call(this_obj, s5);
        
        this.slider.append(s1_html).append(s2_html).append(s3_html).append(s4_html).append(s5_html);
        this.dom.find('[data-count="1"]').addClass('active');
        
        this_obj.layout.call(this_obj);
        
        // Autoplay
        if (this_obj.autoplay == 'on') {
            this_obj.set_interval = setInterval( function() {
                this_obj.move.call(this_obj,1);
            }, parseInt(this_obj.interval,10));
        }
    }

    // Load Images
    this_array.load = function() {
        
    }

    // ReLayout
    this_array.layout = function(type) {
        var this_obj = this;
        
        // Resize Slider and Slides
		if (this_obj.height == '100%') {
			if (jQuery('#wpadminbar').length) {
				this_obj.dom.css('height', 'calc(100vh - ' + jQuery('#wpadminbar').height() + 'px)');
			} else {
				this_obj.dom.css('height', '100vh');
			}
			this_obj.slider.css('height', '100vh');
			this_obj.dom.find('.liza_ribbon_slide').css('height', '100vh');
			this_obj.dom.find('.liza_ribbon_slide').each(function(){
				jQuery(this).width(jQuery(this).height()*jQuery(this).attr('data-ratio'));
			});
		} else {
			this_obj.dom.height(parseInt(this_obj.height,10));
			this_obj.slider.height(parseInt(this_obj.height,10));
			this_obj.dom.find('.liza_ribbon_slide').height(parseInt(this_obj.height,10));
			this_obj.dom.find('.liza_ribbon_slide').each(function(){
				jQuery(this).width(jQuery(this).height()*jQuery(this).attr('data-ratio'));
			});
		}
        if (this_obj.dom.hasClass('liza_stand_alone_slider')) {
            if (jQuery('#wpadminbar').length) {
                this_obj.dom.css('top', jQuery('#wpadminbar').height()+'px');
            }
        }
        
        this_obj.set.call(this_obj);
    }

    // Set
    this_array.set = function() {
        var this_obj = this,
            margin = parseInt(this_obj.margin,10);
        
        var s1 = jQuery(this.slider.find('.liza_ribbon_slide')[0]),
            s2 = jQuery(this.slider.find('.liza_ribbon_slide')[1]),
            s3 = jQuery(this.slider.find('.liza_ribbon_slide')[2]),
            s4 = jQuery(this.slider.find('.liza_ribbon_slide')[3]),
            s5 = jQuery(this.slider.find('.liza_ribbon_slide')[4]);

        var s1_transform = -1 * (s3.width()/2 + s2.width() + s1.width()) - margin*2,
            s2_transform = -1 * (s3.width()/2 + s2.width()) - margin,
            s3_transform = -0.5 * s3.width(),
            s4_transform = 0.5 * s3.width() + margin,
            s5_transform = 0.5 * s3.width() + s4.width() + margin*2;
        
        s1.css('transform', 'translateX(' + s1_transform + 'px)');
        s2.css('transform', 'translateX(' + s2_transform + 'px)');
        s3.css('transform', 'translateX(' + s3_transform + 'px)');
        s4.css('transform', 'translateX(' + s4_transform + 'px)');
        s5.css('transform', 'translateX(' + s5_transform + 'px)');
        
        // Set Content
        if (this_obj.dom.find('.liza_ribbon_title_content').length) {
            var $content = this_obj.dom.find('.liza_ribbon_title'),
                content_text = s3.attr('data-title');
            $content.fadeOut(300, function () {
                $content.text(content_text);
                $content.fadeIn(300);
            });            
        }
    }

    // Get Slide
    this_array.get = function(slide_id, option) {
        if (option == 'new') {
            var this_new_class = 'liza_new_slide';
        } else {
            var this_new_class = '';
        }
        var this_src = this.slides[slide_id].src,
            this_title = this.slides[slide_id].title,
            this_descr = this.slides[slide_id].descr,
            this_ratio = this.slides[slide_id].ratio,
            return_html = '\
                <div class="liza_ribbon_slide '+ this_new_class +'" data-count="'+ slide_id +'" data-title="'+ this_title +'" data-descr="'+ this_descr +'" data-ratio="'+ this_ratio +'">\
                    <img alt="'+ this_title +'" src="'+ this_src +'" />\
				    <div class="liza_ribbon_overlay"></div>\
                    <div class="liza_ribbon_overlay_active"></div>\
                </div>\
            ';
        return return_html;
    }

    // Overflow Check
    this_array.check = function(check_item) {
        if (check_item > this.max)
            check_item = 1;
        if (check_item < 1)
            check_item = this.max;
        
        return check_item;
    }

    // Move Slider
    this_array.move = function(dir) {
        var this_obj = this;
        
        this_obj.slider.find('.liza_ribbon_slide.active').removeClass('active');
        this_obj.slider.find('.liza_new_slide').removeClass('liza_new_slide');
        
        if (this_obj.autoplay == 'on') {
            clearInterval(this_obj.set_interval);
        }

        if (dir > 0) {
            this_obj.slider.find('.liza_ribbon_slide')[0].remove();
            var last_slide = parseInt(this_obj.slider.find('.liza_ribbon_slide:last').attr('data-count'),10),
                add_slide = last_slide + 1;
        } else if (dir < 0) {
            this_obj.slider.find('.liza_ribbon_slide')[4].remove();
            var last_slide = parseInt(this_obj.slider.find('.liza_ribbon_slide:first').attr('data-count'),10),
                add_slide = last_slide - 1;
        }
        
        add_slide = this_obj.check.call(this_obj,add_slide);
        var add_slide_html = this.get.call(this_obj, add_slide, 'new');
        
        if (dir > 0) {
            this_obj.slider.append(add_slide_html);
        } else if (dir < 0) {
            this_obj.slider.prepend(add_slide_html);
        }
        
        jQuery(this_obj.slider.find('.liza_ribbon_slide')[2]).addClass('active');
        this_obj.set.call(this_obj);
        
        if (this_obj.autoplay == 'on') {
            this_obj.set_interval = setInterval( function() {
                this_obj.move.call(this_obj,1);
            }, parseInt(this_obj.interval,10));
        }
    }

});

jQuery(document).ready(function(){
    if ($liza_rs_wrapper.length) {
        $liza_rs_wrapper.each(function(){
            var $this = jQuery(this),
                $this_array = liza_ribbon_array['liza_ribbon_' + $this.attr('data-uniqid')];
            $this_array.init.call($this_array);
        });
    }
});

jQuery(window).resize(function () {
    if ($liza_rs_wrapper.length) {
        $liza_rs_wrapper.each(function(){
            var $this = jQuery(this),
                $this_array = liza_ribbon_array['liza_ribbon_' + $this.attr('data-uniqid')];
            $this_array.layout.call($this_array);
        });
    }
});

jQuery(document.documentElement).keyup(function (event) {
    if (jQuery('body').find('.liza_ribbon_kbrd').length) {
        var $this = jQuery('body').find('.liza_ribbon_kbrd'),
            $this_array = liza_ribbon_array['liza_ribbon_' + $this.attr('data-uniqid')];
        if ((event.keyCode == 37)) {
            $this_array.move.call($this_array, -1);
        }
        if ((event.keyCode == 39)) {
            $this_array.move.call($this_array, 1);
        }
    }
});

