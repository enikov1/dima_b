$(document).ready(function () {

	const swiper = new Swiper('#slider_main', {
		// Optional parameters
		// direction: 'vertical',
		loop: true,
		slidesPerView: 1,
  		// spaceBetween: 30,

		on: {
			activeIndexChange: function(event) {

				$('#slider_main .brand__pagination button').eq(event.realIndex).addClass('active').siblings().removeClass('active');
	
			}
		},
		// If we need pagination

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});


	$('#slider_main .brand__pagination button').on('click', function(event) {
		console.log($(this).index());
		swiper.slideTo($(this).index() + 1);
	});

	

	function get_result() {
		let d_search_result = $('#d_search_result'),
			search_append = $('.live_search');

		d_search_result.html('');
		d_search_result.append('<div class="live_search active"></div>');

		let json = [
			{URL: '#', IMAGE: './img/item/item1.jpg', TITLE: 'Гидравлические насосы ', COUNT: 1},
			{URL: '#', IMAGE: './img/item/item4.jpg', TITLE: 'Гидравлические насосы VOLVO ZX330', COUNT: 1},
			{URL: '#', IMAGE: './img/item/item3.jpg', TITLE: 'Гидравлические насосы HYUNDAI ZX330', COUNT: 2},
			{URL: '#', IMAGE: './img/item/item1.jpg', TITLE: 'Гидравлические насосы ', COUNT: 1},
			{URL: '#', IMAGE: './img/item/item4.jpg', TITLE: 'Гидравлические насосы VOLVO ZX330', COUNT: 1},
		]

		$.each(json, function(index, elem) {
			d_search_result.find('.live_search').append('<a href="'+elem.URL+'" class="live_search__item"><div class="image"><img src="'+elem.IMAGE+'" alt=""></div><div class="text"><span>'+elem.TITLE+'<span>('+elem.COUNT+')</span></span></div></a>');
		});

		$('.live_search__item').on('click', function() {
			$('#d_search_result').html('');
		});

		// $('.live_search').mCustomScrollbar({
		// 	scrollInertia: 500
		// });

		// $('#d-search-result').append();

		// $.ajax({
		// 	type: 'POST',
		// 	url: '/',
		// 	data: 'q='+b_search,
		// 	dataType: 'json',

		// 	success: function(json) {
		// 		$.each(json, function(index, elem) {
		// 			d_search_result.find(search_append).append('<a href="'+element.URL+'" class="live_search__item"><div class="image"><img src="'+element.IMAGE+'" alt=""></div><div class="text"><span>'+element.TITLE+'<span>'+element.COUNT+'</span></span></div></a>');
		// 		});

		// 		search_append.mCustomScrollbar({
		// 			scrollInertia: 500
		// 		});
		// 	}
		// });
	}

	let timer = 0,
		b_search = '';

	$('#b_search').keyup(function() {
		b_search = this.value;

		
		
		if(b_search.length) {
			clearTimeout(timer);
			timer = setTimeout(get_result, 1000);

			$('.live_search').addClass('active');
		} else {
			setTimeout(function() {
				$('#d_search_result').html('');
			}, 1000);
		}
	});

	$('.header_burger').on('click', function() {
		$(this).toggleClass('active');
		$(this).next('nav').toggleClass('active');
	});

	$('.aside__nav_active').on('click', function() {
		$(this).toggleClass('active');
		$('.aside__nav').toggleClass('active');
	});
	

	$('.aside__nav > ul > li').on('click', function() {
		let _this = $(this);

		_this.toggleClass('active').siblings().removeClass('active');
	});

	// $('#tab_cat button').on('click', function() {
	// 	let _this = $(this);

	// 	_this.addClass('active').siblings().removeClass('active');

	// 	$('.tab .tab__item').eq(_this.index()).fadeIn(1000).siblings().fadeOut(500);
	// });

	$('#button_pay').on('click', function(event) {
		event.preventDefault();

		$('#popup_pay').addClass('active');
	});

	$('.popup_close, #button_pay_next').on('click', function(event) {
		event.preventDefault();
		
		$('.popup').removeClass('active');
	});	

	// quantity

	$('.field_quantity .field_quantity__minus').on('click', function() {
		let $input = $(this).parent().find('.field_quantity-input'),
			count = parseInt($input.val()) - 1;

		count = count < 1 ? 1 : count;
    	$input.val(count);
	});

	$('.field_quantity .field_quantity__plus').on('click', function() {
		let $input = $(this).parent().find('.field_quantity-input'),
			count = parseInt($input.val()) + 1;

		count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
    	$input.val(parseInt(count));
	});

	$('.field_quantity .field_quantity-input').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
		if (this.value == "") {
			this.value = 1;
		}
		if (this.value > parseInt($(this).data('max-count'))) {
			this.value = parseInt($(this).data('max-count'));
		} 
	});

	// file

	$('#attachment_button input').on('change', function() {
		let file_name = $(this).val().split('\\');

		console.log(file_name[file_name.length - 1]);

		$(this).parent().find('.field_attachment-name').text('Вы выбрали: ' + file_name[file_name.length - 1]);
	});
	
});