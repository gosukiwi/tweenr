require(['jquery', 'tweenr'], function($, tweenr) {
  'use strict';

  var $title = $('#title');

  function render(val) {
    $title.css({ transform: 'translateY(' + val + 'px)' });
  }

  function animate() {
    tweenr().path([
      { dur: 1000, from: 0, to: 100 },
      { dur: 1000, from: 100, to: 0, fn: 'square' }
    ], render);
  }

  $title.on('click', animate);
  animate();
});
