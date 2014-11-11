'use strict';

require.config({
  paths: {
    'jquery': '../../vendor/jquery/dist/jquery',
  }
});

require([
    'examples/example-2'
  ], function(
  ) {
    console.log('Hello');
});
