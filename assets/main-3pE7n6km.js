(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();const m=document.querySelector(".header__geoposition"),_=document.querySelector(".header__geoposition-button"),h=document.querySelector(".main__container"),v=document.querySelector(".choose-region-question"),y=v.content.cloneNode(!0),g=y.querySelector(".choose-region-question__modal-window"),w=g.querySelector(".choose-region-question__agree-button"),b=g.querySelector(".choose-region-question__change-city-button");setTimeout(()=>{const e=document.createElement("div");e.className="header__modal-container",e.appendChild(y),m.appendChild(e),m.style.border="none",document.body.style.overflow="hidden",g.showModal()},100);w.addEventListener("click",()=>{document.body.style.overflow="",g.close();const e=m.querySelector(".header__modal-container");m.removeChild(e)});const q=document.querySelector(".change-region"),f=q.content.cloneNode(!0),S=f.querySelector(".change-region__modal-window"),N=f.querySelectorAll(".change-region__item-button");b.addEventListener("click",()=>{const e=m.querySelector(".header__modal-container");g.close(),m.removeChild(e);const n=document.createElement("div");n.className="main__modal-container",n.appendChild(f),h.appendChild(n),S.showModal()});_.addEventListener("click",()=>{const n=document.querySelector(".change-region").content.cloneNode(!0),s=n.querySelector(".change-region__modal-window");n.querySelectorAll(".change-region__item-button");const i=document.createElement("div");i.className="main__modal-container",i.appendChild(n),h.appendChild(i),s.showModal()});N.forEach(e=>{e.addEventListener("click",()=>{_.textContent=e.textContent,document.body.style.overflow="";const n=h.querySelector(".main__modal-container");S.close(),h.removeChild(n)})});window.onload=function(){window.scrollTo(0,0)};document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".main__processing-personal-data-input-tel"),n=document.querySelector(".main__processing-personal-data-submit"),s=document.querySelector(".main__how-to-get-tariff-personal-data"),i=3e3;function r(c){setTimeout(()=>{s.removeChild(c)},i)}function t(){const l=document.querySelector(".main__failed-message-template").content.cloneNode(!0),u=document.createElement("main__message-container");u.appendChild(l),s.appendChild(u),r(u)}function a(){const l=document.querySelector(".main__success-message-template").content.cloneNode(!0),u=document.createElement("main__message-container");u.appendChild(l),s.appendChild(u),r(u)}function o(c){const l=new Date;localStorage.setItem(String(l),JSON.stringify(c))}function d(c){let l=!1;for(let u in localStorage)if(localStorage.hasOwnProperty){const C=JSON.parse(localStorage.getItem(u));c==C&&(l=!0)}return l}function p(c){return/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/.test(c)}n.addEventListener("click",c=>{c.preventDefault();const l=e.value;d(l)?t():p(l)?(o(l),a()):t()})});document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".main__processing-personal-data-input-tel");let n=function(t){return t.value.replace(/\D/g,"")},s=function(t){let a=t.target,o=n(a),d="",p=a.selectionStart;if(!o)return a.value="";if(a.value.length!=p){t.data&&/\D/g.test(t.data)&&(a.value=o);return}["7","8","9"].indexOf(o[0])>-1?(o[0]=="9"&&(o="7"+o),d=(o[0]=="8"?"8":"+7")+" ",o.length>1&&(d+="("+o.substring(1,4)),o.length>=5&&(d+=") "+o.substring(4,7)),o.length>=8&&(d+="-"+o.substring(7,9)),o.length>=10&&(d+="-"+o.substring(9,11))):d="+"+o.substring(0,16),a.value=d},i=function(t){let a=t.target;t.keyCode==8&&n(a).length==1&&(a.value="")},r=function(t){let a=t.clipboardData||window.clipboardData,o=t.target,d=n(o);if(a){let p=a.getData("Text");/\D/g.test(p)&&(o.value=d)}};e.addEventListener("input",s),e.addEventListener("keydown",i),e.addEventListener("paste",r)});const L="https://api.github.com/users",E=e=>{const n=document.querySelector(".main__slider");for(let s in e){const i=`
    <article class="main__slider-element">
      <h3 class="main__slider-title--visually-hidden">Элемент слайдера</h3>
      <img class="main__slider-image" src="${e[s].avatar_url}" alt="Картинка пользователя">
    </article>
    `;n.innerHTML+=i}},D=async()=>{try{const e=await fetch(L,{});if(e.ok){const n=await e.json();console.log(n),E(n)}else console.error("Ошибка HTTP: "+e.status)}catch(e){console.error("Произошла ошибка:",e)}};D();
