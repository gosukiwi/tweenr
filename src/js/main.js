'use strict';

require.config({
  paths: {
    'jquery': '../../vendor/jquery/dist/jquery',
    'pinkyswear': '../../vendor/pinkyswear/pinkyswear'
  }
});

require([
    'examples/example-2'
  ], function(
  ) {
    console.log('Hello');
});
