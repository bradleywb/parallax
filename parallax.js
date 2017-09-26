(function (window, $){
  'use strict';

  var ParallaxScroller = function (element, options){
    var _ = this;
    var defaults = {

    };

    _.element = element;
    _.settings = $.extend({}, defaults, options, true);

    _.SPEED_MAP = Object.freeze({
      'fast': 80,
      'default': 60,
      'slow': 40
    });

    return _;
  };

  ParallaxScroller.prototype.init = function (){
    var _ = this;
    var scrollPos;

    _.getLayers();

    // set initial position
    _.positionLayers();

    $(window).on('scroll', function (evt){
      // reposition layers
      _.positionLayers();
    });

    return _;
  };

  ParallaxScroller.prototype.getLayers = function (){
    var _ = this;
    var layers = $(_.element).find('[data-parallax-layer]');

    _.layers = [];

    layers.each(function (i, layer){
      _.layers[i] = {
        element: layer,
        speed: _.getLayerSpeed(layer)
      };
      _.getLayerSpeed(layer);
    });

    return _;
  };

  ParallaxScroller.prototype.getLayerSpeed = function (layer){
    var _ = this;
    var speedSetting = $(layer).data('speed') || $(layer).attr('[data-speed]');
    var speed;

    if(_.SPEED_MAP[speedSetting]){
      speed = _.SPEED_MAP[speedSetting];
    }else{
      // force the speed to be valid
      if(/^\d+$/.test(speedSetting) && speedSetting > 0){
        speed = speedSetting;
      }else{
        speed = _.SPEED_MAP['default'];
      }
    }

    return speed;
  };

  ParallaxScroller.prototype.positionLayers = function (){
    var _ = this;
    var scrollPos = _.element.getBoundingClientRect().top;

    $(_.layers).each(function (i, layer){
      $(layer.element).css({
        'top': (scrollPos * (layer.speed / 100)) + 'px'
      });
    });

    return _;
  };

  // jQuery Plugin
  $.fn.parallaxScroller = function (options){
    return this.each(function (i, element){
      return new ParallaxScroller(element, options).init();
    });
  };

  $(document).ready(function (){
    $('[data-parallax]').parallaxScroller();
  });
})(window, jQuery);
