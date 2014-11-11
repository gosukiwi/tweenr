# Tweenr
A tiny (3~kb minimized, 1.3~kb min+gzip) property tween library. Use this to
easily tween values!

## Why
There are a lot of animation libraries out there, but they are bloated and have
dependencies. jQuery works fine most of the time unless you want to animate
complex CSS properties or just want a "ticker". CreateJS provides a tween
library but it requires EaselJS or a custom ticker implementation. Tweenr was
designed to just work and abstract from rendering so you can use any library you
want for that, or even create your own implementation on top of tweenr.

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
          .height(second + 'px')
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
RequireJS. Window users might need to run `r.js.cmd` instead.

## Performance
Tweenr is tiny and built on top of `requestAnimationFrame` and defaults to
`setTimeout` if not available, so it should work fast. If you have performance
issues please feel free to open a ticket.
