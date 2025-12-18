(function ($) {


  siteMenuClone();
  mobileToggleClick();
  onePageNavigation();
  animateReveal();
  
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: -100,
    disable: 'mobile'
  });


  // Services Carusel
  $('.services_active').owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    autoplay: true,
    navText: ['<div class="cursor-item"><i class="fa fa-angle-left"></i></div>', '<div class="cursor-item"><i class="fa fa-angle-right cursor-item"></i></div>'],
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplaySpeed: 800,
    responsive: {
      0: {
        items: 1,
        dots: false,
        nav: true
      },
      767: {
        items: 1,
        dots: false,
        nav: true
      },
      992: {
        items: 1,
        dots: false,
        nav: true
      },
      1200: {
        items: 1,
        dots: false,
        nav: true
      },
      1500: {
        items: 1,
        dots: false,
        nav: true
      }
    }
  });


  // Logo Clients Carusel
  $('.logo-slider').owlCarousel({
    center: false,
    loop: true,
    stagePadding: 0,
    margin: 0,
    smartSpeed: 1000,
    autoplay: true,
    autoplayHoverPause: true,
    dots: false,
    nav: false,
    responsive: {
      400: {
        items: 2
      },
      768: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  });

  // Isotope Filter
  var $container = $('.work-gallery');
  $container.imagesLoaded().progress(function () {
    $container.isotope();
  });

  $('.filter-wrapper li a').on('click', function () {
    $(".filter-wrapper li a").removeClass("active");
    $(this).addClass("active");
    var selector = $(this).attr('data-filter');
    $container.imagesLoaded().progress(function () {
      $container.isotope({
        filter: selector,
      });
    });
    return false;
  });


  // go to top
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });


  // scroll body to 0px on click circle
  $('#back-to-top').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });


  // scroll body to 0px on click footer
  $('#go-to-top').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });


  // Circle
  const circleType = new CircleType(
    document.getElementById("rotated")
  ).radius(80);

  $(window).on('scroll', function () {
    var offset = $(window).scrollTop();
    offset = offset * 0.4;

    $(".circular-text").css({
      "-moz-transform": "rotate(" + offset + "deg)",
      "-webkit-transform": "rotate(" + offset + "deg)",
      "-o-transform": "rotate(" + offset + "deg)",
      "-ms-transform": "rotate(" + offset + "deg)",
      transform: "rotate(" + offset + "deg)"
    });
  });


  // Preloader
  TweenMax.to(".loader", 2.2, {
    delay: 1,
    top: "-100%",
    ease: Expo.easeInOut
  });

  var qoute = document.getElementById('quote'),
      arr = quote.innerText.split(''),
      html = '';

      for( var i =0; i < arr.length; i++ ) {
         if (arr[i] !== ' ') {
            html += '<div style="position:relative;display:inline-block;">' + arr[i] + '</div>';
         }

         else {
            html += arr[i];
         }
      }

      quote.innerHTML = html;

      var chars = quote.getElementsByTagName('div');

      var t1 = gsap.timeline({
         repeat: false,
         repeatDelay: 2,
         yoyo: true,
         delay: 2
      });

      t1.set('#quote', {perspective: 400});
      t1.from(chars, {
         duration: 1.5,
         opacity: 0,
         x: gsap.utils.random(-300,300,true),
         stagger: {
            amout: 3
         }
      })

            
  // Image Distort Header 
  var hoverDistort = new hoverEffect({
    parent: document.querySelector('.distortion'),
    intensity: 0.5,
    image1: 'images/hero.jpg',
    image2: 'images/hero.jpg',
    displacementImage: 'images/dist-filter.png'
  });

  $('.distortion').hover(
    function () {
      anime.timeline({
          loop: false
        })
        .add({
          translateX: [80, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1400,
          delay: (el, i) => 100 + 40 * i
        })
    },

    function () {
      anime.timeline({
          loop: false
        })
        .add({
          translateX: [0, -80],
          opacity: [1, 0],
          easing: "easeInExpo",
          duration: 800,
          delay: (el, i) => 40 * i
        });
    }
  );


})(jQuery);




