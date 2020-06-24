$(document).ready(function(){

  $(".mv-carousel > .slider").slick({
    dots: true,
    infinite: true
  });

  $(".character-carousel > .slider").slick({
    dots: true,
    infinite: false,
    slidesToShow: 6,
    draggable: false
  });

  $(".contents-list-01 > li").heightLine({
    minWidth:749
  });

  if (navigator.userAgent.indexOf('iPhone') > 0) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('iPhone');
  }
 
  if (navigator.userAgent.indexOf('iPad') > 0) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('iPad');
  }

  var headerSpeed = 500;
  var headerHref;
  var headerTarget;
  var headerPosition;
  var headerHeight;
  var urlHash = location.hash;
  if(urlHash) {
    $("html, body").stop().scrollTop(0);
    setTimeout(function(){
      headerTarget = $(urlHash);
      headerHeight = $("header").outerHeight();
      headerPosition = headerTarget.offset().top - headerHeight;
      $("html, body").stop().animate({scrollTop:headerPosition}, headerSpeed);
    }, "swing");
  }
  $('a[href^="#"]').click(function(){
    headerHref= $(this).attr("href");
    headerTarget = $(headerHref == "#" || headerHref == "" ? 'html' : headerHref);
    headerPosition = headerTarget.offset().top;
    headerHeight = $("header").outerHeight();
    headerPosition = headerPosition - headerHeight;
    $("html, body").animate({scrollTop:headerPosition}, headerSpeed, "swing");
    return false;
  });

  var pagetop = $('.btn-scroll-top');
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
            pagetop.fadeIn();
      } else {
            pagetop.fadeOut();
      }

      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop(); 
      var footHeight = $("footer").outerHeight(); 
      if ( scrollHeight - scrollPosition  <= footHeight ) {

        $(".btn-scroll-top").css({
          "position":"absolute"
        });
      } else { 
        $(".btn-scroll-top").css({
          "position":"fixed"
        });
      }
    });
       pagetop.click(function () {
           $('body, html').animate({ scrollTop: 0 }, 500);
              return false;
  });
    function imgChange(){
        var imagePath = $(this).parent().parent().parent().children('.image');
      var imagePathPc = imagePath.children('.sp-none');
      var imagePathSp = imagePath.children('.pc-none');
      var srcPc;
      var srcsetPc;
      var srcSp;
      if(imagePath.hasClass('changed')){
        srcPc = imagePathPc.attr('src').replace('before', 'normal');
        srcsetPc = imagePathPc.attr('srcset').replace('before.png', 'normal.png');
        srcsetPc = srcsetPc.replace('before_2x', 'normal_2x');
        srcSp = imagePathSp.attr('src').replace('before', 'normal');
      }else{
        srcPc = imagePathPc.attr('src').replace('normal', 'before');
        srcsetPc = imagePathPc.attr('srcset').replace('normal.png', 'before.png');
        srcsetPc = srcsetPc.replace('normal_2x', 'before_2x');
        srcSp = imagePathSp.attr('src').replace('normal', 'before');
      }
      imagePathPc.attr('src', srcPc);
      imagePathPc.attr('srcset', srcsetPc);
      imagePathSp.attr('src', srcSp);
      imagePath.toggleClass('changed');
      return false;
    }
  $('.btn-costume-anchor').click(imgChange);

  $('.drawer').drawer();

});

