require(['jquery', 'tweenr'], function($, tweenr) {
  'use strict';

  var $title = $('#title');

  function render(x, y) {
    $title.css({ 
      transform: 'translateX(' + x + 'px) translateY(' + y + 'px)' 
    });
  }

  tweenr().animate([
    { from: 0, to: 50 },
    { from: 0, to: 100 },
  ], 1000, 'square', render).then(function () {
    console.log('finished animation');
  });

});