$(document).ready(function () {
  "use strict";

    Cursor();

});




function siteMenuClone() {

  setTimeout(function () {

    $('.js-clone-nav').each(function () {
      var $this = $(this);
      $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-inner');
    });

    var counter = 0;
    $('.site-mobile-menu .has-children').each(function () {
      var $this = $(this);

      $this.prepend('<span class="arrow-collapse collapsed">');

      $this.find('.arrow-collapse').attr({
        'data-toggle': 'collapse',
        'data-target': '#collapseItem' + counter,
      });

      $this.find('> ul').attr({
        'class': 'collapse',
        'id': 'collapseItem' + counter,
      });

      counter++;

    });

  }, 1000);

  $('body').on('click', '.arrow-collapse', function (e) {
    var $this = $(this);
    if ($this.closest('li').find('.collapse').hasClass('show')) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
    }
    e.preventDefault();

  });

  $(window).resize(function () {
    var $this = $(this),
      w = $this.width();

    if (w > 768) {
      if ($('body').hasClass('offcanvas')) {
        $('body').removeClass('offcanvas');
      }
    }
  });

  $('.js-burger-toggle-menu').on('click', function (e) {
    e.preventDefault();
    if ($('body').hasClass('offcanvas')) {
      $('body').removeClass('offcanvas');
      $('.js-burger-toggle-menu').removeClass('open');
    } else {
      $('body').addClass('offcanvas');
      $('.js-burger-toggle-menu').addClass('open');
    }
  });

};


function mobileToggleClick() {
  $('.js-menu-toggle').on('click', function (e) {

    e.preventDefault();

    if ($('body').hasClass('offcanvas')) {
      $('body').removeClass('offcanvas');
      $('.js-menu-toggle').removeClass('active');
      if ($('.js-burger-toggle-menu').length) {
        $('.js-burger-toggle-menu').removeClass('open');
      }
    } else {
      $('body').addClass('offcanvas');
      $('.js-menu-toggle').addClass('active');
      if ($('.js-burger-toggle-menu').length) {
        $('.js-burger-toggle-menu').addClass('open');
      }
    }


  });

  // click outisde offcanvas
  $(document).on('mouseup', function (e) {
    var container = $(".site-mobile-menu");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('offcanvas')) {
        $('body').removeClass('offcanvas');
        $('body').find('.js-menu-toggle').removeClass('active');

        $('body').find('.js-burger-toggle-menu').removeClass('open');
      }
    }
  });
};


// navigation
function onePageNavigation() {
  var navToggler = $('.site-menu-toggle');
  $("body").on("click", ".site-nav .site-nav-ul li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']", function (e) {

    e.preventDefault();

    var $body = $('body');
    if ($body.hasClass('offcanvas')) {
      $body.removeClass('offcanvas');
      $('body').find('.js-burger-toggle-menu').removeClass('open');
    }

    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, 'easeInOutExpo');

  });

};



function animateReveal() {

  var controller = new ScrollMagic.Controller();
  
  var greveal = $('.gsap-reveal');

  // gsap reveal
  $('.gsap-reveal').each(function() {
    $(this).append('<span class="cover"></span>');
  });
  if ( greveal.length ) {
    var revealNum = 0;
    greveal.each(function() {
      var cover = $(this).find('.cover');

      var tl = new TimelineMax();

      setTimeout(function() {
        tl
          .fromTo(cover, 2, { skewX: 0 }, { xPercent: 101, transformOrigin: "0% 100%", ease:Expo.easeInOut })
      }, revealNum * 0);
      
      var scene = new ScrollMagic.Scene({
        triggerElement: this,
        duration: "0%",
        reverse: false,
        offset: "-300%",
      })
      .setTween(tl)
      .addTo(controller);

      revealNum++;

    });
  }


}


