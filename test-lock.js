(()=>{
const themeId=()=>window.THEME_ID||'x';
const key=()=>`wordscoop_test_lock_${themeId()}`;
let locked=false;
function setDisabled(el,on){if(!el)return;el.disabled=on;el.style.opacity=on?'.45':'';el.style.cursor=on?'not-allowed':''}
function lockTest(restored=false){
 if(locked)return;
 locked=true;
 sessionStorage.setItem(key(),'1');
 document.querySelectorAll('details').forEach(d=>{d.open=false;d.style.display='none'});
 document.querySelectorAll('.modebtn[data-mode]').forEach(b=>setDisabled(b,b.dataset.mode!=='test'));
 const testBtn=document.querySelector('.modebtn[data-mode="test"]');
 if(testBtn){testBtn.textContent='Test in Progress';setDisabled(testBtn,true)}
 setDisabled(document.getElementById('reshuffle'),true);
 document.querySelectorAll('.listen-btn,.speak').forEach(b=>setDisabled(b,true));
 const wrong=document.querySelector('.wrongbox');if(wrong)wrong.style.display='none';
 const game=document.querySelector('.game');if(game)game.style.display='none';
 if(typeof setMode==='function')setMode('test');
 let notice=document.getElementById('testLockNotice');
 if(!notice){notice=document.createElement('div');notice.id='testLockNotice';notice.style.cssText='margin:12px 0;padding:12px 16px;border-radius:14px;background:#fff3cd;border:2px solid #e0a800;font-weight:800;color:#5b3a00';const bar=document.querySelector('.modebar');if(bar)bar.insertAdjacentElement('afterend',notice)}
 notice.textContent=restored?'TEST IN PROGRESS — Test lock restored after reload. Notes, listening, revision and games remain locked.':'TEST IN PROGRESS — Notes, listening, revision and games are locked for this test.';
}
function init(){
 const btn=document.querySelector('.modebtn[data-mode="test"]');if(!btn)return;
 btn.textContent='Start Test';
 if(sessionStorage.getItem(key())==='1'){lockTest(true);return}
 document.addEventListener('click',e=>{
   const t=e.target.closest('.modebtn[data-mode="test"]');if(!t||locked)return;
   e.preventDefault();e.stopImmediatePropagation();
   if(confirm('Start Test now? Once started, Notes, listening, revision and games will stay locked even if this page is reloaded.'))lockTest(false);
 },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();