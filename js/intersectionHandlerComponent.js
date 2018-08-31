AFRAME.registerComponent("intersection-handler", {
  schema: {
    fps: { type: 'number', default: 15 }
  },

  init: function() {
    this.bindMethods();
  },

  tick: function(){

    if(new Date().getTime()-this.lastTick<(1000/this.data.fps))return;
    if(this.isIntersecting){
      let distance = this.calculateDistance(this.el.object3D.position, this.hittedElem.object3D.position);
      this.el.emit('intersection-detected', distance);
    }
    this.lastTick = new Date().getTime();
  },

  bindMethods(){ // You could do all of this directly in your init() method, but I like to separate it.
    this.onIntersection = this.onIntersection.bind(this);
    this.onIntersectionClear = this.onIntersectionClear.bind(this);
  },

  play: function() {
    this.registerEventListeners();  // It's a good practice in general to enable your event listeners here.
  },

  pause: function() {
    this.deregisterEventListeners(); // Similarly a good practice to remove them here so that they don't stay bound while the scene isn't actually 'running'
  },

  registerEventListeners() {
    const sceneEl = this.el.sceneEl;

    sceneEl.addEventListener('raycaster-intersection', this.onIntersection);
    sceneEl.addEventListener('raycaster-intersection-cleared', this.onIntersectionClear);
  },

  deregisterEventListeners() {
    const sceneEl = this.el.sceneEl;

    sceneEl.removeEventListener('raycaster-intersection', this.onIntersection);
    sceneEl.removeEventListener('raycaster-intersection-cleared', this.onIntersectionClear);
  },

  onIntersection: function(e) {

    this.isIntersecting = true;
    if(e.detail.intersections[0].object){
      this.hittedElem = e.detail.intersections[0].object.el;
    }
  },

  onIntersectionClear: function(e) {

    this.isIntersecting = false;
  },

  calculateDistance: function(myElposition, hittedElposition) {
    // distance = sqrt((x2 - x1)^2 + (y2 - y1)^2) - rolloff
    let rolloffFactor = 0.8;
    let d = Math.sqrt(Math.pow((hittedElposition.x - myElposition.x), 2) + Math.pow((hittedElposition.y - myElposition.y), 2)) - rolloffFactor;
    return d;
  }

});