// Cursor
function Cursor() {

  var cursor = $(".cursor"),
    follower = $(".cursor-follower");

  var posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

  TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;

      TweenMax.set(follower, {
        css: {
          left: posX - 25,
          top: posY - 25
        }
      });

      TweenMax.set(cursor, {
        css: {
          left: mouseX - 5,
          top: mouseY - 5
        }
      });
    }
  });

  const link = document.querySelectorAll('.hover-this');

  const animateit = function (e) {
    const span = this.querySelector('span');
    const {
      offsetX: x,
      offsetY: y
    } = e, {
      offsetWidth: width,
      offsetHeight: height
    } = this,

    move = 25,
      xMove = x / width * (move * 2) - move,
      yMove = y / height * (move * 2) - move;

    span.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === 'mouseleave') span.style.transform = '';
  };


  $(document).on('mousemove', function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  $(".portfolio-item").on('mouseenter', function () {
    cursor.addClass("active");
    follower.addClass("active");
  });

  $(".portfolio-item").on('mouseleave', function () {
    cursor.removeClass("active");
    follower.removeClass("active");
  });


  $(".cursor-item").on('mouseenter', function () {
    cursor.addClass("active");
    follower.addClass("active");
  });

  $(".cursor-item").on('mouseleave', function () {
    cursor.removeClass("active");
    follower.removeClass("active");
  });

  const editCursor = e => {
          // unused 
          /* const { clientX: x, clientY: y } = e;
          cursor.style.left = x + 'px';
          cursor.style.top = y + 'px'; */
    };

  link.forEach(b => b.addEventListener('mousemove', animateit));
  link.forEach(b => b.addEventListener('mouseleave', animateit));
  window.addEventListener('mousemove', editCursor);
}

/* lightbox - reviews */

document.addEventListener('DOMContentLoaded', function () {
  // Select all elements that are intended to trigger the lightbox
  document.querySelectorAll('.lightbox-trigger').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent the default anchor behavior
          const imageSrc = this.getAttribute('data-image'); // Get the image URL from the data attribute
          const lightbox = document.getElementById('lightbox');
          const lightboxImage = document.getElementById('lightbox-img');
          
          // Set the lightbox image src and show the lightbox
          lightboxImage.src = imageSrc;
          lightbox.style.display = 'flex'; // Display the lightbox
      });
  });

  // Close lightbox when clicking on the lightbox (outside the image)
  document.getElementById('lightbox').addEventListener('click', function (e) {
      if (e.target === this) {
          this.style.display = 'none'; // Hide the lightbox when clicking outside the image
      }
  });
});

/* snow */

const c = document.getElementById("snow");
      const ctx = c.getContext("2d");
      c.width = window.innerWidth; 
      c.height = window.innerHeight;

      const flakes = [...Array(150)].map(() => ({
      x: Math.random()*c.width,
      y: Math.random()*c.height,
      r: 1+Math.random()*2,
      dx: -1+Math.random()*2,
      dy: 1+Math.random()*2
      }));

      function draw(){
      ctx.clearRect(0,0,c.width,c.height);
      flakes.forEach(f=>{
         f.x+=f.dx; f.y+=f.dy;
         if(f.y>c.height) f.y=0;
         if(f.x>c.width) f.x=0;
         if(f.x<0) f.x=c.width;
         ctx.beginPath();
         ctx.arc(f.x,f.y,f.r,0,2*Math.PI);
         ctx.fillStyle="rgba(255,255,255,0.8)";
         ctx.fill();
      });
      requestAnimationFrame(draw);
      }
      if (Math.random() < 0.2) {
         draw();
      }
      // push snowflakes
      window.onmousemove = e => {
         flakes.forEach(f => {
            const dx = f.x - e.clientX;
            const dy = f.y - e.clientY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 80) {
               f.x += dx/dist * 5;
               f.y += dy/dist * 5;
            }
         });
      };
      
/* promo banner */

const banner = document.getElementById('promo-banner');
const close = document.getElementById('promo-close');

if (sessionStorage.getItem('promoClosed')) {
    banner.style.display = 'none';
    document.body.style.paddingTop = '0';
}

close.addEventListener('click', () => {
    banner.style.display = 'none';
    document.body.style.paddingTop = '0';
    sessionStorage.setItem('promoClosed', '1');
});
