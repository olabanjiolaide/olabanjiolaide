(() => {
'use strict';
const fixtures = Object.freeze({
 account: Object.freeze({text:'I cannot reset my password.',suggestion:'ACCOUNT',reason:'An illustrative account-access category. Every suggestion still requires human confirmation.'}),
 payment: Object.freeze({text:'I was charged twice for my monthly subscription.',suggestion:'PAYMENT',reason:'An illustrative payment category. The mention of a subscription supplies context; inspect the actual request.'}),
 multiple: Object.freeze({text:'I cannot sign in, and I was charged twice.',suggestion:null,reason:'This authored example has two unresolved needs. A single category is not a complete interpretation; keep it in review or demonstrate a manual correction.'})
});
const get = id => document.getElementById(id);
let staged = null;
let records = [];
let nextId = 1;
const feedback = message => { get('demo-feedback').textContent = message; };
function step(active) {
 ['example','review','save'].forEach(name => {
  const element = get('step-'+name);
  if(name===active) element.setAttribute('aria-current','step');
  else element.removeAttribute('aria-current');
 });
}
function choose() {
 const fixture = fixtures[get('scenario').value];
 get('request-message').textContent = fixture.text;
 staged = null;
 get('review-form').hidden = true;
 get('review-placeholder').hidden = false;
 get('review-form').reset();
 step('example');
}
function renderRecords() {
 const body = get('records-body');
 body.replaceChildren();
 for(const record of records) {
  const row = document.createElement('tr');
  [record.id,record.originalSuggestion || 'Withheld',record.reviewerCategory || 'Not confirmed',record.status].forEach(value => {
   const cell = document.createElement('td'); cell.textContent=value; row.append(cell);
  });
  const cell = document.createElement('td');
  const button = document.createElement('button');
  button.type='button';button.className='demo-secondary';button.textContent='Inspect';
  button.setAttribute('aria-label','Inspect '+record.id);button.dataset.recordId=record.id;
  cell.append(button);row.append(cell);body.append(row);
 }
 get('record-count').textContent=records.length+' saved';
 get('empty-records').hidden=records.length>0;
 get('records-table-wrap').hidden=records.length===0;
}
get('scenario').addEventListener('change',()=>{choose();feedback('Example changed. Previously saved reviews remain in this page until reset or reload.');});
get('load-example').addEventListener('click',()=>{
 staged=fixtures[get('scenario').value];
 get('original-suggestion').textContent='Original illustrative suggestion: '+(staged.suggestion || 'Withheld — human review needed');
 get('suggestion-reason').textContent=staged.reason;
 get('confirmed-category').value=staged.suggestion || 'REVIEW';
 get('review-status').value=staged.suggestion ? 'In progress' : 'Needs review';
 get('review-form').hidden=false;get('review-placeholder').hidden=true;
 step('review');feedback('Illustrative suggestion loaded. Review before saving.');
 get('confirmed-category').focus();
});
get('review-form').addEventListener('submit',event=>{
 event.preventDefault();
 if(!staged) return;
 const category=get('confirmed-category').value;
 const status=get('review-status').value;
 const notes=get('review-notes').value.trim();
 if(category==='REVIEW' && status!=='Needs review') {
  feedback('Choose a reviewer category before marking this example in progress or resolved.');
  get('confirmed-category').focus();return;
 }
 if(status==='Resolved' && !notes) {
  feedback('Add a fictional resolution note before marking the example resolved.');
  get('review-notes').focus();return;
 }
 const record=Object.freeze({id:'DEMO-'+String(nextId++).padStart(3,'0'),message:staged.text,originalSuggestion:staged.suggestion,reviewerCategory:category==='REVIEW'?null:category,status,notes});
 records.push(record);renderRecords();step('save');
 feedback(record.id+' saved in this page. The original suggestion is preserved.');
});
get('records-body').addEventListener('click',event=>{
 const button=event.target.closest('button[data-record-id]');
 if(!button) return;
 const record=records.find(item=>item.id===button.dataset.recordId);
 if(!record) return;
 const list=get('record-detail-list');list.replaceChildren();
 const fields=[['Record',record.id],['Synthetic request',record.message],['Original illustrative suggestion',record.originalSuggestion||'Withheld'],['Reviewer category',record.reviewerCategory||'Not confirmed'],['Handling status',record.status],['Review note',record.notes||'No note']];
 for(const [label,value] of fields) {
  const group=document.createElement('div'),term=document.createElement('dt'),description=document.createElement('dd');
  term.textContent=label;description.textContent=value;group.append(term,description);list.append(group);
 }
 get('record-detail').hidden=false;get('record-detail').focus();
});
get('reset-demo').addEventListener('click',()=>{
 records=[];nextId=1;get('scenario').value='account';choose();renderRecords();
 get('record-detail').hidden=true;get('record-detail-list').replaceChildren();
 feedback('Demo reset. All page-session records and notes have been cleared.');
});
get('demo-workspace').hidden=false;
choose();renderRecords();
})();