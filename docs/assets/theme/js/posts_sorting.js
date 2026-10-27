/*
 * Created by Pixel-Mafia
 * www.pixel-mafia.com
*/
"use strict";
if (jQuery('.liza_projects_grid_inner').size() > 0) {
	var $liza_projects_container = jQuery('.liza_projects_grid_inner');
}
if (jQuery('.liza_albums_grid_inner').size() > 0) {
	var $liza_albums_container = jQuery('.liza_albums_grid_inner');
}
if (jQuery('.liza_blog_grid_inner').size() > 0) {
	var $liza_blog_container = jQuery('.liza_blog_grid_inner');
}

jQuery(document).ready(function(){
	if (jQuery('.liza_projects_grid_inner').size() > 0) {
		setTimeout("liza_animateListProjects()", 500);
		liza_setup_projects_grid();
	}
	if (jQuery('.liza_albums_grid_inner').size() > 0) {
		setTimeout("liza_animateListAlbums()", 500);
		liza_setup_albums_grid();
	}
	if (jQuery('.liza_blog_grid_inner').size() > 0) {
		setTimeout("liza_animateListBlog()", 500);
		liza_setup_blog_grid();
	}
});

jQuery(window).load(function () {
	if (jQuery('.liza_projects_grid_inner').size() > 0) {
		$liza_projects_container.isotope('layout');
		setTimeout("jQuery('.liza_projects_grid_inner').isotope('layout')",500);
	}
	if (jQuery('.liza_albums_grid_inner').size() > 0) {
		$liza_albums_container.isotope('layout');
		setTimeout("jQuery('.liza_albums_grid_inner').isotope('layout')",500);
	}
	if (jQuery('.liza_blog_grid_inner').size() > 0) {
		$liza_blog_container.isotope('layout');
		setTimeout("jQuery('.liza_blog_grid_inner').isotope('layout')",500);
	}
});
jQuery(window).resize(function () {
	if (jQuery('.liza_projects_grid_inner').size() > 0) {
		$liza_projects_container.isotope('layout');
		setTimeout("jQuery('.liza_projects_grid_inner').isotope('layout')",500);
		setTimeout("jQuery('.liza_projects_grid_inner').isotope('layout')",1000);
	}
	if (jQuery('.liza_albums_grid_inner').size() > 0) {
		$liza_albums_container.isotope('layout');
		setTimeout("jQuery('.liza_albums_grid_inner').isotope('layout')",500);
		setTimeout("jQuery('.liza_albums_grid_inner').isotope('layout')",1000);
	}
	if (jQuery('.liza_blog_grid_inner').size() > 0) {
		$liza_blog_container.isotope('layout');
		setTimeout("jQuery('.liza_blog_grid_inner').isotope('layout')",500);
		setTimeout("jQuery('.liza_blog_grid_inner').isotope('layout')",1000);
	}
});

function liza_setup_blog_grid() {
	jQuery('.liza_blog_grid_inner').each(function(){
		var setPad = Math.floor(parseInt(jQuery(this).attr('data-pad'))/2);
		if (liza_window.width() < 1200 && setPad > 20) {
			setPad = setPad/2;
		}
		if (liza_window.width() < 760 && setPad > 10) {
			setPad = 10;
		}
		jQuery(this).parents('.liza_blog_grid').css({
			'margin-left' : setPad+'px',
			'margin-top' : -1*setPad+'px',
			'margin-right' : setPad+'px',
		});
		jQuery(this).find('.liza_grid_post_inner').css({
			'margin-left' : setPad+'px',
			'margin-top' : setPad+'px',
			'margin-right' : setPad+'px',
			'margin-bottom' : setPad+'px'
		});
	});
	if (jQuery('.liza_grid_post_loading').size() > 0) {
		jQuery(".liza_owlCarousel").on("initialized.owl.carousel", function (e) {
			jQuery(".liza_owlCarousel").css("opacity", "1");
		});
		jQuery(".liza_owlCarousel").owlCarousel(
			{
				items: 1,
				lazyLoad: true,
				loop: true,
				autoplay: false,
				autoplayTimeout: 5000,
				autoplayHoverPause: true,
				autoHeight: false
			}
		);
	}
	liza_theme_setup();
	
	setTimeout("liza_animateListBlog()",300);
}
function liza_setup_projects_grid() {	
	jQuery('.liza_projects_grid_inner').each(function(){
		var setPad = Math.floor(parseInt(jQuery(this).attr('data-pad'))/2);
		if (liza_window.width() < 1200 && setPad > 20) {
			setPad = setPad/2;
		}
		if (liza_window.width() < 760 && setPad > 10) {
			setPad = 10;
		}

		jQuery(this).parents('.liza_projects_grid').css({
			'margin-left' : setPad+'px',
			'margin-top' : -1*setPad+'px',
			'margin-right' : setPad+'px'
		});
		jQuery(this).find('.liza_project_grid_post_inner').css({
			'margin-left' : setPad+'px',
			'margin-top' : setPad+'px',
			'margin-right' : setPad+'px',
			'margin-bottom' : setPad+'px'
		});
	});
	setTimeout("liza_animateListProjects()",300);
}

function liza_setup_albums_grid() {	
	jQuery('.liza_albums_grid_inner').each(function(){
		var setPad = Math.floor(parseInt(jQuery(this).attr('data-pad'))/2);
		if (liza_window.width() < 1200 && setPad > 20) {
			setPad = setPad/2;
		}
		if (liza_window.width() < 760 && setPad > 10) {
			setPad = 10;
		}

		jQuery(this).parents('.liza_albums_grid').css({
			'margin-left' : setPad+'px',
			'margin-top' : -1*setPad+'px',
			'margin-right' : setPad+'px',
		});
		jQuery(this).find('.liza_album_grid_post_inner').css({
			'margin-left' : setPad+'px',
			'margin-top' : setPad+'px',
			'margin-right' : setPad+'px',
			'margin-bottom' : setPad+'px'
		});
	});
	setTimeout("liza_animateListAlbums()",300);
}

function liza_animateListProjects() {
	if (liza_html.find('.liza_project_loading:first').size() > 0) {
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				jQuery('.liza_project_loading:first').removeClass('liza_project_loading').animate({
					'z-index': '15'
				}, 200, function() {
					jQuery('.liza_projects_grid_inner').isotope('layout');
					liza_animateListProjects();
				});
			};
		}(new Image(), jQuery('.liza_project_loading:first').find('img').attr('src')));
	}
}
function liza_animateListAlbums() {
	if (liza_html.find('.liza_album_loading:first').size() > 0) {
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				jQuery('.liza_album_loading:first').removeClass('liza_album_loading').animate({
					'z-index': '15'
				}, 200, function() {
					jQuery('.liza_albums_grid_inner').isotope('layout');
					liza_animateListAlbums();
				});
			};
		}(new Image(), jQuery('.liza_album_loading:first').find('img').attr('src')));
	}
}
function liza_animateListBlog() {
	if (liza_html.find('.liza_grid_post_loading:first').size() > 0) {
		jQuery('.liza_grid_post_loading:first').removeClass('liza_grid_post_loading').animate({
			'z-index': '15'
		}, 200, function() {
			jQuery('.liza_blog_grid_inner').isotope('layout');
			liza_animateListBlog();
		});
	}
}

