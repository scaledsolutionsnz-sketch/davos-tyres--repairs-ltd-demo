/* Davo's Tyres & Repairs — site script */
(function(){
  "use strict";

  // ---- intro overlay ----
  var intro = document.getElementById('intro');
  if(intro){
    window.addEventListener('load', function(){
      setTimeout(function(){ intro.classList.add('gone'); }, 1150);
    });
    // safety fallback
    setTimeout(function(){ intro.classList.add('gone'); }, 2600);
  }

  // ---- hero rotation ----
  var slides = document.querySelectorAll('.hero-slide');
  if(slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var i = 0;
    setInterval(function(){
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 5500);
  }

  // ---- mobile nav ----
  var burger = document.querySelector('.hamburger');
  var links = document.getElementById('navlinks');
  if(burger && links){
    burger.addEventListener('click', function(){ links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }

  // ---- reveal on scroll ----
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // ---- gmail compose links (built in JS so the address is never raw in the HTML) ----
  document.querySelectorAll('a[data-gmail]').forEach(function(a){
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
             '&su=' + (a.getAttribute('data-su') || '') +
             '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });
})();
