$(function(){
  $('.nav-toggle-button').click(function(){
    if ($('.ly-navbar-nav').is(':hidden')) {
      $('.ly-navbar-nav').stop().slideDown(200);
    } else {
      $('.ly-navbar-nav').stop().slideUp(200);
    }
  });
  $('.nav-close-button').click(function(){
    $('.ly-navbar-nav').stop().slideUp(200);
  });
});