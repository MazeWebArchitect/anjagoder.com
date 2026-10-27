/*
 * Testimonials Flow
 * Created by Pixel-Mafia
 * www.pixel-mafia.com
*/
"use strict";

var liza_ft_array = [],
	$liza_testimonials_flow = jQuery('.liza_testimonials_flow');

$liza_testimonials_flow.each(function() {
	var $this = jQuery(this);
	liza_ft_array['liza_ft_'+$this.attr('data-uniqid')] = {};
	var liza_ft_object = liza_ft_array['liza_ft_'+$this.attr('data-uniqid')];
	
	liza_ft_object.id = $this.attr('data-uniqid');
	liza_ft_object.obj = $this;
	liza_ft_object.size = $this.find('.liza_testimonials_flow_item').length;
	liza_ft_object.active_slide = 0;
	
	// Core Object Functions
	liza_ft_object.init = function() {
		
		// Init Counter
		var counter = 1;
		this.obj.find('.liza_testimonials_flow_item').each(function(){
			jQuery(this).attr('data-count', counter).addClass('liza_testimonials_flow_slide' + counter);
			counter++;
		});
		this.obj.addClass('module_loaded');
		
		// Init Controls
		var this_object = this;
		this.obj.find('.liza_testimonials_flow_prev').on('click', function(){		
			this_object.move.call(this_object, -1);
		});
		this.obj.find('.liza_testimonials_flow_next').on('click', function(){		
			this_object.move.call(this_object, 1);
		});

		// Init Touch Events
		this.obj.on("swiperight", function () {
			this_object.move.call(this_object, -1);
		});
		this.obj.on("swipeleft", function () {
			this_object.move.call(this_object, 1);
		});
		
        // Init Dots
        var $dots_container = this.obj.find('.liza_testimonials_flow_dots'),
            counter = 1;
        this.obj.find('.liza_testimonials_flow_item').each(function(){
            var $this = jQuery(this);
            $this.attr('data-count', counter).addClass('liza_testimonials_flow_slide' + counter);
            $dots_container.append('<a href="javascript:void(0)" class="liza_testimonials_flow_dot liza_testimonials_flow_dot'+ counter +'" data-count="'+ counter +'"></a>');
            counter++;
        });
        jQuery(this).addClass('module_loaded');

		this.move.call(this,1);
	}
	
	liza_ft_object.update = function() {
		if (jQuery('.liza_ts_flow_current').length) {
			jQuery('.liza_ts_flow_current').each(function(){
				jQuery(this).parents('.liza_testimonials_flow_inner').css('min-height', jQuery(this).height()+'px');
			});
		}
	}
	
	liza_ft_object.move = function(dir) {
		dir = parseInt(dir,10);
		if (dir > 0)
			this.active_slide++;
		if (dir < 0)
			this.active_slide--;
		this.active_slide = this.check.call(this,this.active_slide);
		this.set.call(this,this.active_slide);
	}
	
	liza_ft_object.check = function(this_val) {
		this_val = parseInt(this_val,10);
		if (this_val < 1) 
			this_val = this.size;
		if (this_val > this.size) 
			this_val = 1;
		return this_val;
	}
	
	liza_ft_object.set = function(item_id) {
		
		item_id = parseInt(item_id,10);
		
		this.obj.find('.liza_ts_flow_prev').removeClass('liza_ts_flow_prev');
		this.obj.find('.liza_ts_flow_current').removeClass('liza_ts_flow_current');
		this.obj.find('.liza_ts_flow_next').removeClass('liza_ts_flow_next');
		
		var this_prev = item_id - 1,
			this_next = item_id + 1;
		
		this_prev = this.check.call(this,this_prev);
		this_next = this.check.call(this,this_next);
		
		this.obj.find('[data-count='+ this_prev +']').addClass('liza_ts_flow_prev');
		this.obj.find('[data-count='+ item_id +']').addClass('liza_ts_flow_current');
		this.obj.find('[data-count='+ this_next +']').addClass('liza_ts_flow_next');
		
		this.update.call(this);
	}
});

jQuery(document).ready(function(){
	$liza_testimonials_flow.each(function(){
		var $this = jQuery(this),
			this_object = liza_ft_array['liza_ft_'+$this.attr('data-uniqid')];

		this_object.init.call(this_object);
	});
});

jQuery(window).load(function(){
	$liza_testimonials_flow.each(function(){
		var $this = jQuery(this),
			this_object = liza_ft_array['liza_ft_'+$this.attr('data-uniqid')];

		this_object.update.call(this_object);
	});
});

jQuery(window).resize(function(){
	$liza_testimonials_flow.each(function(){
		var $this = jQuery(this),
			this_object = liza_ft_array['liza_ft_'+$this.attr('data-uniqid')];

		this_object.update.call(this_object);
	});
});

jQuery(document).on('click', '.liza_testimonials_flow_dot', function(){
    var $parent = jQuery(this).parents('.liza_testimonials_flow'),
        this_object = liza_ft_array['liza_ft_'+$parent.attr('data-uniqid')];
    
    this_object.active_slide = jQuery(this).attr('data-count');
    this_object.set.call(this_object,this_object.active_slide);
});
