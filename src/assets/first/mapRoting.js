const stepSpacing = 4;
const explodeDistance = 100;
const scrollRange = 1000;
const districts = {

  // HK Island
  'central-and-western': {
    top: 66.9,
    left: 48.75,
    width: 9.3
  },
  'eastern': {
    top: 66.1,
    left: 61.1,
    width: 13
  },
  'southern': {
    top: 70.84,
    left: 48.75,
    width: 25.97
  },
  'wan-chai': {
    top: 68.5,
    left: 57.45,
    width: 7.35
  },

  // Kowloon
  'sham-shui-po': {
    top: 52.75,
    left: 51.29,
    width: 8.05
  },
  'kowloon-city': {
    top: 52.79,
    left: 58.7,
    width: 8
  },
  'kwun-tong': {
    top: 56.79,
    left: 64.2,
    width: 7.4
  },
  'wong-tai-sin': {
    top: 48.79,
    left: 59.85,
    width: 8.1
  },
  'yau-tsim-mong': {
    top: 58.27,
    left: 54.98,
    width: 5.55
  },

  // New Territories
  'islands': {
    top: 61.42,
    left: 0.1,
    width: 76.43
  },
  'kwai-tsing': {
    top: 44.04,
    left: 42.03,
    width: 13
  },
  'north': {
    top: 0,
    left: 42.68,
    width: 45
  },
  'sai-kung': {
    top: 29.06,
    left: 67.27,
    width: 32.92
  },
  'sha-tin': {
    top: 30.65,
    left: 53.15,
    width: 19.16
  },
  'tai-po': {
    top: 12.59,
    left: 48.24,
    width: 45.67
  },
  'tsuen-wan': {
    top: 36.19,
    left: 27.17,
    width: 30.91
  },
  'tuen-mun': {
    top: 32.24,
    left: 11.1,
    width: 28.45
  },
  'yuen-long': {
    top: 10.15,
    left: 18.51,
    width: 32.19
  },
};


var map = new Vue({
  el: '.map-container',
  data: {
    stepSpacing: stepSpacing,
    trackingX: 320,
    isMouseDown: false,
    isDamping: false,
    isExploded: false,
    posDiff: 0,
    oriPosX: 0,
    side: 'down',
    $window: [],
    mapAngle: 0,
    perspectivePx: 0,
    selectedDistrictName: '',
    districts: $.extend(true, {}, districts),
    timer: 0,
  },
  mounted: function () {
    var that = this;

    that.mapResize();
    $(window).on('resize', function(){
      that.mapResize();
    });

    setInterval(function(){
      that.timer = that.timer + 25;
      that.mapAngle = that.timer > scrollRange ? 45 : Math.abs((that.timer / scrollRange)*45);
      that.perspectivePx = 50000/(that.mapAngle+5);
      console.log(that.mapAngle);
    }, 50);
  },
  methods: {
    onMousedown(e) {
      this.isMouseDown = true;
      this.isDamping = false;
      this.posDiff = 0;
      this.oriPosX = e.pageX;
    },
    onMouseup() {
      this.isMouseDown = false;
      this.isDamping = true;
      this.inertia(this.posDiff);
    },
    onMousemove(e) {
      if (this.isMouseDown) {
        this.posDiff = this.oriPosX - e.pageX;
        if (e.pageY > window.outerHeight / 2) {
          this.trackingX = this.trackingX + this.posDiff * 0.2;
          this.side = 'down';
        } else {
          this.trackingX = this.trackingX - this.posDiff * 0.2;
          this.side = 'up';
        }
      } else if (!this.isDamping) {
        // this.posDiff = this.oriPosX - e.pageX;
        // this.trackingX = this.trackingX + this.posDiff*0.01;
      }
      this.oriPosX = e.pageX;
    },
    onScroll() {
      // this.mapAngle = window.scrollY > scrollRange ? 45 : Math.abs((window.scrollY / scrollRange)*45);
      // this.perspectivePx = 50000/(this.mapAngle+5);
    },
    selectDistrict(selector) {
      console.log(selector);
      this.selectedDistrictName = selector;
    },
    explodeDistrict(selector) {
      var selectedDistrict = this.districts[this.selectedDistrictName];
      var thisDistrict = this.districts[selector];
      if (thisDistrict !== selectedDistrict) {
        var angle = Math.atan2((selectedDistrict.top - thisDistrict.top), (thisDistrict.left - selectedDistrict.left));
        thisDistrict.top = selectedDistrict.top - explodeDistance * Math.sin(angle);
        thisDistrict.left = selectedDistrict.left + explodeDistance * Math.cos(angle);
        thisDistrict.translateY = (selectedDistrict.top - explodeDistance * Math.sin(angle)) - thisDistrict.top;
        thisDistrict.translateX = (selectedDistrict.left + explodeDistance * Math.cos(angle)) - thisDistrict.left;
      }
    },
    explodeAllDistricts() {
      for (var districtName in districts) {
        this.explodeDistrict(districtName);
      }
      this.isExploded = true;
    },
    unexplodeAllDistricts() {
      for (var districtName in districts) {
        this.unexplodeDistrict(districtName);
      }
      this.isExploded = false;
    },
    unexplodeDistrict(selector) {
      var thisDistrict = this.districts[selector];
      thisDistrict.top = districts[selector].top;
      thisDistrict.left = districts[selector].left;
      thisDistrict.translateX = 0;
      thisDistrict.translateY = 0;
    },
    toggleExplode() {
      if (!this.isExploded) {
        this.explodeAllDistricts();
      } else {
        this.unexplodeAllDistricts();
      }
    },
    replay() {
      this.timer = 0;
      console.log("replay");
    },
    getLeft(selector) {
      return 'testing';
    },
    inertia(speed) {
      if( Math.abs(speed) > 0.4 && this.isDamping === true ) {
        speed = speed * 0.99;
        if (this.side === 'down') {
          this.trackingX = this.trackingX + speed * 0.02;
        } else {
          this.trackingX = this.trackingX - speed * 0.02;
        }
        setTimeout(() => {
          this.inertia(speed);
        }, 10);
      } else {
        this.isDamping = false;
      }
    },
    mapResize() {
      // $('.map-container').css('width', $('.content').width()*1.66 );
      // $('.map-container').css('padding-bottom', $('.content').width()*1.66*0.78 );
    }
  },
});


/* ---------------------
/  Utilities Functions
/  --------------------- */

// using console in markup
Vue.prototype.console = window.console;
Vue.prototype.window = window;

// get css rule of an element
function css(el) {
  var sheets = document.styleSheets, ret = [];
  el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector
      || el.msMatchesSelector || el.oMatchesSelector;
  for (var i in sheets) {
    var rules = sheets[i].rules || sheets[i].cssRules;
    for (var r in rules) {
      if (el.matches(rules[r].selectorText)) {
        ret.push(rules[r].style);
      }
    }
  }
  return ret;
}
