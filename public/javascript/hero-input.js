var menu = document.getElementById("stockSearchInfoDialog")

$(".loading-overlay").hide();
$(".stockOutput").hide();
$(".loadingOverlayGraphic").hide();
$(".loadingOverlay").hide();
$(".main-content").hide();

function mainPage()
{
  console.log("back");
  $(".main-content").fadeOut("slow");
  $(".page-content").removeClass('page-content-next-page');
  $(".site-logo").removeClass('site-logo-next-newPage');
}


$(document).ready(function() {
  $('#heroStockForm').on("submit", function(event){
    event.preventDefault();
    let value = $("#stockInput").val().toUpperCase();
    $(".stockOutput").text("Loading...");
    $('.disable-overlay').css('display', 'flex');
    $(".loadingOverlay").fadeIn("slow");
    $(".loadingOverlayGrapic").fadeIn("slow");
    $(".stockOutput").fadeIn("slow");

    $.ajax({
      url: "/stocksearch",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({stockSymbolInput: value}),
      success: function(res){

        if(res.response === "error")
        {
          $(".hero-stock-input-container").addClass('hero-input-error');
          $(".hero-stock-input-container").find("input").addClass('hero-input-error-color-change');
          $(".hero-stock-input-container").find("i").addClass('hero-stock-input-icon-error');
          $('.disable-overlay').css('display', 'flex');
          $(".stockOutput").html("Not a real stock symbol");
          $(".loadingOverlay").fadeOut();
          $(".loadingOverlayGraphic").fadeOut();
        }
        else {
          $(".stockSearchInfoDialogStockPrice").html(`${res.response}`);
          $(".main-content").fadeIn("slow");
          $(".page-content").addClass('page-content-next-page');
          $(".site-logo").addClass('site-logo-next-newPage');
          $('.disable-overlay').css('display', 'none');
          $(".loadingOverlay").fadeOut();
          $(".loadingOverlayGraphic").fadeOut();
        }
      }
    })
  })
});


$(function() {
  $(".hero-stock-input-container").on("animationend", function(){
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
  });

  $(".stock-search-info-dialog").on("mouseleave", function(){
    $("#stockSearchInfoDialog").fadeOut();

      //menu.style.display = 'none';
      $("#stockSearchInfoDialog").removeClass('stock-search-info-dialog-animation');

  });
