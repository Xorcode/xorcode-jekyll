/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */
function belowEntryMetaClass(param) {
  if (body.hasClass('page') || body.hasClass('search') || body.hasClass('single-attachment') || body.hasClass('error404')) {
    return;
  }

  $('.entry-content').find(param).each(function () {
    var element = $(this),
      elementPos = element.offset(),
      elementPosTop = elementPos.top,
      entryFooter = element.closest('article').find('.entry-footer'),
      entryFooterPos = entryFooter.offset(),
      entryFooterPosBottom = entryFooterPos.top + (entryFooter.height() + 28),
      caption = element.closest('figure'),
      newImg;

    // Add 'below-entry-meta' to elements below the entry meta.
    if (elementPosTop > entryFooterPosBottom) {

      // Check if full-size images and captions are larger than or equal to 840px.
      if ('img.size-full' === param) {

        // Create an image to find native image width of resized images (i.e. max-width: 100%).
        newImg = new Image();
        newImg.src = element.attr('src');

        $(newImg).on('load.xorcode', function () {
          if (newImg.width >= 840) {
            element.addClass('below-entry-meta');

            if (caption.hasClass('wp-caption')) {
              caption.addClass('below-entry-meta');
              caption.removeAttr('style');
            }
          }
        });
      } else {
        element.addClass('below-entry-meta');
      }
    } else {
      element.removeClass('below-entry-meta');
      caption.removeClass('below-entry-meta');
    }
  });
}

$(window).resize(function () {
  var more = document.getElementById("menu-primary-menu-more");
  if ($(more).length > 0) {
    var windowWidth = $(window).width();
    var moreLeftSideToPageLeftSide = $(more).offset().left;
    var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

    if (moreLeftSideToPageRightSide < 330) {
      $("#menu-primary-menu-more .submenu .submenu").removeClass("fly-out-right");
      $("#menu-primary-menu-more .submenu .submenu").addClass("fly-out-left");
    }

    if (moreLeftSideToPageRightSide > 330) {
      $("#menu-primary-menu-more .submenu .submenu").removeClass("fly-out-left");
      $("#menu-primary-menu-more .submenu .submenu").addClass("fly-out-right");
    }
  }
});

$(document).ready(function () {
  var menuToggle = $("#js-mobile-menu").unbind();
  $("#menu-primary-menu").removeClass("show");

  menuToggle.on("click", function (e) {
    e.preventDefault();
    $("#menu-primary-menu").slideToggle(function () {
      if ($("#menu-primary-menu").is(":hidden")) {
        $("#menu-primary-menu").removeAttr("style");
      }
    });
  });

  body = $(document.body);

  $(window)
    .on('resize.xorcode', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        belowEntryMetaClass('img.size-full');
        belowEntryMetaClass('blockquote.alignleft, blockquote.alignright');
      }, 300);
    });

  belowEntryMetaClass('img.size-full');
  belowEntryMetaClass('blockquote.alignleft, blockquote.alignright');
});
