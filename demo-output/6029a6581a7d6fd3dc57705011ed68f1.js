// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({10:[function(require,module,exports) {
(function(window, factory){
    "use strict";
    if(typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = factory()
    }else {
        window.canvasSign = factory()
    }
})(window,function(){
    var canvas,
        ctx,
        isDraw = false;
        defaults = {
            width:'100%',
            height:'100%',
            color:'#888888',
        }

    var canvasSign = function(el,options){
        return new canvasSign.prototype.init(el,options);
    }

    canvasSign.prototype = {
        draw:function(){
            ctx.beginPath();
            ctx.strokeStyle = this.opt.color;
            ctx.lineWidth = (1 - this.speed) *10;
            ctx.lineCap = 'round';
            ctx.moveTo(this.prevX, this.prevY);
            ctx.lineTo(this.moveX, this.moveY);
            ctx.stroke();
        },
        save:function(){
            var imageData = this.canvas.toDataURL('image/png');
            return imageData;
        },
        clear:function(){
            ctx.clearRect(0,0, canvas.width, canvas.height);
        },
        resize:function(){
            this.canvas.style.cssText = 'width:'+ this.opt.width + ';height:' + this.opt.height;
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        },
        merge:function(target,obj){
            var name;
            for (name in obj){
                if(target[name] === obj[name]) continue;
                target[name] = obj[name];
            }
            return target;
        },
        preventDefaultHandle:function(e){
            e.preventDefault();
        },
        preventDefaut:function(){
            var self = this;
            document.body.addEventListener('touchmove', self.preventDefaultHandle)
        },
        cancelPreventDefault:function(){
            var self = this;
            document.body.removeEventListener('touchmove', self.preventDefaultHandle);
        },
        mousedown:function(e){
            this.preventDefaut();
            if(isDraw) return false;
            isDraw = true;
            if(e.changedTouches && e.changedTouches[0]){
                this.prevX = this.moveX = e.changedTouches[0].clientX - this.canvas.offsetLeft;
                this.prevY = this.moveY = e.changedTouches[0].clientY - this.canvas.offsetTop;
            }else{
                this.prevX = this.moveX = e.pageX - this.canvas.offsetLeft;
                this.prevY = this.moveY = e.pageY - this.canvas.offsetTop;
            }

        },
        mousemove:function(e){
            var self = this;
            if(!isDraw) return false;
            setTimeout(function(){
                if(e.changedTouches && e.changedTouches[0]){
                    self.moveX = e.changedTouches[0].clientX - self.canvas.offsetLeft;
                    self.moveY = e.changedTouches[0].clientY - self.canvas.offsetTop;
                }else{
                    self.moveX = e.pageX - self.canvas.offsetLeft;
                    self.moveY = e.pageY - self.canvas.offsetTop;
                }

                var _x = self.moveX - self.prevX,
                    _y = self.moveY - self.prevY;
                self.speed = Math.sqrt( _x * _x + _y * _y) / 30 / 5;

                self.draw();

                self.prevX = self.moveX;
                self.prevY = self.moveY;
            },30)
        },
        mouseup:function(e){
            isDraw = false;
            this.cancelPreventDefault();
        },
        bindEvent:function(){
            var self = this;
            canvas.addEventListener('mousedown',function(e){
                self.mousedown.call(self,e);
            });
            canvas.addEventListener('mousemove',function(e){
                self.mousemove.call(self,e);
            })
            document.addEventListener('mouseup',function(e){
                self.mouseup.call(self,e);
            });
            canvas.addEventListener('touchstart',function(e){
                self.mousedown.call(self,e);
            })
            canvas.addEventListener('touchmove',function(e){
                self.mousemove.call(self,e);
            })
            document.addEventListener('touchend',function(e){
                self.mouseup.call(self,e);
            })
            window.addEventListener('resize', function(e){
                self.resize.call(self)
            });
        }
    }

    canvasSign.prototype.init = function(el,options){
        this.opt = this.merge(defaults, options);

        if(!el){
            el = document.body;
            canvas = document.createElement('canvas');
            canvas.innerHTML = '您的浏览器不支持canvas'
        }

        ctx = canvas.getContext('2d');
        el.appendChild(canvas);
        this.canvas = canvas;
        this.resize();
        this.bindEvent();
    }

    canvasSign.prototype.init.prototype = canvasSign.prototype;

    return canvasSign;
})

},{}]},{},[10])