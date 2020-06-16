$(document).ready(function(){

      // ナビゲーションのリンクを指定
  var navLink = $('.headr-nav-pc ul li a');
 
    // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
  var contentsArr = new Array();
  var targetContents;
  var targetContentsTop;
  var targetContentsBottom;
 
  // 現在地をチェックする
  function currentCheck() {
      for (var i = 0; i < navLink.length; i++) {
        // コンテンツのIDを取得
        targetContents = navLink.eq(i).attr('href');
        // ページ内リンクでないナビゲーションが含まれている場合は除外する
        if(targetContents.charAt(0) == '#') {
         // ページ上部からコンテンツの開始位置までの距離を取得
            targetContentsTop = $(targetContents).offset().top;
         // ページ上部からコンテンツの終了位置までの距離を取得
            targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
         // 配列に格納
            contentsArr[i] = [targetContentsTop, targetContentsBottom]
        }
      };
       // 現在のスクロール位置を取得
        var windowScrolltop = $(window).scrollTop() + $("header").outerHeight() + 3;
        for (var i = 0; i < contentsArr.length; i++) {
           // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
          if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop) {
                // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
               navLink.removeClass('current');
               navLink.eq(i).addClass('current');
                i == contentsArr.length;
          }
       };
       if( $(window).scrollTop() >= $("html").outerHeight() - $(window).height()) {
               navLink.removeClass('current');
               navLink.eq(4).addClass('current');
        }
        else if( $(window).scrollTop() < contentsArr[0][1] - $("header").outerHeight() ){
               navLink.removeClass('current');
               navLink.eq(0).addClass('current');
        }
  }
 
   // ページ読み込み時とスクロール時に、現在地をチェックする
  $(window).on('load scroll', function() {
      currentCheck();
  });

});