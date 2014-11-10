require(['jquery', 'tweenr'], function($, tweenr) {
  'use strict';

  var $title = $('#title');

  function render(val) {
    $title.css({ transform: 'translateY(' + val + 'px)' });
  }

  var animation = tweenr();
  animation.path([
    { dur: 1000, from: 0, to: 100 },
    { dur: 1000, from: 100, to: 0, fn: 'square' }
  ], render);

  $title.on('click', function () {
    animation.toggle();
  });
});
