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
  // Landscape slides show on desktop, portrait on mobile; rotate only the
  // visible set so hidden slides never leave the hero blank.
  var mobileMq = window.matchMedia('(max-width: 640px)');
  function activeSlides(){
    var sel = mobileMq.matches ? '.hero-slide.port' : '.hero-slide.land';
    return document.querySelectorAll(sel);
  }
  function resetSlides(){
    document.querySelectorAll('.hero-slide').forEach(function(s){ s.classList.remove('active'); });
    var set = activeSlides();
    if(set.length) set[0].classList.add('active');
    return set;
  }
  var slides = resetSlides();
  var i = 0;
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    setInterval(function(){
      if(slides.length < 2) return;
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 5500);
  }
  mobileMq.addEventListener('change', function(){ slides = resetSlides(); i = 0; });

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
