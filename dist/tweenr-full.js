define("raf",[],function(){var e=0,t=["ms","moz","webkit","o"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-e)),i=window.setTimeout(function(){t(n+r)},r);return e=n+r,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}),define("ticker",["raf"],function(){return function(e){function o(u){if(t){r=u;return}r>0&&(n=n+u-r,r=0),u-=n,s===null?(s=u,i=0):i=u-s,e(i,u),window.requestAnimationFrame(o)}var t,n=0,r=0,i,s;return{start:function(){if(t){this.unpause();return}t=!1,r=0,i=0,s=null,window.requestAnimationFrame(o)},stop:function(){i=0,this.pause()},pause:function(){t=!0},unpause:function(){t&&(t=!1,window.requestAnimationFrame(o))},toggle:function(){t?this.unpause():this.pause()}}}}),define("math-fn",[],function(){return{sqrt:function(e){return Math.sqrt(e)},square:function(e){return e*e},cube:function(e){return e*e*e},sin:function(e){return Math.sin(e)}}}),define("apply-fn",["math-fn"],function(e){return{sqrt:function(t){var n=0,r=1,i=(r-n)*t,s=e.sqrt(i);return s/e.sqrt(r-n)},square:function(t){var n=0,r=1,i=(r-n)*t,s=e.square(i);return s/e.square(r-n)},cube:function(t){var n=0,r=1,i=(r-n)*t,s=e.sqrt(i);return s/e.sqrt(r-n)},sin:function(t){var n=0,r=Math.PI/2,i=(r-n)*t,s=e.sin(i);return s/e.sin(r-n)}}}),function(e){function n(e){return typeof e=="function"}function r(e){return typeof e=="object"}function i(e){typeof setImmediate!="undefined"?setImmediate(e):typeof process!="undefined"&&process.nextTick?process.nextTick(e):setTimeout(e,0)}var t;e[0][e[1]]=function s(e){var o,u=[],a=[],f=function(e,t){return o==null&&e!=null&&(o=e,u=t,a.length&&i(function(){for(var e=0;e<a.length;e++)a[e]()})),o};return f.then=function(f,l){var c=s(e),h=function(){try{var e=o?f:l;if(n(e)){function i(e){var s,o=0;try{if(e&&(r(e)||n(e))&&n(s=e.then)){if(e===c)throw new TypeError;s.call(e,function(){o++||i.apply(t,arguments)},function(e){o++||c(!1,[e])})}else c(!0,arguments)}catch(u){o++||c(!1,[u])}}i(e.apply(t,u||[]))}else c(o,u)}catch(s){c(!1,[s])}};return o!=null?i(h):a.push(h),c},e&&(f=e(f)),f}}(typeof module=="undefined"?[window,"pinkySwear"]:[module,"exports"]),define("pinkyswear",function(){}),define("tweenr",["ticker","apply-fn","pinkyswear"],function(e,t){return function(){function f(e,n){return t[n]?t[n](e):e}function l(e){if(e>n){u(!0),a.stop();return}var t=e/n;t>1&&(t=1),t=f(t,o);var l,c=i.length,h=[];for(l=0;l<c;l++)h.push(s[l]+i[l]*t);r.apply(null,h)}var n,r,i,s,o,u,a;return{init:function(t,r,u){i=[],s=[],n=r,o=u,a=e(l),t.forEach(function(e){i.push(e.to-e.from),s.push(e.from)})},start:function(e){return r=e,u=window.pinkySwear(),a.start(),u},pause:function(){a.pause()},unpause:function(){a.unpause()},toggle:function(){a.toggle()},animate:function(e,t,n,r){return this.init(e,t,n),this.start(r)},chain:function(e,t){function s(e,t){if(!e||e.length===0)return;var o=e.shift();n.animate(o.props,o.dur,o.fn,t).then(function(){s(e,t)}).then(function(){r-=1,r===0&&i(!0)})}var n=this,r=e.length,i=window.pinkySwear();return s(e,t),i}}}});