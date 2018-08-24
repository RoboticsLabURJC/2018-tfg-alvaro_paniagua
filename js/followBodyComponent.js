AFRAME.registerComponent("follow-body", {
  'schema': {
    entityId: {
      type:'string',
      default:''
    }
  },
  init: function(){
    this.pibot = document.querySelector("#" + this.data.entityId);
  },
  tick: function(){
    let pibotPos = this.pibot.getAttribute("position");
    pibotPos.y += 0.2;

    this.el.setAttribute("position", pibotPos);
    this.el.setAttribute("rotation", this.pibot.getAttribute("rotation"));
    this.el.addEventListener('raycaster-intersection', function(evt){
      var e = new CustomEvent('intersection-detected', {detail: evt.detail});
      this.dispatchEvent(e);
    });
  }
});
