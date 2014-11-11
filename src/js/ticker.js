/**
 * Tick 60 times per second or so, as much as browser allows it!
 * Calls a function on each tick
 */
define([
    // requestAnimationFrame polyfill
    'raf'
  ], function (
  ) {

  'use strict';

  return function (tickCallback) {
    var isPaused;
    var pausedTime = 0;
    var pauseStart = 0;
    var elapsed;
    var start;

    function tick(currentTime) {
      if(isPaused) {
        pauseStart = currentTime;
        return;
      }

      if(pauseStart > 0) {
        pausedTime = pausedTime + currentTime - pauseStart;
        pauseStart = 0;
      }
      currentTime = currentTime - pausedTime;

      if(start === null) {
        start   = currentTime;
        elapsed = 0;
      } else {
        elapsed = currentTime - start;
      }

      tickCallback(elapsed, currentTime);
      window.requestAnimationFrame(tick);
    }

    return {
      start: function () {
        if(isPaused) {
          this.unpause();
          return;
        }

        isPaused     = false;
        pauseStart   = 0;
        elapsed      = 0;
        start        = null;
        window.requestAnimationFrame(tick);
      },

      stop: function () {
        elapsed = 0;
        this.pause();
      },

      pause: function () {
        isPaused = true;
      },

      unpause: function () {
        if(isPaused) {
          isPaused = false;
          window.requestAnimationFrame(tick);
        }
      },

      toggle: function () {
        if(isPaused) {
          this.unpause();
        } else {
          this.pause();
        }
      },

    };
  };
});
