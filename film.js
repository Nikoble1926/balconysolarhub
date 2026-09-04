/* BalconySolarHub — film engine v2 (JS-driven; independent of OS animation settings) */
(function(){
"use strict";

/* ── hero install film (homepage) ───────────────────────────── */
var timers=[],raf=null,DUR=12000;
var CAPS=[
 [0,    'Your balcony, <b>as it is today</b>.'],
 [2200, '<b>Step 1</b> — hang the panel. Two hooks, no drill.'],
 [4300, '<b>Step 2</b> — click into the microinverter. It only fits the right way.'],
 [6100, '<b>Step 3</b> — connect the power <i>(CPS electrician today — plug-in soon)</i>.'],
 [8000, 'It\'s live — <b>your flat uses solar first</b>. Watch the meter.'],
 [9800, '<b>Step 4</b> — the online 10-min G98 form. <b>Done in about an hour.</b>']
];
var PHASES=[[150,'.p1'],[1000,'.p2'],[2600,'.p3'],[4400,'.p4'],[6100,'.p5'],[8100,'.p6'],[9700,'.p7'],
            [7600,'.flow'],[8500,'.needle'],[5100,'.fd1'],[9000,'.fd2'],[10400,'.fd3'],[11100,'.fd4']];
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
  var d=Math.ceil((new Date('2026-08-27T00:00:00+01:00')-new Date())/86400000);
  if(d>0){el.textContent=d;}
  else{el.textContent='—';var s=document.getElementById('days-label');
    if(s)s.textContent='the plug-in solar rules are now in force — see the news page for what the law requires';}
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

/* ── product line-art library: <div class="mini-film" data-art="..."></div> ── */
var ART={
'panel-kit':'<path class="s accent draw" d="M14 26 l40 4 v30 l-40 -4 z M62 32 l40 4 v30 l-40 -4 z"/><path class="s accent thin draw" d="M14 41 l40 4 M62 47 l40 4"/><rect class="s tealst draw" x="122" y="40" width="46" height="26" rx="5"/><path class="s thin draw" d="M132 53 h14"/><path class="flow" d="M104 52 h16"/><path class="flow" d="M168 53 h20"/>',
'microinverter':'<rect class="s tealst draw" x="56" y="38" width="70" height="32" rx="6"/><path class="s thin draw" d="M68 54 h20"/><path class="s draw" d="M30 44 h16 M30 62 h16"/><circle class="s draw" cx="48" cy="44" r="3"/><circle class="s draw" cx="48" cy="62" r="3"/><path class="flow" d="M126 54 h44"/>',
'microinverter-wifi':'<rect class="s tealst draw" x="56" y="38" width="70" height="32" rx="6"/><path class="s thin draw" d="M68 54 h20"/><path class="s draw" d="M30 44 h16 M30 62 h16"/><circle class="s draw" cx="48" cy="44" r="3"/><circle class="s draw" cx="48" cy="62" r="3"/><path class="s accent thin draw" d="M140 40 a14 14 0 0 1 10 10 M146 32 a22 22 0 0 1 16 16"/><path class="flow" d="M126 58 h44"/>',
'battery':'<rect class="s draw" x="66" y="22" width="68" height="62" rx="10"/><path class="s thin draw" d="M66 52 h68"/><rect class="s tealst draw" x="80" y="32" width="40" height="10" rx="2"/><path class="s accent draw" d="M96 74 l8 -10 h-6 l8 -10"/><path class="flow" d="M40 40 q14 14 26 16"/><path class="s accent draw" d="M14 26 l26 4 v24 l-26 -4 z"/><path class="flow" d="M134 56 h40"/>',
'power-station':'<rect class="s draw" x="56" y="34" width="88" height="52" rx="8"/><path class="s draw" d="M72 34 q0 -12 14 -12 h28 q14 0 14 12"/><circle class="s thin draw" cx="74" cy="58" r="6"/><rect class="s thin draw" x="92" y="50" width="22" height="16" rx="2"/><path class="s accent draw" d="M124 66 l7 -9 h-5 l7 -9"/><path class="flow" d="M144 60 h34"/><path class="s thin draw" d="M62 92 h76"/>',
'foldable-panel':'<path class="s accent draw" d="M30 70 l34 -36 l6 4 l-34 36 z M70 38 l34 -14 l4 6 l-34 14 z"/><path class="s accent thin draw" d="M46 52 l6 5 M84 32 l3 5"/><path class="s draw" d="M28 74 l60 8"/><path class="flow" d="M92 70 h60"/><rect class="s tealst draw" x="154" y="58" width="30" height="20" rx="4"/>',
'plug':'<rect class="s draw" x="70" y="30" width="56" height="48" rx="8"/><circle class="s thin draw" cx="90" cy="50" r="3"/><circle class="s thin draw" cx="106" cy="50" r="3"/><path class="s thin draw" d="M92 64 h12"/><path class="s accent draw" d="M98 20 v-8"/><path class="flow" d="M126 56 h44"/><path class="s accent thin draw" d="M50 44 a10 10 0 0 1 8 -8 M44 36 a18 18 0 0 1 12 -12"/>',
'cable':'<circle class="s draw" cx="70" cy="54" r="22"/><circle class="s thin draw" cx="70" cy="54" r="14"/><path class="s draw" d="M92 50 q30 -8 48 4"/><circle class="s tealst draw" cx="146" cy="55" r="5"/><path class="flow" d="M152 55 h30"/>',
'mount':'<path class="s draw" d="M40 80 h120"/><path class="s thin draw" d="M56 80 v-30 M144 80 v-30"/><path class="s draw" d="M50 50 h100"/><path class="s accent draw" d="M64 54 l72 8 v6 l-72 -8 z"/><path class="s accent draw" d="M76 54 q0 -8 8 -7 M116 58 q0 -8 8 -7"/>',
'panel':'<path class="s accent draw" d="M40 24 l110 12 v46 l-110 -12 z"/><path class="s accent thin draw" d="M40 47 l110 12 M76 28 v46 M112 32 v46"/><path class="flow" d="M152 62 h30"/>'
};
function injectArt(){
  document.querySelectorAll('.mini-film[data-art]').forEach(function(el){
    var a=ART[el.getAttribute('data-art')];if(!a||el.querySelector('svg'))return;
    el.innerHTML='<svg class="lineart" viewBox="0 0 200 100" role="img" aria-hidden="true">'+a+'</svg>';
  });
}

/* ── MailerLite skin enforcement: inline styles beat ML's injected CSS ── */
function skinML(){
  document.querySelectorAll('.ml-form-embedSubmit button, .ml-form-horizontalRow button').forEach(function(b){
    b.style.setProperty('background-color','#15803d','important');
    b.style.setProperty('background','#15803d','important');
    b.style.setProperty('color','#ffffff','important');
    b.style.setProperty('border','none','important');
    b.style.setProperty('border-radius','8px','important');
    b.style.setProperty('font-family','inherit','important');
    b.style.setProperty('font-weight','600','important');
    b.style.setProperty('box-shadow','none','important');
  });
  document.querySelectorAll('.ml-form-fieldRow input, .ml-form-horizontalRow input').forEach(function(i){
    i.style.setProperty('background','transparent','important');
    i.style.setProperty('border','none','important');
    i.style.setProperty('border-bottom','1.5px solid #b9c4cc','important');
    i.style.setProperty('border-radius','0','important');
    i.style.setProperty('box-shadow','none','important');
    i.style.setProperty('font-family','inherit','important');
  });
}
function skinMLwatch(){
  skinML();
  var n=0,iv=setInterval(function(){skinML();if(++n>20)clearInterval(iv)},500);
  if('MutationObserver' in window){
    document.querySelectorAll('.ml-embedded').forEach(function(host){
      new MutationObserver(skinML).observe(host,{childList:true,subtree:true});
    });
  }
}

window.addEventListener('load',function(){
  injectArt();
  initCountdown();initMini();
  if(document.getElementById('watts'))window.miniCalc();
  skinMLwatch();
  setTimeout(playFilm,300);
});
})();
