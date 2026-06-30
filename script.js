const menuBtn=document.getElementById('menuBtn');
const mainNav=document.getElementById('mainNav');
if(menuBtn&&mainNav){menuBtn.addEventListener('click',()=>mainNav.classList.toggle('active'));}
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>mainNav?.classList.remove('active')));

function getRiyadhDate(){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Riyadh',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
  const data={};
  parts.forEach(part=>{data[part.type]=part.value;});
  return {weekday:data.weekday,hour:Number(data.hour),minute:Number(data.minute)};
}
function isOpenNow(){
  const t=getRiyadhDate();
  const minutes=t.hour*60+t.minute;
  if(['Sun','Mon','Tue','Wed','Thu'].includes(t.weekday)){return minutes>=480 && minutes<1380;}
  if(t.weekday==='Fri'){return minutes>=840 && minutes<1380;}
  return false;
}
function updateWorkStatus(){
  const pill=document.getElementById('statusPill');
  const text=document.getElementById('statusText');
  if(!pill||!text)return;
  const open=isOpenNow();
  pill.classList.toggle('open',open);
  pill.classList.toggle('closed',!open);
  text.textContent=open?'مفتوح الآن لاستقبال الطلبات':'مغلق الآن - يمكن ترك رسالة واتساب';
}
updateWorkStatus();
setInterval(updateWorkStatus,60000);

const revealItems=document.querySelectorAll('.section-reveal,.service-card,.trust-grid div,.areas-grid span,details,.contact-card,.map-card');
revealItems.forEach(el=>el.classList.add('section-reveal'));
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  revealItems.forEach(el=>observer.observe(el));
}else{
  revealItems.forEach(el=>el.classList.add('is-visible'));
}
