'use strict';
function showLang(requested){
 const lang=requested==='ar'?'ar':'en';
 const hash=location.hash;
 document.documentElement.lang=lang==='ar'?'ar-SA':'en';
 document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 document.querySelectorAll('.lang-panel').forEach(n=>n.hidden=n.dataset.lang!==lang);
 document.querySelectorAll('[data-i18n]').forEach(n=>n.hidden=n.dataset.i18n!==lang);
 document.querySelectorAll('[data-lang-btn]').forEach(n=>{n.classList.toggle('primary',n.dataset.langBtn===lang);n.setAttribute('aria-pressed',String(n.dataset.langBtn===lang));});
 document.querySelectorAll('[data-href-ar]').forEach(n=>n.href=lang==='ar'?n.dataset.hrefAr:n.dataset.hrefEn);
 if(hash){const next='#'+(lang==='en'?'en-':'')+hash.replace(/^#(?:en-)?/,'');if(document.getElementById(next.slice(1)))history.replaceState(null,'',location.pathname+location.search+next);}
 openHash();
}
function openHash(){let n=document.getElementById(location.hash.slice(1));if(!n||n.closest('.lang-panel')?.hidden)return;const target=n;while(n){if(n.tagName==='DETAILS')n.open=true;n=n.parentElement;}target.scrollIntoView({block:'start',behavior:'instant'});}
document.addEventListener('DOMContentLoaded',()=>showLang(new URLSearchParams(location.search).get('lang')==='ar'?'ar':'en'));
document.addEventListener('pointerdown',()=>document.body.dataset.input='pointer');
document.addEventListener('keydown',()=>document.body.dataset.input='keyboard');
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;let n=document.getElementById(a.hash.slice(1));while(n){if(n.tagName==='DETAILS')n.open=true;n=n.parentElement;}});
window.addEventListener('hashchange',openHash);
let printState=[];
window.addEventListener('beforeprint',()=>{printState=[...document.querySelectorAll('.lang-panel:not([hidden]) details')].map(n=>[n,n.open]);printState.forEach(([n])=>n.open=true);});
window.addEventListener('afterprint',()=>{printState.forEach(([n,open])=>n.open=open);printState=[];});
