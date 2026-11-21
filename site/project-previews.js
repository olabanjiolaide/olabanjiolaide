(() => {
'use strict';
const root=document.querySelector('[data-preview]'); if(!root) return;
const edge=root.dataset.preview==='edge';
const $=id=>document.getElementById(id);
const sets=edge?{spike:[24,25,26,32,34,33,29,27,26,25,24,24],gap:[24,25,26,null,null,27,28,29,26,25,24,24],steady:[24,25,24,26,25,24,25,26,25,24,25,24]}:{mixed:[.18,.25,.47,.58,.72,.85,.61,.49,.32,.22,.16,.24],gap:[.18,.22,.35,null,null,.57,.72,.81,.62,.31,.21,.19],steady:[.15,.18,.21,.17,.22,.19,.16,.24,.18,.21,.17,.20]};
let acknowledged=new Set();
function el(tag,text){const e=document.createElement(tag);e.textContent=text;return e;}
function draw(values,gate){
 const svg=$('chart');svg.replaceChildren();
 const ns='http://www.w3.org/2000/svg';
 function add(tag,attrs,text){const e=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v));if(text)e.textContent=text;svg.append(e);}
 add('title',{id:'chart-title'},edge?'Synthetic temperature replay':'Authored probability replay');
 add('desc',{id:'chart-desc'},'Values are fictional. Only samples up to the selected replay position are shown. Missing values break the line.');
 const y=v=>195-(edge?(v-20)/18:v)*155;
 for(const v of edge?[20,25,30,35]:[0,.25,.5,.75,1]){add('line',{x1:48,y1:y(v),x2:696,y2:y(v),stroke:'#dce3dc'});add('text',{x:5,y:y(v)+5,fill:'#53686d','font-size':13},edge?v+'°C':String(v));}
 if(edge){add('line',{x1:48,y1:y(gate),x2:696,y2:y(gate),stroke:'#926a24','stroke-width':2,'stroke-dasharray':'6 5'});}
 let part=[];
 function flush(){if(part.length)add('polyline',{points:part.join(' '),fill:'none',stroke:'#326351','stroke-width':3});part=[];}
 values.forEach((v,i)=>{if(v===null){flush();return;}const x=48+i*58;part.push(x+','+y(v));add('circle',{cx:x,cy:y(v),r:4,fill:'#123039'});});flush();
 add('text',{x:48,y:222,fill:'#53686d','font-size':13},'Sample 1');
 add('text',{x:615,y:222,fill:'#53686d','font-size':13},'Sample 12');
}
function render(){
 const scenario=$('scenario').value, cursor=Number($('cursor').value), gate=Number($('gate').value), all=sets[scenario], values=all.slice(0,cursor+1), current=all[cursor];
 $('sample-label').textContent='Sample '+(cursor+1)+' of 12 · Synthetic example';
 $('next').disabled=cursor===11;
 $('gate-value').textContent=edge?gate+' °C':gate+'%';
 const events=$('events');events.replaceChildren();
 if(edge){
  let start=null,recovered=null;
  values.forEach((v,i)=>{if(start===null&&v!==null&&v>gate)start=i;else if(start!==null&&recovered===null&&v!==null&&v<=gate)recovered=i;});
  const key=scenario+':'+gate;const ack=acknowledged.has(key);
  const condition=current===null?'Unknown':current>gate?'Excursion':'Within threshold';
  $('metric-0').textContent=current===null?'Missing':current+' °C';
  $('metric-1').textContent=condition;
  $('metric-2').textContent=start===null?'No incident':ack?'Acknowledged':'Pending';
  $('detail').textContent=start===null?'No threshold-crossing incident has appeared in this replay.':recovered===null?'The excursion has not yet recovered. Review acknowledgement does not change the measured condition.':'The incident recovered at sample '+(recovered+1)+'. Recovery and review acknowledgement are separate states.';
  $('ack').disabled=start===null||ack;
  if(start!==null)events.append(el('li','Sample '+(start+1)+': threshold crossing opened an illustrative incident.'));
  if(recovered!==null)events.append(el('li','Sample '+(recovered+1)+': observed reading returned within threshold.'));
  values.forEach((v,i)=>{if(v===null)events.append(el('li','Sample '+(i+1)+': missing reading; condition unknown.'));});
  if(start!==null&&ack)events.append(el('li','Acknowledged in this page session. No device action was taken.'));
  if(!events.children.length)events.append(el('li','No incident or missing-reading event so far.'));
  $('status').textContent='Sample '+(cursor+1)+': '+condition+'. '+(start===null?'No incident to review.':ack?'Review acknowledged.':'Incident review pending.');
  $('chart-caption').textContent='Fictional temperature (°C). Dashed line: adjustable threshold. This simple rule is not the private project detector.';
 } else {
  const confidence=current===null?null:Math.max(current,1-current);
  const accepted=confidence!==null&&confidence+1e-9>=gate/100;
  const decision=current===null?'Withheld · missing':!accepted?'Withheld · low confidence':current>=.5?'Stress-like example':'Baseline-like example';
  $('metric-0').textContent=current===null?'Not available':current.toFixed(2);
  $('metric-1').textContent=decision;
  $('metric-2').textContent=values.filter(v=>v!==null).length+' / '+values.length;
  $('detail').textContent=current===null?'No probability exists for this missing window. Do not carry forward an earlier state.':'Authored p = '+current.toFixed(2)+'; confidence = '+confidence.toFixed(2)+'. '+(accepted?'The example passes the chosen confidence gate. This is not evidence of a correct or calibrated prediction.':'The example does not pass the chosen gate; its suggestion is withheld.');
  const sampleIndices=[...values.keys()].slice(-4);
  for(const i of sampleIndices){const v=values[i];events.append(el('li','Window '+(i+1)+': '+(v===null?'missing; suggestion withheld.':'authored p = '+v.toFixed(2)+'.')));}
  $('status').textContent='Window '+(cursor+1)+': '+decision+'. No model or sensor is connected.';
  $('chart-caption').textContent='Hand-authored stress-like probability (0–1), not physiological measurements or trained-model results. The confidence gate affects decisions, not these values.';
 }
 draw(values,edge?gate:gate/100);
}
$('scenario').addEventListener('change',()=>{$('cursor').value=0;acknowledged.clear();render();});
$('gate').addEventListener('input',render);
$('cursor').addEventListener('input',render);
$('next').addEventListener('click',()=>{$('cursor').value=Math.min(11,Number($('cursor').value)+1);render();});
$('reset').addEventListener('click',()=>{$('cursor').value=0;$('gate').value=edge?30:65;acknowledged.clear();render();});
if(edge)$('ack').addEventListener('click',()=>{acknowledged.add($('scenario').value+':'+Number($('gate').value));render();});
$('lab-panel').hidden=false;render();
})();