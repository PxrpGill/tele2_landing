(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();function S(s,e){const t={data:e,timestamp:new Date().getTime()};localStorage.setItem(s,JSON.stringify(t))}function h(s){const t=JSON.parse(localStorage.getItem(s));return t?new Date().getTime()-t.timestamp>864e5?(localStorage.removeItem(s),null):t.data:null}const O=document.querySelector(".main"),M=document.querySelector(".header"),c=document.querySelector(".header__geoposition-button");let E=document.querySelector(".main__container");const k=document.querySelector(".main__to-scroll-up-button");function $(s){const e=document.createElement("div");return e.className="main__modal-container",e.style.position="absolute",e.appendChild(s),e}function R(s,e,t){t.close(),E.contains(s)&&E.removeChild(s),O.style.opacity=1,document.body.style.overflow="",document.body.classList.remove("modal-open"),document.body.style.paddingRight=e,k.style.display="block"}function T(){const s=window.getComputedStyle(document.body).paddingRight,e=window.innerWidth-document.documentElement.clientWidth;return window.innerWidth>992&&(document.body.classList.add("modal-open"),document.body.style.paddingRight=`${parseInt(s)+e}px`),s}function H(){let e=document.querySelector(".change-region").content.cloneNode(!0),t=e.querySelector(".change-region__modal-window"),n=e.querySelectorAll(".change-region__item-button");O.style.opacity=0,document.body.style.overflow="hidden";let i=$(e);E.appendChild(i),t.showModal(),k.style.display="none";const o=T();n.forEach(r=>{const l=()=>{S("region",r.textContent),c.textContent=h("region"),R(i,o,t),r.removeEventListener("click",l)};r.addEventListener("click",l)}),document.addEventListener("keydown",function r(l){l.key==="Escape"&&(R(i,o,t),document.removeEventListener("keydown",r))}),c.removeEventListener("click",q)}function b(s,e,t){document.body.style.overflow="",t.close(),M.contains(s)&&M.removeChild(s),document.body.classList.remove("modal-open"),document.body.style.paddingRight=e,k.style.display="block"}function q(){let e=document.querySelector(".choose-region-question").content.cloneNode(!0),t=e.querySelector(".choose-region-question__modal-window"),n=t.querySelector(".choose-region-question__agree-button"),i=t.querySelector(".choose-region-question__change-city-button"),o=$(e);M.appendChild(o);const r=T();t.showModal(),k.style.display="none",document.body.style.overflow="hidden",n.addEventListener("click",function l(){b(o,r,t),n.removeEventListener("click",l),o.remove(),S("region","Санкт-Петербург"),c.textContent=h("region")}),i.addEventListener("click",function l(){b(o,r,t),H(),i.removeEventListener("click",l)}),document.addEventListener("keydown",function l(a){a.key==="Escape"&&(b(o,r,t),document.removeEventListener("keydown",l),S("region","Санкт-Петербург"),c.textContent=h("region"))}),c.removeEventListener("click",q)}h("region")?c.textContent=h("region"):(c.textContent="Санкт-Петербург",q());c.addEventListener("click",H);document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".main__to-scroll-up-button");function e(){document.body.classList.contains("modal-open")?s.style.display="none":window.scrollY>500?s.style.display="block":s.style.display="none"}e(),window.addEventListener("scroll",e),new MutationObserver(()=>{e()}).observe(document.body,{attributes:!0,attributeFilter:["class"]});function n(){window.scrollTo({top:0,behavior:"smooth"})}s.addEventListener("click",n),window.addEventListener("beforeunload",()=>{h("region")||window.scrollTo({top:0,left:0})})});function _(s,e){let t;function n(...i){t||(s.apply(this,i),t=setTimeout(()=>{t=null},e))}return n.cancel=function(){t&&(clearTimeout(t),t=null)},n}function V(s){const e=document.querySelector(".main__container"),t=document.querySelector(".main__to-scroll-up-button"),n=document.createElement("div");n.className="main__modal-container",n.style.position="absolute";const o=document.querySelector(".user-poppup").content.cloneNode(!0),r=o.querySelector(".user-poppup__modal-window"),l=o.querySelector(".user-poppup__close-button"),a=o.querySelector(".user-poppup__user-content  "),u=`<img src="${s.avatar_url}" loading="lazy">`,y=`<h4 class="user-poppup__username">${s.login}</h4>`,d=`
    <p class="user-poppup__information">
        Ссылка на github: <a href="${s.html_url}" class="user-poppup__github-link" target="_blank">
            Перейти
        </a>
    </p>`;a.innerHTML+=y,a.innerHTML+=u,a.innerHTML+=d,n.appendChild(o),e.appendChild(n),r.showModal(),t.style.display="none";const f=T();document.body.style.overflow="hidden";const p=()=>{document.body.style.overflow="",a.innerHTML="",r.close(),e.removeChild(n),l.removeEventListener("click",p),document.removeEventListener("keydown",m),document.body.classList.remove("modal-open"),document.body.style.paddingRight=f,t.style.display="block"},m=v=>{v.key==="Escape"&&p()};document.addEventListener("keydown",m),l.addEventListener("click",p)}class K{constructor(){this.itemsInPage=3,this.totalPages=0,this.isScrolling=!1,this.sliderPlace=document.querySelector(".main__slider-items"),this.sliderMarkersPlace=document.querySelector(".main__slider-markers"),this.prevButton=document.querySelector(".main__slider-control.prev"),this.nextButton=document.querySelector(".main__slider-control.next"),this.dots=`
            <li class="main__slider-marker">
                <span>...</span>
            </li>`,this.firstMarker=`
            <li class="main__slider-marker">
                <a href="#" data-page="1">
                    1
                </a>
            </li>`,this.throttledScroll=_(this.onScroll.bind(this),750),this.throttledWheel=_(this.onWheel.bind(this),750),this.throttledPrevClick=_(this.onPrevClick.bind(this),750),this.throttledNextClick=_(this.onNextClick.bind(this),750),this.addScrollEventListener(),this.addClickEventListeners()}generateLastMarker(){return`
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
            </li>`}generateSliderElement(e,t,n){return`
            <a id="item-${e+t}">
                <img id="image-${e+t}" class="main__slider-image" src="${n.avatar_url}" alt="Картинка пользователя" draggable="false" loading="lazy">
            </a>`}inputInDOM(e){this.sliderPlace.innerHTML="",this.sliderMarkersPlace.innerHTML="";for(let n=0;n<e.length;n+=this.itemsInPage){const i=e.slice(n,n+this.itemsInPage);let o='<li class="main__slider-item">';i.forEach((r,l)=>{o+=this.generateSliderElement(n,l,r)}),o+="</li>",this.sliderPlace.innerHTML+=o}this.sliderPlace.querySelectorAll(".main__slider-image").forEach(n=>{n.addEventListener("click",()=>{const i=+n.id.slice(6,n.id.length),o=e[i];V(o)})}),this.totalPages=Math.ceil(e.length/this.itemsInPage),this.generatePaginationMarkers(1),this.addClickEventListeners(),this.updateMarkersVisibility(0)}addScrollEventListener(){this.sliderPlace.addEventListener("scroll",this.throttledScroll),this.sliderPlace.addEventListener("wheel",this.throttledWheel)}onScroll(){this.isScrolling||(this.isScrolling=!0,setTimeout(()=>{const e=this.getCurrentSlideIndex(this.sliderPlace);this.updateMarkersVisibility(e),this.isScrolling=!1},750))}onWheel(e){if(e.shiftKey){e.preventDefault();const t=this.sliderPlace.clientWidth,n=Math.round(e.deltaY/100)*t;this.sliderPlace.scrollTo({left:this.sliderPlace.scrollLeft+n,behavior:"smooth"});const i=this.getCurrentSlideIndex(this.sliderPlace);this.updateMarkersVisibility(i)}}getCurrentSlideIndex(e){const t=Array.from(e.children),n=e.scrollLeft+e.clientWidth/2;for(let i=0;i<t.length;i++){const o=t[i];if(n>=o.offsetLeft&&n<o.offsetLeft+o.clientWidth)return i}return 0}updateMarkersVisibility(e){document.querySelectorAll(".main__slider-marker").forEach((n,i)=>{i===e?n.classList.add("active"):n.classList.remove("active")}),e===0?this.prevButton.style.display="none":this.prevButton.style.display="block",e===this.totalPages-1?this.nextButton.style.display="none":this.nextButton.style.display="block",this.generatePaginationMarkers(e+1)}generatePaginationMarkers(e){this.sliderMarkersPlace.innerHTML="",e!=1&&(this.sliderMarkersPlace.innerHTML+=this.firstMarker),e>3&&(this.sliderMarkersPlace.innerHTML+=this.dots),e>2&&(this.sliderMarkersPlace.innerHTML+=this.generatePrevMarker(e)),this.sliderMarkersPlace.innerHTML+=this.generateCurrentMarker(e),e<this.totalPages-1&&(this.sliderMarkersPlace.innerHTML+=this.generateNextMarker(e)),e<this.totalPages-2&&(this.sliderMarkersPlace.innerHTML+=this.dots),e!=this.totalPages&&(this.sliderMarkersPlace.innerHTML+=this.generateLastMarker()),this.addClickEventListeners()}addClickEventListeners(){document.querySelectorAll(".main__slider-marker a").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const i=parseInt(n.target.closest("a").getAttribute("data-page"));this.scrollToPage(i)})}),this.prevButton.addEventListener("click",this.throttledPrevClick),this.nextButton.addEventListener("click",this.throttledNextClick)}onPrevClick(){const e=this.getCurrentSlideIndex(this.sliderPlace);e>0&&this.scrollToPage(e)}onNextClick(){const e=this.getCurrentSlideIndex(this.sliderPlace);e<this.totalPages-1&&this.scrollToPage(e+2)}scrollToPage(e){const t=this.sliderPlace.clientWidth,n=(e-1)*t;this.sliderPlace.scrollTo({left:n,behavior:"smooth"})}destroy(){this.sliderPlace.removeEventListener("scroll",this.throttledScroll),this.sliderPlace.removeEventListener("wheel",this.throttledWheel),this.prevButton.removeEventListener("click",this.throttledPrevClick),this.nextButton.removeEventListener("click",this.throttledNextClick)}}const Q="https://api.github.com/users?per_page=99",z=async()=>{try{const s=await fetch(Q);if(s.ok){const e=await s.json();new K().inputInDOM(e)}else console.error("Ошибка HTTP: "+s.status)}catch(s){console.error("Произошла ошибка:",s)}};z();const N=document.querySelector(".main__processing-personal-data-input-tel");function x(s){return s.value.replace(/\D/g,"")}function w(s){let e=s.target,t=x(e),n="",i=e.selectionStart;if(!t)return e.value="";if(e.value.length!=i){s.data&&/\D/g.test(s.data)&&(e.value=t);return}["7","8","9"].indexOf(t[0])>-1?(t[0]=="9"&&(t="7"+t),n=(t[0]=="8"?"8":"+7")+" ",t.length>1&&(n+="("+t.substring(1,4)),t.length>=5&&(n+=") "+t.substring(4,7)),t.length>=8&&(n+="-"+t.substring(7,9)),t.length>=10&&(n+="-"+t.substring(9,11))):(n="+"+t[0]+" ",t.length>1&&(n+="("+t.substring(1,4)),t.length>=5&&(n+=") "+t.substring(4,7)),t.length>=8&&(n+="-"+t.substring(7,9)),t.length>=10&&(n+="-"+t.substring(9,11))),e.value=n}function P(s){let e=s.target;s.keyCode==8&&x(e).length==1&&(e.value="")}function C(s){let e=s.clipboardData||window.clipboardData,t=s.target,n=x(t);if(e){let i=e.getData("Text");/\D/g.test(i)&&(t.value=n)}}N.addEventListener("input",w);N.addEventListener("keydown",P);N.addEventListener("paste",C);class A{constructor(){this.timeLiveMessage=5e3,this.successTemplate=document.querySelector(".main__success-message-template"),this.failedTemplate=document.querySelector(".main__failed-message-template"),this.failedMessagePhoneRetry="На этот номер уже выслан промокод",this.timers=[]}deleteMessageFromDOM(e){const t=setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},this.timeLiveMessage);this.timers.push(t)}clearMessages(e){for(;e.firstChild;)e.removeChild(e.firstChild)}outputFailedMessage(e,t){this.cleanupMessages();const n=this.failedTemplate.content.cloneNode(!0),i=document.createElement("div");i.className="main__message-container",i.appendChild(n),t.appendChild(i),this.deleteMessageFromDOM(i);const o=this.failedTemplate.content.cloneNode(!0),r=document.createElement("div");r.className="main__message-container",r.appendChild(o),r.querySelector(".main__info-message-text-message").textContent=this.failedMessagePhoneRetry,e.appendChild(r),this.deleteMessageFromDOM(r)}outputSuccessMessage(e,t){this.cleanupMessages();const n=this.successTemplate.content.cloneNode(!0),i=document.createElement("div");i.className="main__message-container",i.appendChild(n),t.appendChild(i),this.deleteMessageFromDOM(i);const o=this.successTemplate.content.cloneNode(!0),r=document.createElement("div");r.className="main__message-container",r.appendChild(o),e.appendChild(r),this.deleteMessageFromDOM(r)}setNumberInLocalStorage(e){const t=new Date;localStorage.setItem(String(t),e)}phoneInLocalStorage(e){let t=!1;for(let n in localStorage)if(localStorage.hasOwnProperty(n)&&n!="region"){const i=localStorage.getItem(n);e==i&&(t=!0)}return t}validatePhoneNumber(e){return/(\+7|[0-689])\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/.test(e)}dataProcessing(e,t,n,i,o,r){e.preventDefault();const l=r.value;if(!t.checked||l==""){o.style.background="gray";const a=setTimeout(()=>{o.style.background="white"},this.timeLiveMessage);this.timers.push(a)}else this.validatePhoneNumber(l)?this.phoneInLocalStorage(l)?this.outputFailedMessage(n,i):(this.setNumberInLocalStorage(l),this.outputSuccessMessage(n,i)):this.outputFailedMessage(n,i)}clearTimers(){this.timers.forEach(e=>clearTimeout(e)),this.timers=[]}cleanupMessages(){document.querySelectorAll(".main__message-container").forEach(t=>{t.parentNode&&t.parentNode.removeChild(t)}),this.clearTimers()}}const D=document.querySelector(".main__processing-personal-data-input-tel"),J=document.querySelector(".main__info-message-computers"),Y=document.querySelector(".main__info-message-phone"),I=document.querySelector(".main__processing-personal-data-agree"),g=document.querySelector(".main__processing-personal-data-submit"),j=new A;function G(s){s.preventDefault(),j.dataProcessing(s,I,Y,J,g,D)}function F(){D.value.trim()==""||!I.checked?g.style.pointerEvents="none":g.style.pointerEvents=""}D.addEventListener("input",F);I.addEventListener("change",F);g.style.pointerEvents="none";g.addEventListener("click",G);const U=document.querySelector(".main__stocks-content-participate-button");U.addEventListener("click",()=>{let e=document.querySelector(".main__participate").content.cloneNode(!0),t=e.querySelector(".main__participate-modal-window"),n=t.querySelector(".main__processing-personal-data-input-tel"),i=t.querySelector(".main__processing-personal-data-agree"),o=t.querySelector(".main__processing-personal-data-submit"),r=t.querySelector(".main__participate-close-button"),l=t.querySelector(".main__info-message-phone"),a=t.querySelector(".main__info-message-computers"),u=document.createElement("div");u.className="main__modal-container";const y=document.querySelector(".main__container");u.appendChild(e),y.appendChild(u),t.showModal(),document.body.style.overflow="hidden";const d=document.body,f=parseInt(window.getComputedStyle(d).paddingRight,10)||0,p=window.innerWidth-document.documentElement.clientWidth;d.classList.add("modal-open"),d.style.paddingRight=`${f+p}px`;const m=()=>{t.close(),y.removeChild(u),document.body.style.overflow="",d.classList.remove("modal-open"),d.style.paddingRight=`${f}px`,r.removeEventListener("click",m),document.removeEventListener("keydown",v),n.removeEventListener("input",w),n.removeEventListener("keydown",P),n.removeEventListener("paste",C),o.removeEventListener("click",B)},v=L=>{L.key==="Escape"&&m()},B=L=>{new A().dataProcessing(L,i,l,a,o,n)},W=()=>{n.value.trim()==""||!i.checked?o.style.pointerEvents="none":o.style.pointerEvents=""};n.addEventListener("input",W),i.addEventListener("change",W),o.style.pointerEvents="none",r.addEventListener("click",m),document.addEventListener("keydown",v),n.addEventListener("input",w),n.addEventListener("keydown",P),n.addEventListener("paste",C),o.addEventListener("click",B)});
