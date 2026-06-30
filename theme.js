(function(){
  function set(t){document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem('theme',t)}catch(e){}}
  function cur(){return document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light'}
  function inject(){
    var nav=document.querySelector('nav.main');
    if(!nav||document.getElementById('themeToggle'))return;
    var b=document.createElement('button');
    b.id='themeToggle';b.type='button';b.setAttribute('aria-label','Toggle dark mode');
    b.style.cssText='margin-left:16px;background:none;border:0;cursor:pointer;font-size:18px;line-height:1;padding:2px 4px;color:inherit';
    function icon(){b.textContent=cur()==='dark'?'☀️':'🌙'}
    icon();
    b.addEventListener('click',function(){set(cur()==='dark'?'light':'dark');icon()});
    nav.appendChild(b);
  }
  if(document.readyState!=='loading')inject();else document.addEventListener('DOMContentLoaded',inject);
})();
