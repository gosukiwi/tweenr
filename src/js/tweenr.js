/**
 * Tween a property
 */
define([
    'jquery', 
    'apply-fn',
    // requestAnimationFrame polyfill
    'raf'
  ], function (
    $, 
    ApplyFn
  ) {

  'use strict';

  return function () {
    var duration;
    var stepCb;
    var start;
    var elapsed;
    var ammountToAnimate;
    var ammountFrom;
    var animationFn;
    var defer;
    var isPaused;
    var pausedTime = 0;
    var pauseStart = 0;

    function applyFn(proportion, fn) {
      if(ApplyFn[fn]) {
        return ApplyFn[fn](proportion);
      } 

      return proportion;
    }

    function animate(currentTime) {
      if(isPaused) {
        pauseStart = currentTime;
        return;
      }

      if(pauseStart > 0) {
        pausedTime = pausedTime + currentTime - pauseStart;
        pauseStart = 0;
      }
      currentTime = currentTime - pausedTime;

      if(elapsed > duration) {
        defer.resolve(elapsed);
        return;
      }

      if(!start) {
        start   = currentTime;
        elapsed = 0;
      } else {
        elapsed = currentTime - start;
      }

      window.requestAnimationFrame(animate);
      // elapsed %
      var proportion = elapsed / duration;
      if(proportion > 1) {
        proportion = 1;
      }
      proportion = applyFn(proportion, animationFn);
      stepCb(ammountFrom + ammountToAnimate * proportion);
    }

    return {
      init: function (dur, from, to, fn) {
        ammountToAnimate    = to - from;
        ammountFrom         = from;
        duration            = dur;
        animationFn         = fn;
        start               = undefined;
        elapsed             = 0;
        isPaused            = false;
      },

      start: function (cb) {
        stepCb   = cb;
        defer    = $.Deferred();
        window.requestAnimationFrame(animate);
        return defer.promise();
      },

      pause: function () {
        isPaused = true;
      },

      unpause: function () {
        if(isPaused) {
          isPaused = false;
          window.requestAnimationFrame(animate);
        }
      },

      toggle: function () {
        if(isPaused) {
          this.unpause();
        } else {
          this.pause();
        }
      },

      animate: function (dur, from, to, fn, cb) {
        this.init(dur, from, to, fn);
        return this.start(cb);
      },

      /**
       * Animates though a path, defined in an array of objects:
       * [
       *   { dur: 1000, from: 0, to: 100, fn: 'linear' },
       *   { dur: 1000, from: 100, to: 50, fn: 'square' }
       * ]
       */
      path: function (arr, cb) {
        var self = this;
        var len  = arr.length;
        var pathDeferred = $.Deferred();

        function startPath(arr, cb) {
          if(!arr || arr.length === 0) {
            return;
          }

          var item = arr.shift();
          self.animate(item.dur, item.from, item.to, item.fn, cb).then(function () {
            startPath(arr, cb);
          }).then(function () {
            len = len - 1;
            if(len === 0) {
              pathDeferred.resolve();
            }
          });
        }

        startPath(arr, cb);
        return pathDeferred.promise();
      }
    };
  };
});
