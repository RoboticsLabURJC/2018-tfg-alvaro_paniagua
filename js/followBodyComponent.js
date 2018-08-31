AFRAME.registerComponent("follow-body", {
  'schema': {
    entityId: {
      type:'string',
      default:''
    }
  },
  init: function(){
    this.pibot = document.querySelector(this.data.entityId);
  },
  tick: function(){
    let pibotPos = this.pibot.object3D.position;
    let pibotRotation = this.pibot.object3D.rotation;
    let el = this.el;
    pibotPos.y += 0.2;

    el.object3D.position.set(pibotPos.x, pibotPos.y, pibotPos.z);
    el.object3D.rotation.set(pibotRotation.x, pibotRotation.y, pibotRotation.z);
  }
});
