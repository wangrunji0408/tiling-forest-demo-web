// Pointer gestures are independent of the puzzle: a drag or multi-touch session
// must never turn into a placement when the final finger is lifted.
export const clampScale = s => Math.min(4, Math.max(.35, s));
export class MapGestures {
  constructor({getCamera, setCamera, getViewport, onTap, onEnd = () => {}}) {
    Object.assign(this, {getCamera, setCamera, getViewport, onTap, onEnd});
    this.points = new Map();
    this.moved = false;
    this.multi = false;
  }
  get active() { return this.points.size > 0; }
  position(e) { return {x:e.clientX, y:e.clientY, button:e.button, type:e.pointerType}; }
  down(e) {
    if (!this.active) { this.moved = false; this.multi = false; }
    this.points.set(e.pointerId, this.position(e));
    if (this.points.size > 1) this.multi = true;
    this.rebase();
  }
  rebase() {
    const pts = [...this.points.values()];
    if (!pts.length) return;
    const cam = {...this.getCamera()};
    this.pan = {...pts[0], cam};
    if (pts.length > 1) {
      const [a,b] = pts, v = this.getViewport();
      const x = (a.x+b.x)/2, y = (a.y+b.y)/2;
      this.pinch = {
        distance: Math.max(1, Math.hypot(a.x-b.x, a.y-b.y)), scale:cam.scale,
        wx:cam.x+(x-v.width/2)/(32*cam.scale),
        wy:cam.y+(y-v.height/2)/(32*cam.scale)
      };
    }
  }
  move(e) {
    if (!this.points.has(e.pointerId)) return;
    this.points.set(e.pointerId, this.position(e));
    const pts = [...this.points.values()];
    if (pts.length > 1) {
      const [a,b] = pts, p = this.pinch, v = this.getViewport();
      const scale = clampScale(p.scale*Math.hypot(a.x-b.x,a.y-b.y)/p.distance);
      this.setCamera({scale, x:p.wx-((a.x+b.x)/2-v.width/2)/(32*scale), y:p.wy-((a.y+b.y)/2-v.height/2)/(32*scale)});
      this.moved = true;
    } else {
      const a = pts[0], dx = a.x-this.pan.x, dy = a.y-this.pan.y;
      if (Math.hypot(dx,dy) > (a.type==='touch'?9:5)) this.moved = true;
      if (this.moved || this.multi) this.setCamera({...this.pan.cam, x:this.pan.cam.x-dx/(32*this.pan.cam.scale), y:this.pan.cam.y-dy/(32*this.pan.cam.scale)});
    }
  }
  up(e, cancelled = false) {
    if (!this.points.has(e.pointerId)) return;
    // Include the release position even if the browser coalesced the last move.
    if (!cancelled) this.move(e);
    const canTap = this.points.size===1 && !this.moved && !this.multi && !cancelled;
    this.points.delete(e.pointerId);
    if (cancelled) this.multi = true;
    if (this.active) this.rebase();
    else {
      if (canTap) this.onTap(e.clientX,e.clientY,e.button,e.pointerType);
      this.onEnd();
    }
  }
  cancel() { this.points.clear(); this.multi = true; this.onEnd(); }
}
