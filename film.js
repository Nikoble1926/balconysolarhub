/* BalconySolarHub — film engine v2 (JS-driven; independent of OS animation settings) */
(function(){
"use strict";

/* ── hero install film (homepage) ───────────────────────────── */
var timers=[],raf=null,DUR=26000;
var CAPS=[
 [0,    'Your balcony, <b>as it is today</b>.'],
 [4700, '<b>Step 1</b> — hang the panel. Two hooks, no drill.'],
 [9200, '<b>Step 2</b> — click into the microinverter. It only fits the right way.'],
 [13200,'<b>Step 3</b> — connect the power <i>(CPS electrician today — plug-in soon)</i>.'],
 [17200,'It\'s live — <b>your flat uses solar first</b>. Watch the meter.'],
 [21200,'<b>Step 4</b> — the free 10-min G98 form. <b>Done in about an hour.</b>']
];
var PHASES=[[300,'.p1'],[2000,'.p2'],[5500,'.p3'],[9500,'.p4'],[13000,'.p5'],[17500,'.p6'],[21000,'.p7'],
            [16500,'.flow'],[18500,'.needle'],[11000,'.fd1'],[19500,'.fd2'],[22500,'.fd3'],[24000,'.fd4']];
function on(sel){document.querySelectorAll('#filmstage '+sel).forEach(function(el){el.classList.add('on')});}
function setCap(html){var c=document.getElementById('cap');if(!c)return;c.style.opacity=0;
  setTimeout(function(){c.innerHTML=html;c.style.opacity=1},350);}
function stopFilm(){timers.forEach(clearTimeout);timers=[];if(raf)cancelAnimationFrame(raf);
  document.querySelectorAll('#filmstage .on').forEach(function(el){el.classList.remove('on')});
  var bar=document.getElementById('pbar');if(bar)bar.style.width='0%';}
function playFilm(){
  if(!document.getElementById('filmstage'))return;
  stopFilm();
  PHASES.forEach(function(p){timers.push(setTimeout(function(){on(p[1])},p[0]))});
  CAPS.forEach(function(c){timers.push(setTimeout(function(){setCap(c[1])},c[0]))});
  var t0=performance.now(),bar=document.getElementById('pbar');
  if(bar){(function tick(now){var pct=Math.min(100,(now-t0)/DUR*100);bar.style.width=pct+'%';
    if(pct<100){raf=requestAnimationFrame(tick)}})(t0);}
}
window.replayFilm=playFilm;

/* ── product mini-films: draw in when scrolled into view ────── */
function initMini(){
  var els=document.querySelectorAll('.mini-film');
  if(!els.length)return;
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('seen')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('seen');io.unobserve(en.target)}});
  },{threshold:.35});
  els.forEach(function(e){io.observe(e)});
}

/* ── countdown to DESNZ response (~22 Jul 2026) ─────────────── */
function initCountdown(){
  var el=document.getElementById('days');if(!el)return;
  var d=Math.ceil((new Date('2026-07-22T00:00:00+01:00')-new Date())/86400000);
  if(d>0){el.textContent=d;}
  else{el.textContent='—';var s=document.getElementById('days-label');
    if(s)s.textContent='the DESNZ response summary was expected around 22 July 2026 — see the news page for the latest';}
}

/* ── mini savings calculator (homepage teaser) ──────────────── */
var sunTxt={1:'Shaded / north',2:'Decent (south-ish)',3:'Full sun all day'},sunMul={1:.65,2:1,3:1.2};
window.miniCalc=function(){
  var wEl=document.getElementById('watts'),sEl=document.getElementById('sun');if(!wEl||!sEl)return;
  var w=+wEl.value,s=+sEl.value;
  document.getElementById('wout').textContent=w+'W';
  document.getElementById('sout').textContent=sunTxt[s];
  var kwh=w*0.9*sunMul[s],save=Math.round(kwh*0.27);
  document.getElementById('save').textContent='£'+save;
  var t=document.getElementById('save10');
  if(t)t.textContent='≈ £'+(Math.round(save*10/100)*100).toLocaleString('en-GB')+'+ over 10 years';
  /* impact strip: UK grid ~0.19 kg CO2/kWh · tree ~25 kg/yr · cup of tea ~0.045 kWh · phone charge ~0.012 kWh */
  var set=function(id,val){var e=document.getElementById(id);if(e)e.textContent=val};
  set('co2',Math.round(kwh*0.19));
  set('trees',Math.max(1,Math.round(kwh*0.19/25)));
  set('tea','~'+(Math.round(kwh/0.045/500)*500).toLocaleString('en-GB'));
  set('phone','~'+(Math.round(kwh/0.012/1000)*1000).toLocaleString('en-GB'));
};

window.addEventListener('load',function(){
  initCountdown();initMini();
  if(document.getElementById('watts'))window.miniCalc();
  setTimeout(playFilm,300);
});
})();
