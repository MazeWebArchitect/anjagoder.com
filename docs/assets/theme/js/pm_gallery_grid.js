/*
 * Grid Gallery
 * Created by Pixel-Mafia
 * www.pixel-mafia.com
*/
"use strict";
var $liza_container = jQuery('.liza_grid_inner'),
	liza_grid_array = [],
	$liza_grid_gallery_array = jQuery('.liza_grid_gallery_array'),
	$liza_grid_wrapper = jQuery('.liza_grid_wrapper');

$liza_grid_wrapper.each(function() {
	var $this_obj = jQuery(this);
	liza_grid_array["liza_grid_" + $this_obj.attr('data-uniqid')] = {};
	var this_array = liza_grid_array["liza_grid_" + $this_obj.attr('data-uniqid')];
	this_array.id = jQuery(this).attr('data-uniqid');
	this_array.showed = 0;
	this_array.items = [];
	
	var this_items_array = this_array.items;
	if ($this_obj.find('.liza_grid_gallery_array').length) {
		$this_obj.find('.liza_grid_gallery_array').each(function() {
			jQuery(this).find('.liza_grid_array_item').each(function() {
				var $this = jQuery(this),
					liza_grid_item = {};
				liza_grid_item.slide_type = $this.attr('data-type');
				liza_grid_item.img = $this.attr('data-img');
				liza_grid_item.thmb = $this.attr('data-thmb');
				liza_grid_item.title = $this.attr('data-title');
				liza_grid_item.alt = $this.attr('data-alt');
				liza_grid_item.overlay = $this.attr('data-overlay');
				liza_grid_item.counter = $this.attr('data-counter');
				liza_grid_item.size = $this.attr('data-size');
				this_items_array.push(liza_grid_item);
			});
			jQuery(this).remove();
		});
	}
	this_array.obj = jQuery('.liza_grid_'+this_array.id);
    
	this_array.init = function () {
		var this_obj = this;
		this.obj.find('.grid_load_more').on("click", function () {
			this_obj.loadmore.call(this_obj);
		});
		this.setup.call(this);
		this.preloader.call(this);
	}
	
	this_array.preloader = function() {
		var this_obj = this,
			$this_dom = this.obj;
        $this_dom.find('.liza_grid_inner').isotope('layout');
		if ($this_dom.find('.load_anim:first').size() > 0) {
            (function (img, src) {
                img.src = src;
                img.onload = function () {
                    jQuery('.load_anim:first').removeClass('anim_el2').removeClass('anim_el').removeClass('load_anim').animate({
                        'z-index': '15'
                    }, 200, function() {
                        this_obj.preloader.call(this_obj);
                    });
                };
            }(new Image(), jQuery('.load_anim:first').find('img').attr('src')));
		} else {
			this_obj.setup.call(this_obj);
		}
	}
	
	this_array.setup = function() {
		var this_obj = this,
			$this_dom = this.obj;
		if ($this_dom.find('.liza_js_bg_color').length) {
			$this_dom.find('.liza_js_bg_color').each(function () {
				jQuery(this).css('background-color', jQuery(this).attr('data-bgcolor'));
			});
		}
        
		var side_padding = Math.floor(parseInt($this_dom.find('.liza_grid_inner').attr('data-pad'))/2,10);
		if (liza_window.width() < 1200 && side_padding > 20) {
			side_padding = side_padding/2;
		}
		if (liza_window.width() < 760 && side_padding > 10) {
			side_padding = 10;
		}
		if (jQuery('.liza_single_gallery_grid').length) {
			$this_dom.find('.liza_grid_inner').css('margin', side_padding+'px').css('margin-bottom', '0px');
			jQuery('.liza_single_gallery_grid').css('padding-bottom', side_padding+'px');
		} else {
			$this_dom.find('.liza_grid_inner').css('margin', side_padding+'px').css('margin-top', -1*side_padding+'px');
		}
		if ($this_dom.find('.liza_grid_inner').hasClass('side_paddings_on')) {
			$this_dom.find('.liza_grid_inner').css('margin-left', -1*side_padding+'px').css('margin-right', -1*side_padding+'px');
		}
		$this_dom.find('.grid-item-inner').css({
			'margin-left' : side_padding+'px',
			'margin-top' : side_padding+'px',
			'margin-right' : side_padding+'px',
			'margin-bottom' : side_padding+'px'
		});
		$this_dom.find('.liza_grid_inner').isotope('layout');
		setTimeout("jQuery('.liza_grid_inner').isotope('layout')",1000);
	}
							   
	this_array.loadmore = function() {
		var this_obj = this,
			$this_dom = this.obj,
			liza_what_to_append = '',		
			liza_grid_post_per_page = $this_dom.attr('data-perload'),
			liza_uniqid = this.id,
			liza_allposts = this.items.length,
			liza_count = $this_dom.find('.grid-item').size(),
			liza_ins_container = $this_dom.find('.liza_grid_inner'),
			liza_load_more_button = $this_dom.find('.grid_load_more'),
            liza_overlay = liza_ins_container.attr('data-overlay');
	
		if (this.showed >= liza_allposts) {
			liza_load_more_button.slideUp(300);
		} else {
			var liza_now_step = this.showed + parseInt(liza_grid_post_per_page) - 1;
			if ((liza_now_step + 1) < liza_allposts) {
				var liza_limit = liza_now_step;
			} else {
				var liza_limit = liza_allposts - 1;
				liza_load_more_button.slideUp(300);
			}
			
			for (var i = this.showed; i <= liza_limit; i++) {
				var liza_thishref = this.items[i].img,
				liza_what_to_append = liza_what_to_append +'\
                <div class="grid-item element anim_el load_anim grid_b2p">\
                    <div class="grid-item-inner">\
                        <a href="' + liza_thishref +'" class="swipebox" data-lightbox="grid_gallery'+ this.id +'" title="'+ this.items[i].title +'"></a>\
                        <img src="'+ this.items[i].thmb +'" alt="' + this.items[i].alt + '" class="grid_thmb"/>\
                        <div class="grid_overlay" style="background-color:'+ liza_overlay +'"></div>\
                        <div class="liza-img-preloader"></div>\
                    </div>\
				</div>';
                
				liza_count++;
				this.showed++;
			}

			var $liza_newItems = jQuery(liza_what_to_append);

			if (liza_ins_container.data('isotope')) {
				liza_ins_container.isotope('insert', $liza_newItems, function() {
                    liza_ins_container.isotope('layout');
				});
			}
            liza_ins_container.isotope('layout');
            this_obj.preloader.call(this_obj);
			this_obj.setup.call(this_obj);
		}
		jQuery('.liza_grid_inner').isotope("layout");
	}
    
});

if (jQuery('.liza_grid_inner').size() > 0) {
	var $liza_container = jQuery('.liza_grid_inner');
}

jQuery(document).ready(function(){
	$liza_grid_wrapper.each(function() {
		var $this_obj = jQuery(this),
			this_obj = liza_grid_array["liza_grid_" + $this_obj.attr('data-uniqid')];
		this_obj.init.call(this_obj);
	});
});

jQuery(window).load(function () {
	$liza_grid_wrapper.each(function() {
		var $this_obj = jQuery(this),
			this_obj = liza_grid_array["liza_grid_" + $this_obj.attr('data-uniqid')];
		this_obj.setup.call(this_obj);
	});
});

jQuery(window).resize(function () {
	$liza_grid_wrapper.each(function() {
		var $this_obj = jQuery(this),
			this_obj = liza_grid_array["liza_grid_" + $this_obj.attr('data-uniqid')];
		this_obj.setup.call(this_obj);
	});
});