require(['jquery', 'tweenr'], function($, tweenr) {
  'use strict';

  var $title = $('#title');

  function render(y, x) {
    $title.css({ transform: 'translateY(' + y + 'px) translateX(' + x + 'px)' });
  }

  var animation = tweenr();
  animation.chain([
    // Animation 1
    { 
      props: [{ from: 0, to: 300 }, { from: 0, to: 100 }],
      dur: 1000,
      fn:  'linear'
    },
    // Animation 2
    { 
      props: [{ from: 300, to: 0 }, { from: 100, to: 0 }],
      dur: 1000,
      fn:  'square'
    }
  ], render);
  animation.pause();

  $title.on('click', function () {
    animation.toggle();
  });
});
