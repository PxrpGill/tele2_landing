(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&m(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function m(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const l=document.querySelector(".header__geoposition"),S=document.querySelector(".header__geoposition-button"),q=document.querySelector(".main__container");let g={region:"Санкт Петербург"};const w=document.querySelector(".choose-region-question"),d=w.content.cloneNode(!0),u=d.querySelector(".choose-region-question__modal-window"),v=u.querySelector(".choose-region-question__agree-button"),N=u.querySelector(".choose-region-question__change-city-button");setTimeout(()=>{g.regionQuestion||(l.appendChild(d),l.style.border="none",document.body.style.overflow="hidden",g.regionQuestion=!g.regionQuestion,u.showModal())},100);v.addEventListener("click",()=>{document.body.style.overflow="",u.close(),l.removeChild(d)});const b=document.querySelector(".change-region"),p=b.content.cloneNode(!0),C=p.querySelector(".change-region__modal-window"),L=p.querySelectorAll(".change-region__item-button");N.addEventListener("click",()=>{document.body.style.overflow="",u.close(),l.contains(d)&&l.removeChild(d)});L.forEach(c=>{c.addEventListener("click",()=>{S.textContent=c.textContent,document.body.style.overflow="",C.close(),q.removeChild(p)})});window.onload=function(){window.scrollTo(0,0)};document.addEventListener("DOMContentLoaded",()=>{const c=document.querySelector(".main__processing-personal-data-input-tel"),s=document.querySelector(".main__processing-personal-data-submit"),i=document.querySelector(".main__how-to-get-tariff-personal-data"),m=3e3;function e(n){setTimeout(()=>{i.removeChild(n)},m)}function t(){const o=document.querySelector(".main__failed-message-template").content.cloneNode(!0),r=document.createElement("main__message-container");r.appendChild(o),i.appendChild(r),e(r)}function a(){const o=document.querySelector(".main__success-message-template").content.cloneNode(!0),r=document.createElement("main__message-container");r.appendChild(o),i.appendChild(r),e(r)}function f(n){const o=new Date;localStorage.setItem(String(o),JSON.stringify(n))}function h(n){let o=!1;for(let r in localStorage)if(localStorage.hasOwnProperty){const _=JSON.parse(localStorage.getItem(r));n==_&&(o=!0)}return o}function y(n){return/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/.test(n)}s.addEventListener("click",n=>{n.preventDefault();const o=c.value;h(o)?t():y(o)?(f(o),a()):t()})});