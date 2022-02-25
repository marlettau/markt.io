$(function() {
  $(".hero-stock-input").on("click", function(){
    $(this).addClass('hero-input-error');
  }).on("animationend", function(){
    $(this).removeClass('hero-input-error');
  });
});
