(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".header"),e=document.querySelector(".main"),t=document.querySelector(".header__geoposition"),s=document.querySelector(".header__geoposition-button"),i=document.querySelector(".main__container"),a=document.querySelector(".choose-region-question").content.cloneNode(!0),l=a.querySelector(".choose-region-question__modal-window"),y=l.querySelector(".choose-region-question__agree-button"),_=l.querySelector(".choose-region-question__change-city-button"),m=()=>{e.style.opacity=0;const c=document.querySelector(".change-region").content.cloneNode(!0),h=c.querySelector(".change-region__modal-window"),g=c.querySelectorAll(".change-region__item-button"),r=document.createElement("div");r.className="main__modal-container",r.appendChild(c),i.appendChild(r),h.showModal();const u=document.body,S=window.getComputedStyle(u).paddingRight,C=window.innerWidth-document.documentElement.clientWidth;u.classList.add("modal-open"),u.style.paddingRight=`${parseInt(S)+C}px`;const L=()=>{h.close(),i.removeChild(r),e.style.opacity=1,n.style.position="",u.classList.remove("modal-open"),u.style.paddingRight=S};g.forEach(f=>{f.addEventListener("click",()=>{localStorage.setItem("region",f.textContent),s.textContent=localStorage.getItem("region"),L()})}),document.addEventListener("keydown",f=>{f.key==="Escape"&&L()})},p=()=>{const d=document.createElement("div");d.className="main__dialog-container",d.appendChild(a),t.appendChild(d);const c=document.body,h=window.getComputedStyle(c).paddingRight,g=window.innerWidth-document.documentElement.clientWidth;setTimeout(()=>{document.body.style.overflow="hidden",c.style.paddingRight=`${parseInt(h)+g}px`,l.showModal()},100);const r=()=>{document.body.style.overflow="",l.close(),t.removeChild(d),c.classList.remove("modal-open"),c.style.paddingRight=h};y.addEventListener("click",r),_.addEventListener("click",()=>{r(),m()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&r()})};localStorage.getItem("region")?s.textContent=localStorage.getItem("region"):p(),s.addEventListener("click",m)});document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".main__to-scroll-up-button");window.addEventListener("scroll",()=>{window.scrollY>300?n.style.display="block":n.style.display="none"}),n.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),window.onload=function(){window.scrollTo(0,0)}});class P{constructor(){this.timeLiveMessage=5e3,this.successTemplate=document.querySelector(".main__success-message-template"),this.failedTemplate=document.querySelector(".main__failed-message-template"),this.failedMessagePhoneRetry="На этот номер уже выслан промокод"}deleteMessageFromDOM(e){setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},this.timeLiveMessage)}clearMessages(e){for(;e.firstChild;)e.removeChild(e.firstChild)}outputFailedMessage(e,t){this.clearMessages(t);const s=this.failedTemplate.content.cloneNode(!0),i=document.createElement("div");i.className="main__message-container",i.appendChild(s),t.appendChild(i),this.deleteMessageFromDOM(i),this.clearMessages(e);const o=this.failedTemplate.content.cloneNode(!0),a=document.createElement("div");a.className="main__message-container",a.appendChild(o),a.querySelector(".main__info-message-text-message").textContent=this.failedMessagePhoneRetry,e.appendChild(a),this.deleteMessageFromDOM(a)}outputSuccessMessage(e,t){this.clearMessages(t);const s=this.successTemplate.content.cloneNode(!0),i=document.createElement("div");i.className="main__message-container",i.appendChild(s),t.appendChild(i),this.deleteMessageFromDOM(i),this.clearMessages(e);const o=this.successTemplate.content.cloneNode(!0),a=document.createElement("div");a.className="main__message-container",a.appendChild(o),e.appendChild(a),this.deleteMessageFromDOM(a)}setNumberInLocalStorage(e){const t=new Date;localStorage.setItem(String(t),e)}phoneInLocalStorage(e){let t=!1;for(let s in localStorage)if(localStorage.hasOwnProperty(s)&&s!="region"){const i=localStorage.getItem(s);e==i&&(t=!0)}return t}validatePhoneNumber(e){return/(\+7|[0-689])\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/.test(e)}dataProcessing(e,t,s,i,o,a){e.preventDefault();const l=a.value;!t.checked||l==""?(o.style.background="gray",setTimeout(()=>{o.style.background="white"},this.timeLiveMessage)):this.validatePhoneNumber(l)?this.phoneInLocalStorage(l)?this.outputFailedMessage(s,i):(this.setNumberInLocalStorage(l),this.outputSuccessMessage(s,i)):this.outputFailedMessage(s,i)}}const q=document.querySelector(".main__processing-personal-data-input-tel"),T=document.querySelector(".main__info-message-computers"),N=document.querySelector(".main__info-message-phone"),x=document.querySelector(".main__processing-personal-data-agree"),k=document.querySelector(".main__processing-personal-data-submit");k.addEventListener("click",function(n){new P().dataProcessing(n,x,N,T,k,q)});const M=document.querySelector(".main__processing-personal-data-input-tel");function v(n){return n.value.replace(/\D/g,"")}function b(n){let e=n.target,t=v(e),s="",i=e.selectionStart;if(!t)return e.value="";if(e.value.length!=i){n.data&&/\D/g.test(n.data)&&(e.value=t);return}["7","8","9"].indexOf(t[0])>-1?(t[0]=="9"&&(t="7"+t),s=(t[0]=="8"?"8":"+7")+" ",t.length>1&&(s+="("+t.substring(1,4)),t.length>=5&&(s+=") "+t.substring(4,7)),t.length>=8&&(s+="-"+t.substring(7,9)),t.length>=10&&(s+="-"+t.substring(9,11))):(s="+"+t[0]+" ",t.length>1&&(s+="("+t.substring(1,4)),t.length>=5&&(s+=") "+t.substring(4,7)),t.length>=8&&(s+="-"+t.substring(7,9)),t.length>=10&&(s+="-"+t.substring(9,11))),e.value=s}function w(n){let e=n.target;n.keyCode==8&&v(e).length==1&&(e.value="")}function E(n){let e=n.clipboardData||window.clipboardData,t=n.target,s=v(t);if(e){let i=e.getData("Text");/\D/g.test(i)&&(t.value=s)}}M.addEventListener("input",b);M.addEventListener("keydown",w);M.addEventListener("paste",E);class I{constructor(){this.itemsInPage=3,this.totalPages=0,this.isScrolling=!1,this.sliderPlace=document.querySelector(".main__slider-items"),this.sliderMarkersPlace=document.querySelector(".main__slider-markers"),this.prevButton=document.querySelector(".main__slider-control.prev"),this.nextButton=document.querySelector(".main__slider-control.next"),this.dots=`
            <li class="main__slider-marker">
                <span>...</span>
            </li>`,this.firstMarker=`
            <li class="main__slider-marker">
                <a href="#" data-page="1">
                    1
                </a>
            </li>`,this.addScrollEventListener()}generateLastMarker(){return`
            <li class="main__slider-marker">
                <a href="#" data-page="${this.totalPages}">
                    ${this.totalPages}
                </a>
            </li>`}generateNextMarker(e){return`
            <li class="main__slider-marker">
                <a href="#" data-page="${e+1}">
                    ${e+1}
                </a>
            </li>`}generateCurrentMarker(e){return`
            <li class="main__slider-marker active">
                <a href="#" data-page="${e}">
                    ${e}
                </a>
            </li>`}generatePrevMarker(e){return`
            <li class="main__slider-marker">
                <a href="#" data-page="${e-1}">
                    ${e-1}
                </a>
            </li>`}generateSliderElement(e,t,s){return`
            <a id="item-${e+t}">
                <img class="main__slider-image" src="${s.avatar_url}" alt="Картинка пользователя" draggable="false">
            </a>`}inputInDOM(e){this.sliderPlace.innerHTML="",this.sliderMarkersPlace.innerHTML="";for(let t=0;t<e.length;t+=this.itemsInPage){const s=e.slice(t,t+this.itemsInPage);let i='<li class="main__slider-item">';s.forEach((o,a)=>{i+=this.generateSliderElement(t,a,o)}),i+="</li>",this.sliderPlace.innerHTML+=i}this.totalPages=Math.ceil(e.length/this.itemsInPage),this.generatePaginationMarkers(1),this.addClickEventListeners(),this.updateMarkersVisibility(0)}addScrollEventListener(){this.sliderPlace.addEventListener("scroll",()=>{this.isScrolling||(this.isScrolling=!0,setTimeout(()=>{const e=this.getCurrentSlideIndex(this.sliderPlace);this.updateMarkersVisibility(e),this.isScrolling=!1},100))}),this.sliderPlace.addEventListener("wheel",e=>{if(e.shiftKey){e.preventDefault();const t=this.sliderPlace.clientWidth,s=Math.round(e.deltaY/100)*t;this.sliderPlace.scrollTo({left:this.sliderPlace.scrollLeft+s,behavior:"smooth"});const i=this.getCurrentSlideIndex(this.sliderPlace);this.updateMarkersVisibility(i)}})}getCurrentSlideIndex(e){const t=Array.from(e.children),s=e.scrollLeft+e.clientWidth/2;for(let i=0;i<t.length;i++){const o=t[i];if(s>=o.offsetLeft&&s<o.offsetLeft+o.clientWidth)return i}return 0}updateMarkersVisibility(e){document.querySelectorAll(".main__slider-marker").forEach((s,i)=>{i===e?s.classList.add("active"):s.classList.remove("active")}),e===0?this.prevButton.style.display="none":this.prevButton.style.display="block",e===this.totalPages-1?this.nextButton.style.display="none":this.nextButton.style.display="block",this.generatePaginationMarkers(e+1)}generatePaginationMarkers(e){this.sliderMarkersPlace.innerHTML="",e!=1&&(this.sliderMarkersPlace.innerHTML+=this.firstMarker),e>3&&(this.sliderMarkersPlace.innerHTML+=this.dots),e>2&&(this.sliderMarkersPlace.innerHTML+=this.generatePrevMarker(e)),this.sliderMarkersPlace.innerHTML+=this.generateCurrentMarker(e),e<this.totalPages-1&&(this.sliderMarkersPlace.innerHTML+=this.generateNextMarker(e)),e<this.totalPages-2&&(this.sliderMarkersPlace.innerHTML+=this.dots),e!=this.totalPages&&(this.sliderMarkersPlace.innerHTML+=this.generateLastMarker()),this.addClickEventListeners()}addClickEventListeners(){document.querySelectorAll(".main__slider-marker a").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault();const i=parseInt(s.target.closest("a").getAttribute("data-page"));this.scrollToPage(i)})}),this.prevButton.addEventListener("click",()=>{const t=this.getCurrentSlideIndex(this.sliderPlace);t>0&&this.scrollToPage(t)}),this.nextButton.addEventListener("click",()=>{const t=this.getCurrentSlideIndex(this.sliderPlace);t<this.totalPages-1&&this.scrollToPage(t+2)})}scrollToPage(e){const t=this.sliderPlace.clientWidth,s=(e-1)*t;this.sliderPlace.scrollTo({left:s,behavior:"smooth"})}}const D="https://api.github.com/users?per_page=99",B=async()=>{try{const n=await fetch(D);if(n.ok){const e=await n.json();new I().inputInDOM(e)}else console.error("Ошибка HTTP: "+n.status)}catch(n){console.error("Произошла ошибка:",n)}};B();document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".main__stocks-content-participate-button").addEventListener("click",()=>{const t=document.querySelector(".main__participate").content.cloneNode(!0),s=t.querySelector(".main__participate-modal-window"),i=s.querySelector(".main__processing-personal-data-input-tel"),o=s.querySelector(".main__processing-personal-data-agree"),a=s.querySelector(".main__processing-personal-data-submit"),l=s.querySelector(".main__participate-close-button"),y=s.querySelector(".main__info-message-phone"),_=s.querySelector(".main__info-message-computers"),m=document.createElement("div");m.className="main__modal-container";const p=document.querySelector(".main__container");m.appendChild(t),p.appendChild(m),s.showModal(),document.body.style.overflow="hidden";const d=document.body,c=parseInt(window.getComputedStyle(d).paddingRight,10)||0,h=window.innerWidth-document.documentElement.clientWidth;d.classList.add("modal-open"),d.style.paddingRight=`${c+h}px`;const g=()=>{s.close(),p.removeChild(m),document.body.style.overflow="",d.classList.remove("modal-open"),d.style.paddingRight=`${c}px`};l.addEventListener("click",g),document.addEventListener("keydown",r=>{r.key==="Escape"&&g()}),i.addEventListener("input",b),i.addEventListener("keydown",w),i.addEventListener("paste",E),a.addEventListener("click",function(r){new P().dataProcessing(r,o,y,_,a,i)})})});
