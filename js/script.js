// fungsi smooth page scrolling
$('.page-scroll').on('click', function (e) {
  //console.log('nice'); //untuk debugging

  //ambil isi href
  var tujuan = $(this).attr('href'); //this berarti elemen ini saja (yang bersangkutan)
  // console.log( goto);

  var elementujuan = $(tujuan);

  $('html, body').animate({
    scrollTop: elementujuan.offset().top - 50
  }, 1250, 'easeInOutExpo');

  e.preventDefault();

}); //jquery, tolong carikan saya class page scroll. Ketika di klik, maka jalankan fungsi berikut ini

//jumbotron on load
$(window).on('load', function () {
  $('.jumbotron img').addClass('show-jumbotron');
  $('.jumbotron h1').addClass('show-jumbotron');
  $('.jumbotron p').addClass('show-jumbotron');
});

// fungsi parallax
$(window).scroll(function () {
  var wScroll = $(this).scrollTop();

  //jumbotron
  $('.jumbotron img').css({
    'transform': 'translate(0px, ' + wScroll / 4 + '%)'
  });

  $('.jumbotron h1').css({
    'transform': 'translate(0px, ' + wScroll / 2 + '%)'
  });

  $('.jumbotron p').css({
    'transform': 'translate(0px, ' + wScroll / 1.5 + '%)'
  });

  //skills
  if (wScroll > $('.skills').offset().top - 250) {
    // console.log('nice');
    $('.skills img').each(function (i) {
      setTimeout(function () {
        $('.skills img').eq(i).addClass('show-skills');
      }, 300 * (i + 1));
    });
  }

  if (wScroll > $('.skills').offset().top - 250) {
    // console.log('nice');
    $('.skills h3').each(function (i) {
      setTimeout(function () {
        $('.skills h3').eq(i).addClass('show-skills');
      }, 300 * (i + 1));
    });
  }

  //portofolio
  if (wScroll > $('.portofolio').offset().top - 250) {
    // console.log('nice');
    $('.portofolio .thumbnail').addClass('show-portofolio');
  }

  if (wScroll > $('.about').offset().top - 250) {
    $('#p-left').addClass('show-about');
    $('#p-right').addClass('show-about');
  }

  if (wScroll > $('.about').offset().top - 400) {
    $('.navbar').addClass('my-navbar');
  } else {
    $('.navbar').removeClass('my-navbar');
  }
});

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 2,
        nav: false
      },
      1000: {
        items: 3,
        nav: true,
        loop: true
      }
    },
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true
  });
});

// popover
$(document).ready(function () {
  $('[data-toggle="popover"]').popover();
});