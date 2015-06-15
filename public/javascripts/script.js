/* Author: CMND-O */
var $hero       = $("#hero");
var $himage     = $("#hero-image");
var $thumbs     = $("#gallery-thumbs a");
var $ptitle     = $("#title-description");
var $ytemb      = $("#ytembed");
var $vemb       = $("#vembed");
var $cookieOpts = {expires: 7, path: '/'};
var $mobileName = "wine-cask-mobile";

$(function() {
  isMobile();
  links();

  // toggle press articles
  $("#articles article div").hide();
  $("#articles article h2").click(function() {
    $(this)
      .toggleClass("open")
      .next("div").slideToggle();
  });

  // gallery
  if ($thumbs.length) {
    // fade in thumbnails
    $thumbs.find("img").hide();
    $("#gallery-thumbs img").each(function(index) {
      $(this).delay(100*index).fadeIn(200);
    });

    fa = $("#gallery-thumbs a:first");
    var fat = fa.data("title");
    var fad = fa.data("description") != "" ? "<em>"+fa.data("description")+"</em>" : "";
    //$ptitle.html(fat + " " + fad);
    $ptitle.html("Wine Cask Restaurant");

    $thumbs.hover(function() {
      var mom = $(this).parent("li");
      var index = mom.index();
      if (mom.hasClass("active")) {
        return;
      } else {
        mom.addClass("dark");
        $(this).find("img").stop().animate({
          opacity: 0.6
        }, 200)
      }
    }, function() {
      var mom = $(this).parent("li");
      var index = mom.index();
      if ($(this).parent("li").hasClass("active")) {
        return;
      } else {
        $(this).find("img").stop().animate({
          opacity: 1
        }, 200, function() {
          mom.removeClass("dark");
        })
      }
    });

    $thumbs.click(function(e) {
      e.preventDefault();
      var mom     = $(this).parent("li");
      var type    = mom.data("type");
      var title   = $(this).data("title");
      var desc    = $(this).data("description") != "" ? "<em>" + $(this).data("description") + "</em>" : "";
      var caption = title + " " + desc;

      if (mom.hasClass("active")) {
        return;
      } else {
        $("#gallery-thumbs li.active")
          .removeClass("dark active")
          .find("img")
          .animate({
            opacity: 1
          }, 350);
        mom.addClass("active");
        mom.not(".dark").addClass("dark");
        // video
        if (type == "gallery-vid") {
          var vsvc  = $(this).data("service").toLowerCase();
          var vid   = $(this).data("videoid");
          // youtube
          if (vsvc == "youtube") {
            $('#hero-img')
              .not(":hidden")
              .animate({
                opacity: 0
              }, 350)
              .addClass("paused");
            $("#vembed")
              .attr({
                "width": 0,
                "height": 0,
                "src": ""
              })
              .animate({
                opacity: 0
              }, 350);
            $("#ytembed")
              .attr({
                "width": 1000,
                "height": 580,
                "src": "http://www.youtube.com/embed/" + vid + "?hd=1"
              })
              .animate({
                opacity: 1
              })
          }
          // vimeo
          if (vsvc == "vimeo") {
            $('#hero-img')
              .not(":hidden")
              .animate({
                opacity: 0
              }, 350)
              .addClass("paused");
            $("#ytembed")
              .attr({
                "width": 0,
                "height": 0,
                "src": ""
              })
              .animate({
                opacity: 0
              }, 350);
            $("#vembed")
              .attr({
                "width": 1000,
                "height": 563,
                "src": "http://player.vimeo.com/video/" + vid
              })
              .animate({
                opacity: 1
              });
          }
        }
        // image
        if (type == "gallery-img") {
          var newImg  = this.href;
          $("#ytembed")
            .not(":hidden")
            .animate({
              opacity: 0
            })
            .attr({
              "width": 0,
              "height": 0,
              "src": ""
            });
          $("#vembed")
            .not(":hidden").animate({
              opacity: 0
            })
            .attr({
              "width": 0,
              "height": 0,
              "src": ""
            });
          $('#hero-img')
            .removeClass("paused")
            .animate({
              opacity: 0
            }, 350, function() {
              $(this)
                .show()
                .attr("src", newImg)
                .load(function() {
                  $(this)
                    .animate({
                      opacity: 1
                    }, 350)
                })
            });
        }
        $ptitle.html(caption);
      }
    });
  }
});

$(window).load(function() {
  if ($("#hero .slideshow").length) {
    cycleSlideshow();
  }
})

function links() {
  // open external links in new window
  var externalLink = $("a[rel='external']");
  externalLink.each(function() {
    $(this).click(function(e) {
      e.preventDefault();
      window.open(this.href);
    });
  });

  var emailLink = $("a[rel='email']");
  emailLink.each(function(e) {
    $(this).click(function() {
      var to = $(this).data("to");
      var dom = $(this).data("domain");
      this.href = "mailto:"+to+"@"+dom;
    });
  });
}

function cycleSlideshow() {
  $("#hero .slideshow").cycle({
    delay: 1500,
    timeout: 2500
  });
}

function isMobile() {
  if ((screen.width <= 699) && ($.cookie($mobileName) == null)) {
    document.location = "/mobile";
  }
}
