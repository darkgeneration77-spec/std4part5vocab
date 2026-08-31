(()=>{
let locked=false;
function lockTest(){
 if(locked)return;
 locked=true;
 document.querySelectorAll('details').forEach(d=>{d.open=false;d.style.display='none'});
 document.querySelectorAll('.modebtn[data-mode]').forEach(b=>{
   if(b.dataset.mode!=='test'){b.disabled=true;b.style.opacity='.45';b.style.cursor='not-allowed'}
 });
 const testBtn=document.querySelector('.modebtn[data-mode="test"]');
 if(testBtn){testBtn.textContent='Test in Progress';testBtn.disabled=true}
 const shuffle=document.getElementById('reshuffle');
 if(shuffle){shuffle.disabled=true;shuffle.style.opacity='.45'}
 if(typeof setMode==='function')setMode('test');
 const notice=document.createElement('div');
 notice.id='testLockNotice';
 notice.style.cssText='margin:12px 0;padding:12px 16px;border-radius:14px;background:#fff3cd;border:2px solid #e0a800;font-weight:800;color:#5b3a00';
 notice.textContent='TEST IN PROGRESS — Notes are locked until you leave or reload this theme.';
 const bar=document.querySelector('.modebar');
 if(bar)bar.insertAdjacentElement('afterend',notice);
}
function init(){
 const btn=document.querySelector('.modebtn[data-mode="test"]');
 if(!btn)return;
 btn.textContent='Start Test';
 document.addEventListener('click',e=>{
   const t=e.target.closest('.modebtn[data-mode="test"]');
   if(!t||locked)return;
   e.preventDefault();e.stopImmediatePropagation();
   if(confirm('Start Test now? Once started, Notes will be locked and cannot be opened during this test.'))lockTest();
 },true);
}
document.addEventListener('DOMContentLoaded',init);
})();