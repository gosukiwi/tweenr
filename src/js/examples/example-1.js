require(['jquery', 'tweenr'], function($, tweenr) {
  'use strict';

  var $title = $('#title');

  function render(val) {
    $title.css({ transform: 'translateY(' + val + 'px)' });
  }
});
