/**
 * Tween a property
 */
define([
    'apply-fn',
    // requestAnimationFrame polyfill
    'raf',
    // tiny promises implementation
    'pinkyswear', 
  ], function (
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
    var promise;
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
        promise(true);
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


      var i;
      var len = ammountToAnimate.length;
      var ammounts = [];
      for(i = 0; i < len; i++) {
        ammounts.push(ammountFrom[i] + ammountToAnimate[i] * proportion);
      }
      stepCb.apply(null, ammounts);
    }

    return {
      init: function (props, dur, fn) {
        ammountToAnimate    = [];
        ammountFrom         = [];
        duration            = dur;
        animationFn         = fn;
        start               = undefined;
        elapsed             = 0;
        isPaused            = false;

        props.forEach(function (prop) {
          ammountToAnimate.push(prop.to - prop.from);
          ammountFrom.push(prop.from);
        });
      },

      start: function (cb) {
        stepCb   = cb;
        promise  = window.pinkySwear();
        window.requestAnimationFrame(animate);
        return promise;
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

      animate: function (props, dur, fn, cb) {
        this.init(props, dur, fn);
        return this.start(cb);
      },

      /**
       * Animates a chain of animations sequentially
       */
      chain: function (arr, cb) {
        var self = this;
        var len  = arr.length;
        var chainPromise = window.pinkySwear();

        function startPath(arr, cb) {
          if(!arr || arr.length === 0) {
            return;
          }

          var item = arr.shift();
          self.animate(item.props, item.dur, item.fn, cb).then(function () {
            startPath(arr, cb);
          }).then(function () {
            len = len - 1;
            if(len === 0) {
              chainPromise(true);
            }
          });
        }

        startPath(arr, cb);
        return chainPromise;
      }
    };
  };
});
