'use strict';

require.config({
  paths: {
    //'text': '../../vendor/requirejs-text/text',
    'jquery': '../../vendor/jquery/dist/jquery'
  }
});

require([
    'examples/example-2'
  ], function(
  ) {
    console.log('Hello');
});
