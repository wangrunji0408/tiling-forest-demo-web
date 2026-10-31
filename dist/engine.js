// Rule definitions, map coordinates and tile IDs come from the original demo.
export const DIRS={u:[0,-1,'d'],r:[1,0,'l'],d:[0,1,'u'],l:[-1,0,'r']};
export const key=(x,y)=>`${x},${y}`;
export const parsePos=p=>p.replace(/[()\s]/g,'').split(',').map(Number);
export class Forest {
 constructor(data,save){
  this.data=data;this.defs=Object.fromEntries(Object.entries(data.tile).flatMap(([a,b])=>Object.entries(b).map(([c,d])=>[a+'.'+c,d])));
  this.cells=new Map();this.blocks=new Map();this.rewards=Object.values(data.palette.rewards.forest);this.start=parsePos(data.field.sections[0].start).join(',');
  const section=data.field.sections[0];
  for(const c of section.outer)this.addCell(c,null);
  for(const [id,cells]of Object.entries(section.blocks)){this.blocks.set(id,cells.map(c=>this.addCell(c,id)));}
  this.placed={};this.unlocked=new Set();this.earned=new Set();this.explored=new Set([this.start]);this.marks={};this.snapshots={};this.undoStack=[];this.redoStack=[];
  if(save)this.restore(save);this.update();
 }
 addCell(c,block){const [x,y]=parsePos(c.pos),k=key(x,y);const cell={x,y,k,block,fixed:c.tile||null};this.cells.set(k,cell);return k;}
 tile(k){return this.cells.get(k)?.fixed||this.placed[k]||null;}
 def(k){return this.defs[this.tile(k)];}
 available(){return this.rewards.slice(0,Math.min(this.rewards.length,this.earned.size+1));}
 neighbor(k,dir,n=1){const c=this.cells.get(k),[x,y]=DIRS[dir];return c?key(c.x+x*n,c.y+y*n):null;}
 compatible(a,b,d){if(!a||!b)return true;const opp=DIRS[d][2];return a.side[d]===b.side[opp]&&Boolean(a.path?.[d])===Boolean(b.path?.[opp]);}
 canPlace(k,tile,{ignoreLock=false}={}){
  const c=this.cells.get(k),a=this.defs[tile];if(!c||c.fixed||!c.block||!a)return false;
  if(!ignoreLock&&(!this.unlocked.has(c.block)||!this.available().includes(tile)))return false;
  return Object.keys(DIRS).every(d=>this.compatible(a,this.def(this.neighbor(k,d)),d));
 }
 linked(k,d,strict=false){const a=this.def(k),n=this.neighbor(k,d),b=this.def(n),opp=DIRS[d][2];return !!(a?.path?.[d]&&b?.path?.[opp]&&this.compatible(a,b,d)&&(!strict||(a.path[d]==='road'&&b.path[opp]==='road')));}
 walk(seeds,{allowed=null,strict=false}={}){const seen=new Set(),queue=[...seeds];for(let i=0;i<queue.length;i++){let k=queue[i];if(seen.has(k)||!this.def(k)?.path||(allowed&&!allowed.has(k)))continue;seen.add(k);for(const d in DIRS)if(this.linked(k,d,strict))queue.push(this.neighbor(k,d));}return seen;}
 gatePair(k){const a=this.def(k);if(a?.property?.type!=='gate')return null;const d=a.property.dir,mid=this.neighbor(k,d),end=this.neighbor(k,d,2),b=this.def(end);return b?.property?.type==='gate'&&b.property.dir===DIRS[d][2]&&Object.values(this.def(mid)?.path||{}).includes('road')?{mid,end}:null;}
 blockStatus(id){const keys=this.blocks.get(id),filled=keys.every(k=>this.tile(k)),valid=keys.every(k=>Object.keys(DIRS).every(d=>this.compatible(this.def(k),this.def(this.neighbor(k,d)),d))),roads=keys.filter(k=>Object.values(this.def(k)?.path||{}).includes('road'));
  // Open ground connects roads but is not itself required to join the road network.
  const connected=roads.length<2||roads.every(k=>this.walk([roads[0]],{allowed:new Set(keys)}).has(k));
  const gates=keys.filter(k=>this.def(k)?.property?.type==='gate').every(k=>this.gatePair(k));
  return {filled,valid,connected,gates,complete:filled&&valid&&connected&&gates,filledCount:keys.filter(k=>this.tile(k)).length,total:keys.length};
 }
 update(){
  const reached=this.walk(this.explored);for(const k of reached){if(!this.cells.get(k).block)this.explored.add(k);const c=this.cells.get(k);if(c.block)this.unlocked.add(c.block);for(const d in DIRS){if(!this.def(k)?.path?.[d])continue;const n=this.cells.get(this.neighbor(k,d));if(n?.block&&!this.tile(n.k))this.unlocked.add(n.block);if(n?.block&&this.linked(k,d))this.unlocked.add(n.block);}}
  this.status=new Map();this.justCompleted=[];
  for(const id of this.blocks.keys()){let s=this.blockStatus(id);this.status.set(id,s);if(s.complete&&!this.earned.has(id)){this.earned.add(id);this.unlocked.add(id);this.justCompleted.push(id);this.snapshots[id]=Object.fromEntries(this.blocks.get(id).filter(k=>this.placed[k]).map(k=>[k,this.placed[k]]));}}
  this.formed=new Set();const centers=new Set();for(const k of this.cells.keys()){let p=this.gatePair(k);if(p){this.formed.add(k);centers.add(p.mid);}}
  this.flowers=new Map();const seen=new Set();for(const k of this.cells.keys()){if(seen.has(k)||!Object.values(this.def(k)?.path||{}).includes('road'))continue;const group=this.walk([k],{strict:true});let count=[...group].filter(p=>centers.has(p)).length;for(const p of group){seen.add(p);this.flowers.set(p,count===1?'unique':count>1?'nonunique':'');}}
  this.cleared=this.status.get('3439').complete;this.completed=[...this.status.values()].every(s=>s.complete)&&[...this.cells.keys()].every(k=>this.def(k)?.property?.type!=='gate'||this.formed.has(k))&&[...this.flowers.values()].every(s=>s==='unique');
 }
 capture(){return {placed:{...this.placed},marks:{...this.marks}};}
 commit(action){this.undoStack.push(this.capture());if(this.undoStack.length>300)this.undoStack.shift();this.redoStack=[];action();this.update();}
 place(k,tile){if(!this.canPlace(k,tile)||this.tile(k)===tile)return false;this.commit(()=>this.placed[k]=tile);return true;}
 erase(k){if(!this.placed[k])return false;this.commit(()=>delete this.placed[k]);return true;}
 mark(k,v){if(!this.cells.has(k))return;this.commit(()=>{if(this.marks[k]===v)delete this.marks[k];else this.marks[k]=v;});}
 undo(){if(!this.undoStack.length)return false;this.redoStack.push(this.capture());Object.assign(this,this.undoStack.pop());this.update();return true;}
 redo(){if(!this.redoStack.length)return false;this.undoStack.push(this.capture());Object.assign(this,this.redoStack.pop());this.update();return true;}
 resetBlock(id){if(!this.blocks.has(id))return;this.commit(()=>{for(const k of this.blocks.get(id))delete this.placed[k];});}
 loadBlock(id){if(!this.snapshots[id])return false;const old={...this.placed};for(const k of this.blocks.get(id))delete this.placed[k];Object.assign(this.placed,this.snapshots[id]);const valid=this.blockStatus(id).valid;this.placed=old;if(!valid)return false;this.commit(()=>{for(const k of this.blocks.get(id))delete this.placed[k];Object.assign(this.placed,this.snapshots[id]);});return true;}
 save(){return {version:1,placed:this.placed,earned:[...this.earned],unlocked:[...this.unlocked],explored:[...this.explored],marks:this.marks,snapshots:this.snapshots};}
 restore(s){
  if(s.sections&&Array.isArray(s.tiles)){this.placed=Object.fromEntries(s.tiles.filter(c=>this.defs[c.tile]).map(c=>[parsePos(c.pos).join(','),c.tile]));this.earned=new Set(Object.entries(s.sections.forest?.blocks||{}).filter(([,v])=>v===2).map(([k])=>k));this.unlocked=new Set(Object.keys(s.sections.forest?.blocks||{}));this.explored=new Set((s.roads||[]).map(p=>parsePos(p).join(',')));}
  else {if(s.version!==1||!s.placed)throw Error('不是有效的存档文件');this.placed=Object.fromEntries(Object.entries(s.placed).filter(([k,v])=>this.cells.get(k)?.block&&!this.cells.get(k).fixed&&this.defs[v]));this.earned=new Set((s.earned||[]).filter(k=>this.blocks.has(k)));this.unlocked=new Set((s.unlocked||[]).filter(k=>this.blocks.has(k)));this.explored=new Set((s.explored||[]).filter(k=>this.cells.has(k)));this.marks=s.marks||{};this.snapshots=s.snapshots||{};}
  this.explored.add(this.start);
 }
}
