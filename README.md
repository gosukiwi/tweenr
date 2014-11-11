# Tweenr
A simple property tween library. Use this to easily tween values!

## Usage
Tweenr is a tweening library which "animates" sets of properties in an easy
manner. It's abstracted from rendering, so you can use it for pretty much
anything.

    require(['tweenr'], function(tweenr) {
      'use strict';

      // the parameter name is irrelevant, only the order matters
      function render(first, second) {
        // do something with the values, for example
        $('#some-element')
          .width(first + 'px')
          .height(first + 'px')
        ;
      }

      // Make a 1 second animation (1000ms), following a square function curve,
      // and call the 'render' function on each step.
      tweenr().animate([
        // First property from 0 to 50
        { from: 0, to: 50 },
        // Second property from 10 to 100
        { from: 10, to: 100 },
      ], 1000, 'square', render);
    });

You can also use `chain` to make a lot of sequential animations.

    tweenr().chain([
      // Animation 1
      { 
        props: [{ from: 0, to: 300 }, { from: 0, to: 100 }],
        dur: 1000,
        fn:  'linear'
      },
      // Animation 2, starts once Animation 1 is done
      { 
        props: [{ from: 300, to: 0 }, { from: 100, to: 0 }],
        dur: 1000,
        fn:  'square'
      }
    ], render);

## Installation
You'll need RequireJS or a similar AMD library in order to easily use tweenr for
now. You can install tweenr using **bower**.

    bower install tweenr

## Create build 
To create a build file just use `r.js -o build.js`. It depends on jQuery and
RequireJS.
