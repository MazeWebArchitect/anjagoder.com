/*
 * Created by Pixel-Mafia
 * www.pixel-mafia.com
*/
"use strict";

var liza_window = jQuery(window),
    liza_html = jQuery('html');
jQuery(document).ready(function () {
    if (jQuery('.liza_album_post_loading').size() > 0) {
        liza_albums_preload();
    }
    if (jQuery('#wpadminbar').size() > 0) {
        liza_html.addClass('has_admin_bar');
    }
	//Preloader
	if (jQuery('.liza_preloader_wrapper').size() > 0) {
		jQuery('.liza_preloader_wrapper').addClass('run_preloader');
	}
	
    //Menu
	jQuery('.liza_menu_toggler').on('click', function(){
		if (!jQuery(this).hasClass('liza_menu_toggler_mobile')) {
			jQuery('header.liza_header').toggleClass('liza_menu_opened');
			if (jQuery('.liza_aside_menu_wrapper').size() > 0) {
				liza_html.toggleClass('liza_aside_menu_opened');
			}
		}
	});


	//Complex Menu Scroll
	if (jQuery('.liza_aside_menu_wrapper').size() > 0 && liza_window.width() > 960) {
		var menu_top = 0,
			menu_ground = jQuery('nav.liza_main_nav').height() - jQuery('ul.liza_menu').height(),
			menu_step = -200,
			deltaY = 0,
			this_obj = jQuery('ul.liza_menu'); 
		jQuery('ul.liza_menu').on('mousewheel', function (event) {
			var menu_top = 0,
				menu_ground = jQuery('nav.liza_main_nav').height() - jQuery('ul.liza_menu').height(),
				menu_step = -200,
				deltaY = 0,
				this_obj = jQuery('ul.liza_menu'); 
			
			deltaY = event.originalEvent.deltaY;
			if (jQuery('nav.liza_main_nav').height() < jQuery('ul.liza_menu').height()) {	 	
				var current_top = parseInt(jQuery('ul.liza_menu').css('top'));
				if (deltaY > 0) {
					if ((current_top - deltaY) > menu_ground) {
						this_obj.css('top', current_top - deltaY + 'px');
					} else {
						this_obj.css('top', menu_ground + 'px');
					}
				}
				if (deltaY < 0) {
					if (current_top - deltaY < 0) {
						this_obj.css('top', current_top - deltaY + 'px');
					} else {
						this_obj.css('top', '0px');
					}
				}
				event.preventDefault();
			} else {
				jQuery('ul.liza_menu').css('top', '0px');
			}
		});
	}
	
	
    liza_theme_setup();
    jQuery(".liza_menu > li").hover(
        function () {
            jQuery(this).addClass('liza_menu_active');
        }, function () {
            jQuery(this).removeClass('liza_menu_active');
        }
    );
	if(jQuery('.liza_js_transition').size() > 0) {
		jQuery('.liza_js_transition').each(function(){
			var transition_time = jQuery(this).attr('data-transition') + 'ms';
			jQuery(this).css({'transition-duration': transition_time});
		});
	}	
    if (jQuery('.liza_js_bg_color').size() > 0) {
        jQuery('.liza_js_bg_color').each(function () {
			if (jQuery(this).attr('data-bgcolor') !== '') {
            	jQuery(this).css('background-color', jQuery(this).attr('data-bgcolor'));
			}
        });
    }
    if (jQuery('.liza_js_bg_image').size() > 0) {
        jQuery('.liza_js_bg_image').each(function () {
            jQuery(this).css('background-image', 'url(' + jQuery(this).attr('data-src') + ')');
        });
    }
    if (jQuery('.liza_js_color').size() > 0) {
        jQuery('.liza_js_color').each(function () {
			if (jQuery(this).attr('data-color') !== '') {
            	jQuery(this).css('color', jQuery(this).attr('data-color'));
			}
        });
    }
    if (jQuery('.liza_js_margin').length > 0) {
        jQuery('.liza_js_margin').each(function () {
			if (jQuery(this).attr('data-marTop') !== '') {
            	jQuery(this).css('margin-top', parseInt(jQuery(this).attr('data-marTop'),10) + 'px');
			}
			if (jQuery(this).attr('data-marBottom') !== '') {
            	jQuery(this).css('margin-bottom', parseInt(jQuery(this).attr('data-marBottom'),10) + 'px');
			}
			if (jQuery(this).attr('data-marLeft') !== '') {
            	jQuery(this).css('margin-left', parseInt(jQuery(this).attr('data-marLeft'),10) + 'px');
			}
			if (jQuery(this).attr('data-marRight') !== '') {
            	jQuery(this).css('margin-right', parseInt(jQuery(this).attr('data-marRight'),10) + 'px');
			}
        });
    }
    if (jQuery('.liza_image_carousel').size() > 0) {
        jQuery(".liza_image_carousel").each(function () {
            var setPad = parseInt(jQuery(this).attr('data-padding')),
                autoplay = jQuery(this).attr('data-autoplay'),
                speed = parseInt(jQuery(this).attr('data-speed')),
                onScreen = parseInt(jQuery(this).attr('data-onScreen'));
            jQuery(this).css({
                'padding-top': setPad + 'px',
                'padding-bottom': setPad + 'px'
            });
            jQuery(this).on("initialized.owl.carousel", function (e) {
                jQuery(this).css("opacity", "1");
            });
            jQuery(this).owlCarousel(
                {
                    center: true,
                    lazyLoad: true,
                    loop: true,
                    autoplay: autoplay,
                    autoplayTimeout: speed,
                    autoplayHoverPause: true,
                    navigation: false,
                    margin: setPad,
                    responsive: {
                        // breakpoint from 0 up
                        0: {
                            items: 1.5
                        },
                        760: {
                            items: onScreen
                        }
                    }
                }
            );
        });
    }
    if (jQuery('.liza_testimonials_slider').size() > 0) {
        jQuery(".liza_testimonials_slider").each(function () {
            var autoplay = jQuery(this).attr('data-autoplay'),
                speed = parseInt(jQuery(this).attr('data-speed'));
            jQuery(this).on("initialized.owl.carousel", function (e) {
                jQuery(this).css("opacity", "1");
            });
            jQuery(this).owlCarousel(
                {
                    items: 3,
                    autoHeight: true,
                    center: true,
                    lazyLoad: true,
                    loop: true,
                    autoplay: autoplay,
                    autoplayTimeout: speed,
                    autoplayHoverPause: true,
                    navigation: false,
					responsive: {
                        // breakpoint from 0 up
                        0: {
                            items: 1
                        },
						760: {
							items: 2
						},
                        960: {
                            items: 3
                        }
                    }
                }
            );
        });
    }
    if (jQuery('.liza_works_slider').size() > 0) {
        jQuery(".liza_works_slider").each(function () {
            var autoplay = jQuery(this).attr('data-autoplay'),
                speed = parseInt(jQuery(this).attr('data-speed'));
            jQuery(this).on("initialized.owl.carousel", function (e) {
                jQuery(this).css("opacity", "1");
            });
            jQuery(this).owlCarousel(
                {
                    items: 1,
                    autoHeight: true,
                    center: true,
                    lazyLoad: true,
                    loop: true,
                    autoplay: autoplay,
                    autoplayTimeout: speed,
                    autoplayHoverPause: true,
                    navigation: false,
                    margin: 30
                }
            );
        });
    }
    if (jQuery('.liza_single_album_head').size() > 0) {
        setup_liza_single_album();
        liza_html.addClass('liza_single_album');

        if (liza_window.scrollTop() > 10) {
            liza_html.addClass('header_scrolled');
        }
        liza_window.on('scroll', function () {
            if (liza_window.scrollTop() > 10) {
                liza_html.addClass('header_scrolled');
            } else {
                liza_html.removeClass('header_scrolled');
            }
        });
        jQuery('a.liza_album_down_arrow').on('click', function () {
            if (jQuery('#wpadminbar').size() > 0) {
                var liza_album_featured_height = liza_window.height() - jQuery('#wpadminbar').height();
            } else {
                var liza_album_featured_height = liza_window.height();
            }

            jQuery('html, body').stop().animate({scrollTop: liza_album_featured_height + 'px'}, 600);
        });
    }
	
	if (jQuery('.liza_skill_block').size() > 0) {
		jQuery('.liza_skill_block').each(function(){
			var setVal = jQuery(this).attr('data-value');
			jQuery(this).find('.liza_skill_bar').width(setVal+'%').css('left', -1*setVal + '%').animate(
				{'left' : '0%'}, 
				{duration: 5000, step: function(now) {
						var data = Math.ceil(now) + parseInt(setVal);
						jQuery(this).find('.liza_skill_value').html(data+'%');
					}
				}
			);
		});
	}
	if (jQuery('.personal_preloader').size() > 0) {
		liza_init_personal_preloader();
	}
	if (jQuery('.liza_aside_menu_wrapper').size() > 0) {
		liza_html.on('mousewheel', function (event) {
			if(liza_html.hasClass('liza_aside_menu_opened')) {
				event.preventDefault();
				liza_window.scrollTop(0);
			}
		});
	}

	//Back To Top
	jQuery('.liza_back_to_top').attr('data-bottom', parseInt(jQuery('.liza_back_to_top').css('bottom')));
	if (liza_window.scrollTop() > liza_window.height()) {
		jQuery('.liza_back_to_top').addClass('liza_show_me');
	} else {
		jQuery('.liza_back_to_top').removeClass('liza_show_me');
		if (jQuery('.liza_footer').size() > 0) {
			var footer_offset = jQuery('.liza_footer').offset().top,
				check_footer_state = liza_window.scrollTop() + liza_window.height(),
				liza_footer_showed = 'no',
				liza_b2t_fixer = 0;
				
			if ( check_footer_state >= footer_offset) {
				liza_b2t_fixer = check_footer_state - footer_offset;
				liza_footer_showed = 'yes';
			} else {
				liza_footer_showed = 'no';
				liza_b2t_fixer = 0;
			}
			jQuery('.liza_back_to_top').css('bottom', parseInt(jQuery('.liza_back_to_top').attr('data-bottom')) + liza_b2t_fixer + 'px');
		}
	}
	liza_window.on('scroll', function(){
		if (liza_window.scrollTop() > liza_window.height()) {
			jQuery('.liza_back_to_top').addClass('liza_show_me');
		} else {
			jQuery('.liza_back_to_top').removeClass('liza_show_me');
		}
		if (jQuery('.liza_footer').size() > 0) {
			var footer_offset = jQuery('.liza_footer').offset().top,
				check_footer_state = liza_window.scrollTop() + liza_window.height(),
				liza_footer_showed = 'no',
				liza_b2t_fixer = 0;
				
			if ( check_footer_state >= footer_offset) {
				liza_b2t_fixer = check_footer_state - footer_offset;
				liza_footer_showed = 'yes';
			} else {
				liza_footer_showed = 'no';
				liza_b2t_fixer = 0;
			}
			jQuery('.liza_back_to_top').css('bottom', parseInt(jQuery('.liza_back_to_top').attr('data-bottom')) + liza_b2t_fixer + 'px');
		}
	});
	jQuery('.liza_back_to_top').on('click', function(){
		jQuery('html, body').stop().animate({scrollTop: 0}, 400, function(){
			jQuery('.liza_back_to_top').removeClass('liza_show_me');
		});
	});
	
	if (jQuery('.liza_header_slider').size() > 0) {
		liza_html.addClass('liza_content_under_header');
		liza_push_content_under_header();
	}
	if (jQuery('.liza_home03_top').size() > 0) {
		liza_html.addClass('liza_content_under_header');
		liza_push_content_under_header();
	}
    
	// Isotope Activation
    if (jQuery('.liza_isotope_trigger').size() > 0) {
        if (jQuery('.liza_isotope_trigger').hasClass('is_masonry')) {
			jQuery('.liza_isotope_trigger').isotope({
				layoutMode: 'masonry'
			});
		} else {
			jQuery('.liza_isotope_trigger').isotope({
				layoutMode: 'fitRows'
			});
		}
    }
    
	// Filter
    jQuery('.liza_grid_filter li').eq(0).find('a').click();
    jQuery('.liza_grid_filter li a').on('click', function(){
        jQuery(this).parents('.liza_grid_filter').find('a').removeClass('is-checked');
        jQuery(this).parents('.liza_grid_filter').find('li').removeClass('is-checked');
        jQuery(this).addClass('is-checked');
        jQuery(this).parent().addClass('is-checked');
        var filterSelector = jQuery(this).attr('data-category');

        jQuery(this).parents('div.liza_front_end_display').find('.liza_isotope_trigger').isotope({
            filter: filterSelector
        });
        return false;
    });

	// Custom Select
	jQuery('.liza_tiny').find('select').each(function(){
		var $this = jQuery(this), 
			numberOfOptions = $this.children('option').length,
            thisWidth = $this.width() + parseInt($this.css('padding-left'),10) + parseInt($this.css('padding-right'),10),
            this_val = $this.val();
		$this.addClass('select-hidden'); 
		$this.wrap('<div class="liza_select_wrapper" style = "min-width: '+ thisWidth +'px"></div>');
		$this.after('<div class="liza_select"></div>');

		var $styledSelect = $this.next('div.liza_select');
        if (this_val == '') {
            $styledSelect.text($this.children('option').eq(0).text());
        } else {
            $styledSelect.text($this.children('option[value="'+ this_val +'"]').text());
        }

		var $list = jQuery('<ul />', {
			'class': 'select-options'
		}).insertAfter($styledSelect);

		for (var i = 0; i < numberOfOptions; i++) {
			jQuery('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}

		var $listItems = $list.children('li');

		$styledSelect.click(function(e) {
			e.stopPropagation();
            var $this_list = jQuery(this).next('ul.select-options'),
                max_height = liza_window.height()/2;
            
			jQuery('div.liza_select.active').not(this).each(function(){
                var $this_list = jQuery(this).next('ul.select-options');
				jQuery(this).removeClass('active').next('ul.select-options').hide();
                $this_list.removeClass('long_select').css('max-height', 'none');
			});

            if ($this_list.height() > max_height && !jQuery(this).hasClass('active')) {
                $this_list.addClass('long_select');
                $this_list.css('max-height', max_height+'px');
            } else {
                $this_list.removeClass('long_select').css('max-height', 'none');
            }
			jQuery(this).toggleClass('active').next('ul.select-options').toggle();
            
		});

		$listItems.click(function(e) {
			e.stopPropagation();
			$styledSelect.text(jQuery(this).text()).removeClass('active');
			$this.val(jQuery(this).attr('rel'));
			$this.trigger('change');
			$list.hide().removeClass('long_select').css('max-height', 'none');
		});

		jQuery(document).click(function() {
			$styledSelect.removeClass('active');
			$list.hide().removeClass('long_select').css('max-height', 'none');
		});
	});
});

jQuery(document).on('click', '.reset_variations', function(){
	var $this = jQuery(this),
		$variations_table = $this.parents('.variations');
	$variations_table.find('select').each(function(){
		var $this_select = jQuery(this),
			$this_liza_select = $this_select.next('.liza_select'),
			$this_list = $this_liza_select.next('.select-options');
		$this_liza_select.text($this_list.find('li[rel=""]').text());
	});
});

jQuery(window).load(function () {
	if (jQuery('.liza_preloader_wrapper').size() > 0) {
		jQuery('.liza_preloader_wrapper').addClass('remove_preloader');
		setTimeout("jQuery('.liza_preloader_wrapper').remove()", 600);
	}	
    if (jQuery('.liza_image_carousel').size() > 0) {
        jQuery('.liza_image_carousel').trigger('refresh.owl.carousel');
    }
    if (jQuery('.liza_single_album_head').size() > 0) {
        setup_liza_single_album();
    }
    liza_theme_setup();
    setTimeout("liza_theme_setup()", 500);
});

jQuery(window).resize(function () {
    if (jQuery('.liza_single_album_head').size() > 0) {
        setup_liza_single_album();
    }
	if (jQuery('.liza_projects_inner').size() > 0) {
		liza_projects_listing_setup();
	}
    liza_theme_setup();
	if (liza_html.hasClass('liza_content_under_header')) {
		liza_push_content_under_header();
	}
});

function liza_theme_setup() {
    jQuery(".liza_owlCarousel").each(function () {
        jQuery(this).trigger('refresh.owl.carousel');
    });
	if (jQuery('.liza_pf_video_16x9').size() > 0) {
		jQuery('.liza_pf_video_16x9').each(function(){
			jQuery(this).find('iframe').height((jQuery(this).width()/16)*9);
		});
	}
	
    if (jQuery('.search_container').size() > 0) {
        if (jQuery('#wpadminbar').size() > 0) {
            var search_min_height = liza_window.height() - jQuery('.liza_header').height() - jQuery('.liza_footer').height() - jQuery('#wpadminbar').height();
        } else {
            var search_min_height = liza_window.height() - jQuery('.liza_header').height() - jQuery('.liza_footer').height();
        }
        jQuery('.search_container').css('min-height', search_min_height + 'px');
    }
    if (jQuery('.liza_price_table').size() > 0) {
        jQuery('.liza_price_table').each(function () {
            var set_price_width = 100 / jQuery(this).find('.liza_price_table_item').size();
            jQuery(this).find('.liza_price_table_item').css('width', set_price_width + '%');
        });
    }
    if (jQuery('.liza_blog_grid_ratio').size() > 0) {
        jQuery('.liza_blog_grid_ratio').each(function () {
            var setHeight = Math.floor(jQuery(this).width() * jQuery(this).attr('data-ratio'));
            jQuery(this).height(setHeight);
        });
    }
	
	//Complex Menu Setup
	if (jQuery('.liza_aside_menu_wrapper').size() > 0 && liza_window.width() > 960) {
		var liza_main_level = jQuery('.liza_aside_menu_wrapper').find('.liza_menu').children('li'),
			liza_sub_level1 = liza_main_level.children('ul'),
			liza_sub_level1_li = liza_main_level.children('ul').children('li'),
			liza_sub_level2 = liza_sub_level1_li.children('ul'),
			liza_sub_level2_li = liza_sub_level2.children('li'),
			liza_nav_width = jQuery('.liza_main_nav').width(),
			set_w1 = Math.floor(liza_nav_width*0.35),
			set_w2 = Math.floor(liza_nav_width*0.22),
			set_space = Math.floor(liza_nav_width*0.09);
			
		liza_main_level.width(set_w1);
		liza_sub_level1.width(set_w2).css('left', set_w1 + 'px').css('padding-left', set_space + 'px');
		liza_sub_level2.width(set_w2).css('left', set_w2 + 'px').css('padding-left', set_space + 'px');
	}
}

function pm_load_blog_posts() {
	
    if (jQuery('.liza_grid_post_loading').size() > 0) {
        jQuery('.liza_grid_post_loading:first').removeClass('liza_grid_post_loading').animate({
            'z-index': '3'
        }, 200, function () {
			jQuery('.liza_blog_grid_inner').isotope('layout');
            setTimeout("jQuery('.liza_blog_grid_inner').isotope('layout')",500);
            pm_load_blog_posts();
        });
    }

}

function liza_preloader() {
    if (jQuery('.liza_split_showcase').size() > 0) {
        //Split Showcase Slides
        if (jQuery('.liza_preload_slide:first').size() > 0) {
            (function (img, src) {
                img.src = src;
                img.onload = function () {
                    jQuery('.liza_preload_slide:first').removeClass('liza_preload_slide').addClass('liza_slide_loaded').animate({
                        'z-index': '15'
                    }, 100, function () {
                        liza_preloader();
                    });
                };
            }(new Image(), jQuery('.liza_preload_slide:first').attr('data-src')));
        } else {
            liza_split_gallery.removeClass('wait4load');
        }

        if ((jQuery('.liza_odd_slide1').hasClass('liza_slide_loaded') && jQuery('.liza_even_slide1').hasClass('liza_slide_loaded')) && !liza_split_gallery.hasClass('started')) {
            run_liza_split_slider();
        }
    }
}

function liza_albums_preload() {
    jQuery('.liza_album_post_loading:first')
    if (jQuery('.liza_album_post_loading').size() > 0) {
        //Fullscreen Slideshow Slides
        if (jQuery('.liza_album_post_loading:first').size() > 0) {
            (function (img, src) {
                img.src = src;
                img.onload = function () {
                    jQuery('.liza_album_post_loading:first').removeClass('liza_album_post_loading').animate({
                        'z-index': '15'
                    }, 200, function () {
                        liza_albums_preload();
                    });
                };
            }(new Image(), jQuery('.liza_album_post_loading:first').find('img').attr('src')));
        }
    }
}

function liza_albums_listing_setup() {
    liza_albums_preload();
}

function setup_liza_single_album() {
    if (jQuery('#wpadminbar').size() > 0) {
        var liza_album_featured_height = liza_window.height() - jQuery('#wpadminbar').height();
    } else {
        var liza_album_featured_height = liza_window.height();
    }

    jQuery('.liza_single_album_head').css('margin-top', -1 * jQuery('header.liza_header').height() + 'px').height(liza_album_featured_height);
}

function liza_masonry_blog_setup() {
	liza_theme_setup();
	setTimeout('liza_theme_setup()', 300);
}

jQuery(document).on('mouseenter', '.liza_project_image_part', function(){
	if (liza_window.width() > 760)  {
		jQuery(this).parents('.liza_project_post_inner').addClass('liza_project_hovered');
	}
});
jQuery(document).on('mouseleave', '.liza_project_image_part', function(){
	jQuery(this).parents('.liza_project_post_inner').removeClass('liza_project_hovered');
});

function liza_projects_listing_setup() {
	jQuery('.liza_project_post_wrapper').each(function(){
		var img_part = jQuery(this).find('.liza_project_image_part'),
			content_part = jQuery(this).find('.liza_project_content_part'),
			set_height = img_part.width()*2 * parseInt(jQuery(this).attr('data-height'))/parseInt(jQuery(this).attr('data-width'));
		if (set_height < content_part.find('.liza_project_post_content').height()) {
			set_height = content_part.find('.liza_project_post_content').height();
		}
		img_part.height(set_height);
		content_part.height(set_height);
		img_part.find('.liza_stand_fi_project_listing').css('background-image', 'url(' + img_part.find('.liza_stand_fi_project_listing').attr('data-src') + ')');
	});
	if (jQuery('.liza_project_loading').size() > 0) {
		liza_projects_listing_loading();
	}
}

function liza_projects_listing_loading() {
	if (jQuery('.liza_project_loading:first').size() > 0) {
		var $this_obj = jQuery('.liza_project_loading:first');
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				$this_obj.removeClass('liza_project_loading').addClass('liza_project_loaded').animate({
					'z-index': '3'
				}, 100, function() {
					liza_projects_listing_loading();
				});
			};
		}(new Image(), $this_obj.find('.liza_stand_fi_project_listing').attr('data-src')));
	}	
}

function liza_push_content_under_header() {
	var header_height = jQuery('header.liza_header').height(),
		mobile_header_height = jQuery('header.liza_mobile_header').height();
	jQuery('header.liza_header').css('margin-bottom', -1*header_height+'px');
	jQuery('header.liza_mobile_header').css('margin-bottom', -1*mobile_header_height+'px');
	jQuery('.liza_mobile_menu_wrapper').css('margin-bottom', mobile_header_height+'px');
	
}