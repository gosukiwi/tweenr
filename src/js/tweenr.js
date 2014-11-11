/**
 * Tween a property
 */
define([
    'ticker',
    'apply-fn',
    // tiny promises implementation
    'pinkyswear', 
  ], function (
    tweenrTicker,
    ApplyFn
  ) {

  'use strict';

  return function () {
    var duration;
    var stepCb;
    var ammountToAnimate;
    var ammountFrom;
    var animationFn;
    var promise;
    var ticker;

    function applyFn(proportion, fn) {
      if(ApplyFn[fn]) {
        return ApplyFn[fn](proportion);
      } 

      return proportion;
    }

    function onTick(elapsed) {
      if(elapsed > duration) {
        promise(true);
        // stops ticker, now elapsed back at 0
        ticker.stop();
        return;
      }

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
        ticker              = tweenrTicker(onTick);

        props.forEach(function (prop) {
          ammountToAnimate.push(prop.to - prop.from);
          ammountFrom.push(prop.from);
        });
      },

      start: function (cb) {
        stepCb   = cb;
        promise  = window.pinkySwear();
        // start ticker at 0 elapsed
        ticker.start();
        return promise;
      },

      pause: function () {
        ticker.pause();
      },

      unpause: function () {
        ticker.unpause();
      },

      toggle: function () {
        ticker.toggle();
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
