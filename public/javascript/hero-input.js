var menu = document.getElementById("stockSearchInfoDialog")

$(function() {
  $(".hero-stock-input-container").on("click", function(){
    $(this).addClass('hero-input-error');
    $(this).find("input").addClass('hero-input-error-color-change');
    $(this).find("i").addClass('hero-stock-input-icon-error');
    $('.disable-overlay').css('display', 'flex');

  }).on("animationend", function(){
    $(this).removeClass('hero-input-error');
    $(this).find("input").removeClass('hero-input-error-color-change');
    $(this).find("i").removeClass('hero-stock-input-icon-error');
    $('.disable-overlay').css('display', 'none');

  });
});









  $(".hero-stock-input-icon").on("click", function(){

    $("#stockSearchInfoDialog").fadeIn();

    var offset = $( this ).offset();
    event.stopPropagation();

    menu.style.display = 'block';
    menu.style.left = offset.left + "px";
    menu.style.top = offset.top + "px";


    console.log( this.tagName +
    " coords ( " + offset.left + ", " + offset.top + " )" );
  });

  $(".stock-search-info-dialog").on("mouseleave", function(){
    $("#stockSearchInfoDialog").fadeOut();

      //menu.style.display = 'none';
      $("#stockSearchInfoDialog").removeClass('stock-search-info-dialog-animation');

  });
