/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

$(window).scroll(function() {
  50 < $(".navbar").offset().top ? $(".navbar-fixed-top").addClass("top-nav-collapse") : $(".navbar-fixed-top").removeClass("top-nav-collapse");
});
$(function() {
  $("a.page-scroll").bind("click", function(a) {
    var b = $(this);
    $("html, body").stop().animate({scrollTop:$(b.attr("href")).offset().top}, 1500, "easeInOutExpo");
    a.preventDefault();
  });
});
$(".navbar-collapse ul li a").click(function() {
  $(".navbar-toggle:visible").click();
});