$(function(){

  var modalTop;
  var ua = navigator.userAgent;

/*  var touch_start_y;

  // タッチしたとき開始位置を保存しておく
  $(window).on('touchstart', function(event) {
    touch_start_y = event.originalEvent.changedTouches[0].screenY;
  });*/
   
  // 「.modal_open」をクリックしたらモーダルと黒い背景を表示する
  $('.modal_open').click(function(){

    // 固定用クラスを付与
    if (ua.indexOf("iPhone") < 0 && ua.indexOf("iPad") < 0 && ua.indexOf("Android") < 0) {
      $('body').addClass('modal-fixed');
    }

    // 黒い背景をbody内に追加
    $('body').append('<div class="modal_bg"></div>');
    $('.modal_bg').fadeIn();
 
    // data-targetの内容をIDにしてmodalに代入
    var modal = '#' + $(this).attr('data-target');
 
    // モーダルをウィンドウの中央に配置する
    function modalResize(){
        var w = $(window).width();
        var h = $(window).scrollTop();
        var x = (w - $(modal).outerWidth(true)) / 2;
        var y = h + 20;
        $(modal).css({'left': x + 'px','top': h + 'px'});
    }
 
    // modalResizeを実行
    modalResize();
    modalTop = $(modal).css("top");
    modalTop = parseInt(modalTop);
 
    // modalをフェードインで表示
    $(modal).fadeIn();
    if (ua.indexOf("iPhone") >= 0 || ua.indexOf("iPad") >= 0 || ua.indexOf("Android") >= 0){
      $('html, body').animate({scrollTop:modalTop}, 250, "swing");
    }
    else{
      $(modal).animate({scrollTop:0}, 250, "swing");
    }
 
    // .modal_bgか.modal_closeをクリックしたらモーダルと背景をフェードアウトさせる
    $('.modal_bg, .modal_close').off().click(function(){
            $('.modal_box').fadeOut();
            $('.modal_bg').fadeOut('slow',function(){
            $('.modal_bg').remove();
            // 固定用クラス削除
            $('body').removeClass('modal-fixed');
            /*// イベントを削除
            $(window).off('touchmove.noscroll');*/
        });
           if($(this).hasClass('character_close')){
        var imagePath = $(this).parent().parent().children('.image');
        var imagePathPc = imagePath.children('.sp-none');
        var imagePathSp = imagePath.children('.pc-none');
        var srcPc;
        var srcsetPc;
        var srcSp;
        if(imagePath.hasClass('changed')){
          setTimeout(function(){
          srcPc = imagePathPc.attr('src').replace('before', 'normal');
          srcsetPc = imagePathPc.attr('srcset').replace('before.png', 'normal.png');
          srcsetPc = srcsetPc.replace('before_2x', 'normal_2x');
          srcSp = imagePathSp.attr('src').replace('before', 'normal');
          imagePathPc.attr('src', srcPc);
          imagePathPc.attr('srcset', srcsetPc);
          imagePathSp.attr('src', srcSp);
          imagePath.toggleClass('changed');
          },1000);
          }
        }
    });
 
    // ウィンドウがリサイズされたらモーダルの位置を再計算する
    $(window).on('resize', function(){
      if (ua.indexOf("iPhone") < 0 && ua.indexOf("iPad") < 0 && ua.indexOf("Android") < 0){
        modalResize();
      }
    });
      if (ua.indexOf("iPhone") >= 0 || ua.indexOf("iPad") >= 0 || ua.indexOf("Android") >= 0){
      $(window).on('orientationchange', function(){
        modalResize();
      });
    }
 
    // .modal_switchを押すとモーダルを切り替える
    $('.modal_switch').click(function(){
 
      // 押された.modal_switchの親要素の.modal_boxをフェードアウトさせる
      var y = $(this).parents('.modal_box');
      $(this).parents('.modal_box').fadeOut();
 
      // 押された.modal_switchのdata-targetの内容をIDにしてmodalに代入
      var modal = '#' + $(this).attr('data-target');
 
      // モーダルをウィンドウの中央に配置する
      function modalResize(){
        var w = $(window).width();
        var h = $(window).scrollTop();
        var x = (w - $(modal).outerWidth(true)) / 2;
        var y = h + 20;
        if (ua.indexOf("iPhone") >= 0 || ua.indexOf("iPad") >= 0){
          h = modalTop;
        }
        $(modal).css({'left': x + 'px','top': h + 'px'});
      }
 
      // modalResizeを実行
      modalResize();
 
      $(modal).fadeIn();
      if (ua.indexOf("iPhone") >= 0 || ua.indexOf("iPad") >= 0){
        $('html, body').animate({scrollTop:modalTop}, 250, "swing");
      }
      else{
        $(modal).animate({scrollTop:0}, 250, "swing");
      }
        var imagePath = $(this).parent().parent().parent().children('.character-content').children('.image');
        var imagePathPc = imagePath.children('.sp-none');
        var imagePathSp = imagePath.children('.pc-none');
        var srcPc;
        var srcsetPc;
        var srcSp;
        if(imagePath.hasClass('changed')){
          setTimeout(function(){
          srcPc = imagePathPc.attr('src').replace('before', 'normal');
          srcsetPc = imagePathPc.attr('srcset').replace('before.png', 'normal.png');
          srcsetPc = srcsetPc.replace('before_2x', 'normal_2x');
          srcSp = imagePathSp.attr('src').replace('before', 'normal');
          imagePathPc.attr('src', srcPc);
          imagePathPc.attr('srcset', srcsetPc);
          imagePathSp.attr('src', srcSp);
          imagePath.toggleClass('changed');
          },1000);
          }
    });
  });

});