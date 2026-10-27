/*
 * Created by Pixel-Mafia
 * www.pixel-mafia.com
 * Simple Slider
*/
"use strict";
var	liza_simple_slider_array = [],
    $liza_ss_wrapper = jQuery('.liza_simple_slider_wrapper');

$liza_ss_wrapper.each(function(){
    var $this_obj = jQuery(this);
    liza_simple_slider_array['liza_slider_' + $this_obj.attr('data-uniqid')] = {};
    var this_array = liza_simple_slider_array["liza_slider_" + $this_obj.attr('data-uniqid')];        
    this_array.id = $this_obj.attr('data-uniqid');
    this_array.dom = $this_obj;
    this_array.slider = $this_obj.find('.liza_simple_slider');
    this_array.active_slide = 0;
    this_array.max = $this_obj.find('.liza_simple_slide').length;
    this_array.state = 'loading';

    // Options
    this_array.autoplay = $this_obj.attr('data-autoplay');
    this_array.interval = $this_obj.attr('data-interval');
    this_array.content_type = $this_obj.attr('data-content');
    this_array.height = $this_obj.attr('data-height');

    // Init
    this_array.init = function() {
        var this_obj = this;
        this.layout(this,'');

		if (this_obj.max == 1) {
			// Only One Image
			this_obj.dom.addClass('liza_only_one_image_slider liza_simple_slider_started');
			this_obj.dom.find('.liza_simple_slide1').addClass('active simple_slide_loaded').removeClass('simple_slide_loader');
            this_array.active_slide = 1;
		}

        // Bind Events
        this_obj.dom.find('.liza_simple_slider_prev').on('click', function() {
            var $this = jQuery(this),
                $this_w = $this.parents('.liza_simple_slider_wrapper'),
                $this_array = liza_simple_slider_array['liza_slider_' + $this_w.attr('data-uniqid')];
            $this_array.move.call($this_array, -1);
        });
        
        this_obj.dom.find('.liza_simple_slider_next').on('click', function() {
            var $this = jQuery(this),
                $this_w = $this.parents('.liza_simple_slider_wrapper'),
                $this_array = liza_simple_slider_array['liza_slider_' + $this_w.attr('data-uniqid')];
            $this_array.move.call($this_array, 1);
        });
        
        this_obj.dom.find('.liza_simple_slider_fullview').on('click', function() {
			if (this_obj.dom.hasClass('liza_stand_alone_slider')) {
				liza_html.toggleClass('liza_fullview_mode');
			} else {
				this_obj.dom.toggleClass('liza_fullview_mode');
			}
        });
        
        this_obj.dom.on('mouseenter',function(){
            this_obj.dom.addClass('liza_slider_kbrd');
        });
        this_obj.dom.on('mouseleave',function(){
            this_obj.dom.removeClass('liza_slider_kbrd');
        });
        
        this_obj.dom.addClass('liza_simple_slider_started').removeClass('presetup');
        this_obj.dom.find('.simple_slide_loader').removeClass('simple_slide_loader').addClass('simple_slide_loaded');

        // Autoplay
        if (this_obj.autoplay == 'on' && this_obj.max > 1) {
            this_obj.set_interval = setInterval( function() {
                this_obj.move.call(this_obj,1);
            }, parseInt(this_obj.interval,10));
            clearInterval(this_obj.set_interval);
        }
        this_obj.move.call(this_obj,1);
    }

    // ReLayout
    this_array.layout = function(type) {
        var this_obj = this;
        
        // Resize Slider and Slides
		if (this_obj.height == '100%') {
			if (jQuery('#wpadminbar').length) {
				this_obj.dom.css('height', 'calc(100vh - ' + jQuery('#wpadminbar').height() + 'px)');
                this_obj.slider.css('height', 'calc(100vh - ' + jQuery('#wpadminbar').height() + 'px)');
			} else {
				this_obj.dom.css('height', '100vh');
                this_obj.slider.css('height', '100vh');
			}
			
		} else {
			this_obj.dom.height(parseInt(this_obj.height,10));
			this_obj.slider.height(parseInt(this_obj.height,10));
		}
        if (this_obj.dom.hasClass('liza_stand_alone_slider')) {
            if (jQuery('#wpadminbar').length) {
                this_obj.dom.css('top', jQuery('#wpadminbar').height()+'px');
            }
        }
    }

    // Move Slider
    this_array.move = function(dir) {
        var this_obj = this;
        if (dir > 0)
            this_obj.active_slide++;
        if (dir < 0)
            this_obj.active_slide--;
        if (this_obj.active_slide < 1) 
            this_obj.active_slide = this_obj.max;
        if (this_obj.active_slide > this_obj.max) 
            this_obj.active_slide = 1;
        
        if (this_obj.autoplay == 'on' && this_obj.max > 1) {
            clearInterval(this_obj.set_interval);
        }
        
        var $active_slide = this_obj.slider.find('[data-count='+ this_obj.active_slide +']');
        this_obj.slider.find('.active').removeClass('active');
        $active_slide.addClass('active');
        
        // Set Content
        if (this_obj.dom.find('.liza_simple_slider_content').length && this.content_type !== 'custom_content') {
            var $content = this_obj.dom.find('.liza_simple_slider_title'),
                content_text = $active_slide.attr('data-title');
            $content.fadeOut(300, function () {
                $content.text(content_text);
                $content.fadeIn(300);
            });            
        }
        
        if (this_obj.autoplay == 'on' && this_obj.max > 1) {
            this_obj.set_interval = setInterval( function() {
                this_obj.move.call(this_obj,1);
            }, parseInt(this_obj.interval,10));
        }
    }

});

jQuery(document).ready(function(){
    if ($liza_ss_wrapper.length)
        $liza_ss_wrapper.each(function(){
            var $this = jQuery(this),
                $this_array = liza_simple_slider_array['liza_slider_' + $this.attr('data-uniqid')];
            $this_array.init.call($this_array);
        });
});

jQuery(window).resize(function () {
    if ($liza_ss_wrapper.length) {
        $liza_ss_wrapper.each(function(){
            var $this = jQuery(this),
                $this_array = liza_simple_slider_array['liza_slider_' + $this.attr('data-uniqid')];
            $this_array.layout.call($this_array);
        });
    }
});

jQuery(document.documentElement).keyup(function (event) {
    if (jQuery('body').find('.liza_slider_kbrd').length) {
        var $this = jQuery('body').find('.liza_slider_kbrd'),
            $this_array = liza_simple_slider_array['liza_slider_' + $this.attr('data-uniqid')];
        if ((event.keyCode == 37)) {
            $this_array.move.call($this_array, -1);
        }
        if ((event.keyCode == 39)) {
            $this_array.move.call($this_array, 1);
        }
    }
});
