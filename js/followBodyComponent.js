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
    this.el.setAttribute("position", this.pibot.getAttribute("position"));
    this.el.setAttribute("rotation", this.pibot.getAttribute("rotation"));
  }
});
