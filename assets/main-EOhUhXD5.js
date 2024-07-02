(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();function w(s,e){const t={data:e,timestamp:new Date().getTime()};localStorage.setItem(s,JSON.stringify(t))}function g(s){const t=JSON.parse(localStorage.getItem(s));return t?new Date().getTime()-t.timestamp>864e5?(localStorage.removeItem(s),null):t.data:null}const H=document.querySelector(".main"),P=document.querySelector(".header"),u=document.querySelector(".header__geoposition-button");let C=document.querySelector(".main__container");const L=document.querySelector(".main__to-scroll-up-button");function $(s){const e=document.createElement("div");return e.className="main__modal-container",e.style.position="absolute",e.appendChild(s),e}function R(s,e,t){t.close(),C.contains(s)&&C.removeChild(s),H.style.opacity=1,document.body.style.overflow="",document.body.classList.remove("modal-open"),document.body.style.paddingRight=e,L.style.display="block"}function b(){const s=window.getComputedStyle(document.body).paddingRight,e=window.innerWidth-document.documentElement.clientWidth;return window.innerWidth>992&&(document.body.classList.add("modal-open"),document.body.style.paddingRight=`${parseInt(s)+e}px`),s}function A(){let e=document.querySelector(".change-region").content.cloneNode(!0),t=e.querySelector(".change-region__modal-window"),n=e.querySelectorAll(".change-region__item-button");H.style.opacity=0,document.body.style.overflow="hidden";let i=$(e);C.appendChild(i),t.showModal(),L.style.display="none";const o=b();n.forEach(r=>{const l=()=>{w("region",r.textContent),u.textContent=g("region"),R(i,o,t),r.removeEventListener("click",l)};r.addEventListener("click",l)}),document.addEventListener("keydown",function r(l){l.key==="Escape"&&(R(i,o,t),document.removeEventListener("keydown",r))}),u.removeEventListener("click",x)}function S(s,e,t){document.body.style.overflow="",t.close(),P.contains(s)&&P.removeChild(s),document.body.classList.remove("modal-open"),document.body.style.paddingRight=e,L.style.display="block"}function x(){let e=document.querySelector(".choose-region-question").content.cloneNode(!0),t=e.querySelector(".choose-region-question__modal-window"),n=t.querySelector(".choose-region-question__agree-button"),i=t.querySelector(".choose-region-question__change-city-button"),o=$(e);P.appendChild(o);const r=b();t.showModal(),L.style.display="none",document.body.style.overflow="hidden",n.addEventListener("click",function l(){S(o,r,t),n.removeEventListener("click",l),o.remove(),w("region","Санкт-Петербург"),u.textContent=g("region")}),i.addEventListener("click",function l(){S(o,r,t),A(),i.removeEventListener("click",l)}),document.addEventListener("keydown",function l(a){a.key==="Escape"&&(S(o,r,t),document.removeEventListener("keydown",l),w("region","Санкт-Петербург"),u.textContent=g("region"))}),u.removeEventListener("click",x)}g("region")?u.textContent=g("region"):(u.textContent="Санкт-Петербург",x());u.addEventListener("click",A);document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".main__to-scroll-up-button");function e(){document.body.classList.contains("modal-open")?s.style.display="none":window.scrollY>500?s.style.display="block":s.style.display="none"}e(),window.addEventListener("scroll",e),new MutationObserver(()=>{e()}).observe(document.body,{attributes:!0,attributeFilter:["class"]});function n(){window.scrollTo({top:0,behavior:"smooth"})}s.addEventListener("click",n),window.addEventListener("beforeunload",()=>{g("region")||window.scrollTo({top:0,left:0})})});function k(s,e){let t;function n(...i){t||(s.apply(this,i),t=setTimeout(()=>{t=null},e))}return n.cancel=function(){t&&(clearTimeout(t),t=null)},n}function V(s){const e=document.querySelector(".main__container"),t=document.querySelector(".main__to-scroll-up-button"),n=document.createElement("div");n.className="main__modal-container",n.style.position="absolute";const o=document.querySelector(".user-poppup").content.cloneNode(!0),r=o.querySelector(".user-poppup__modal-window"),l=o.querySelector(".user-poppup__close-button"),a=o.querySelector(".user-poppup__user-content"),m=`<img src="${s.avatar_url}" loading="lazy">`,v=`<h4 class="user-poppup__username">${s.login}</h4>`,E=`
        <p class="user-poppup__information">
            Ссылка на github: <a href="${s.html_url}" class="user-poppup__github-link" target="_blank">
                Перейти
            </a>
        </p>`;a.innerHTML+=v,a.innerHTML+=m,a.innerHTML+=E,n.appendChild(o),e.appendChild(n),r.showModal(),r.classList.remove("closing"),t.style.display="none",document.body.style.overflow="hidden";const y=b();let d;const c=()=>{r.classList.add("closing"),d=setTimeout(()=>{r.close(),e.removeChild(n),r.classList.remove("closing"),a.innerHTML=""},500),l.removeEventListener("click",c),document.removeEventListener("keydown",_),document.body.style.paddingRight=y,document.body.classList.remove("modal-open"),t.style.display="block",document.body.style.overflow=""},_=h=>{h.key==="Escape"&&c()},f=()=>{d&&clearTimeout(d),l.removeEventListener("click",c),document.removeEventListener("keydown",_)};l.addEventListener("click",()=>{f(),c()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&(f(),c())})}class K{constructor(){this.itemsInPage=3,this.totalPages=0,this.isScrolling=!1,this.sliderPlace=document.querySelector(".main__slider-items"),this.sliderMarkersPlace=document.querySelector(".main__slider-markers"),this.prevButton=document.querySelector(".main__slider-control.prev"),this.nextButton=document.querySelector(".main__slider-control.next"),this.dots=`
            <li class="main__slider-marker">
                <span>...</span>
            </li>`,this.firstMarker=`
            <li class="main__slider-marker">
                <a href="#" data-page="1">
                    1
                </a>
            </li>`,this.throttledScroll=k(this.onScroll.bind(this),750),this.throttledWheel=k(this.onWheel.bind(this),750),this.throttledPrevClick=k(this.onPrevClick.bind(this),750),this.throttledNextClick=k(this.onNextClick.bind(this),750),this.addScrollEventListener(),this.addClickEventListeners()}generateLastMarker(){return`
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
            <a id="item-${e+t}" popovertarget="mypopover">
                <img id="image-${e+t}" class="main__slider-image" src="${n.avatar_url}" alt="Картинка пользователя" draggable="false" loading="lazy" popovertarget="mypopover">
            </a>`}inputInDOM(e){this.sliderPlace.innerHTML="",this.sliderMarkersPlace.innerHTML="";for(let n=0;n<e.length;n+=this.itemsInPage){const i=e.slice(n,n+this.itemsInPage);let o='<li class="main__slider-item">';i.forEach((r,l)=>{o+=this.generateSliderElement(n,l,r)}),o+="</li>",this.sliderPlace.innerHTML+=o}this.sliderPlace.querySelectorAll(".main__slider-image").forEach(n=>{n.addEventListener("click",()=>{const i=+n.id.slice(6,n.id.length),o=e[i];V(o)})}),this.totalPages=Math.ceil(e.length/this.itemsInPage),this.generatePaginationMarkers(1),this.addClickEventListeners(),this.updateMarkersVisibility(0)}addScrollEventListener(){this.sliderPlace.addEventListener("scroll",this.throttledScroll),this.sliderPlace.addEventListener("wheel",this.throttledWheel)}onScroll(){this.isScrolling||(this.isScrolling=!0,setTimeout(()=>{const e=this.getCurrentSlideIndex(this.sliderPlace);this.updateMarkersVisibility(e),this.isScrolling=!1},750))}onWheel(e){if(e.shiftKey){e.preventDefault();const t=this.sliderPlace.clientWidth,n=Math.round(e.deltaY/100)*t;this.sliderPlace.scrollTo({left:this.sliderPlace.scrollLeft+n,behavior:"smooth"});const i=this.getCurrentSlideIndex(this.sliderPlace);this.updateMarkersVisibility(i)}}getCurrentSlideIndex(e){const t=Array.from(e.children),n=e.scrollLeft+e.clientWidth/2;for(let i=0;i<t.length;i++){const o=t[i];if(n>=o.offsetLeft&&n<o.offsetLeft+o.clientWidth)return i}return 0}updateMarkersVisibility(e){document.querySelectorAll(".main__slider-marker").forEach((n,i)=>{i===e?n.classList.add("active"):n.classList.remove("active")}),e===0?this.prevButton.style.display="none":this.prevButton.style.display="block",e===this.totalPages-1?this.nextButton.style.display="none":this.nextButton.style.display="block",this.generatePaginationMarkers(e+1)}generatePaginationMarkers(e){this.sliderMarkersPlace.innerHTML="",e!=1&&(this.sliderMarkersPlace.innerHTML+=this.firstMarker),e>3&&(this.sliderMarkersPlace.innerHTML+=this.dots),e>2&&(this.sliderMarkersPlace.innerHTML+=this.generatePrevMarker(e)),this.sliderMarkersPlace.innerHTML+=this.generateCurrentMarker(e),e<this.totalPages-1&&(this.sliderMarkersPlace.innerHTML+=this.generateNextMarker(e)),e<this.totalPages-2&&(this.sliderMarkersPlace.innerHTML+=this.dots),e!=this.totalPages&&(this.sliderMarkersPlace.innerHTML+=this.generateLastMarker()),this.addClickEventListeners()}addClickEventListeners(){document.querySelectorAll(".main__slider-marker a").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const i=parseInt(n.target.closest("a").getAttribute("data-page"));this.scrollToPage(i)})}),this.prevButton.addEventListener("click",this.throttledPrevClick),this.nextButton.addEventListener("click",this.throttledNextClick)}onPrevClick(){const e=this.getCurrentSlideIndex(this.sliderPlace);e>0&&this.scrollToPage(e)}onNextClick(){const e=this.getCurrentSlideIndex(this.sliderPlace);e<this.totalPages-1&&this.scrollToPage(e+2)}scrollToPage(e){const t=this.sliderPlace.clientWidth,n=(e-1)*t;this.sliderPlace.scrollTo({left:n,behavior:"smooth"})}destroy(){this.sliderPlace.removeEventListener("scroll",this.throttledScroll),this.sliderPlace.removeEventListener("wheel",this.throttledWheel),this.prevButton.removeEventListener("click",this.throttledPrevClick),this.nextButton.removeEventListener("click",this.throttledNextClick)}}const Q="https://api.github.com/users?per_page=99",z=async()=>{try{const s=await fetch(Q);if(s.ok){const e=await s.json();new K().inputInDOM(e)}else console.error("Ошибка HTTP: "+s.status)}catch(s){console.error("Произошла ошибка:",s)}};z();const D=document.querySelector(".main__processing-personal-data-input-tel");function I(s){return s.value.replace(/\D/g,"")}function T(s){let e=s.target,t=I(e),n="",i=e.selectionStart;if(!t)return e.value="";if(e.value.length!=i){s.data&&/\D/g.test(s.data)&&(e.value=t);return}["7","8","9"].indexOf(t[0])>-1?(t[0]=="9"&&(t="7"+t),n=(t[0]=="8"?"8":"+7")+" ",t.length>1&&(n+="("+t.substring(1,4)),t.length>=5&&(n+=") "+t.substring(4,7)),t.length>=8&&(n+="-"+t.substring(7,9)),t.length>=10&&(n+="-"+t.substring(9,11))):(n="+"+t[0]+" ",t.length>1&&(n+="("+t.substring(1,4)),t.length>=5&&(n+=") "+t.substring(4,7)),t.length>=8&&(n+="-"+t.substring(7,9)),t.length>=10&&(n+="-"+t.substring(9,11))),e.value=n}function q(s){let e=s.target;s.keyCode==8&&I(e).length==1&&(e.value="")}function N(s){let e=s.clipboardData||window.clipboardData,t=s.target,n=I(t);if(e){let i=e.getData("Text");/\D/g.test(i)&&(t.value=n)}}D.addEventListener("input",T);D.addEventListener("keydown",q);D.addEventListener("paste",N);class F{constructor(){this.timeLiveMessage=5e3,this.successTemplate=document.querySelector(".main__success-message-template"),this.failedTemplate=document.querySelector(".main__failed-message-template"),this.failedMessagePhoneRetry="На этот номер уже выслан промокод",this.timers=[]}deleteMessageFromDOM(e){const t=setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},this.timeLiveMessage);this.timers.push(t)}clearMessages(e){for(;e.firstChild;)e.removeChild(e.firstChild)}outputFailedMessage(e,t){this.cleanupMessages();const n=this.failedTemplate.content.cloneNode(!0),i=document.createElement("div");i.className="main__message-container",i.appendChild(n),t.appendChild(i),this.deleteMessageFromDOM(i);const o=this.failedTemplate.content.cloneNode(!0),r=document.createElement("div");r.className="main__message-container",r.appendChild(o),r.querySelector(".main__info-message-text-message").textContent=this.failedMessagePhoneRetry,e.appendChild(r),this.deleteMessageFromDOM(r)}outputSuccessMessage(e,t){this.cleanupMessages();const n=this.successTemplate.content.cloneNode(!0),i=document.createElement("div");i.className="main__message-container",i.appendChild(n),t.appendChild(i),this.deleteMessageFromDOM(i);const o=this.successTemplate.content.cloneNode(!0),r=document.createElement("div");r.className="main__message-container",r.appendChild(o),e.appendChild(r),this.deleteMessageFromDOM(r)}setNumberInLocalStorage(e){const t=new Date;localStorage.setItem(String(t),e)}phoneInLocalStorage(e){let t=!1;for(let n in localStorage)if(localStorage.hasOwnProperty(n)&&n!="region"){const i=localStorage.getItem(n);e==i&&(t=!0)}return t}validatePhoneNumber(e){return/(\+7|[0-689])\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/.test(e)}dataProcessing(e,t,n,i,o,r){e.preventDefault();const l=r.value;if(!t.checked||l==""){o.style.background="gray";const a=setTimeout(()=>{o.style.background="white"},this.timeLiveMessage);this.timers.push(a)}else this.validatePhoneNumber(l)?this.phoneInLocalStorage(l)?this.outputFailedMessage(n,i):(this.setNumberInLocalStorage(l),this.outputSuccessMessage(n,i)):this.outputFailedMessage(n,i)}clearTimers(){this.timers.forEach(e=>clearTimeout(e)),this.timers=[]}cleanupMessages(){document.querySelectorAll(".main__message-container").forEach(t=>{t.parentNode&&t.parentNode.removeChild(t)}),this.clearTimers()}}const B=document.querySelector(".main__processing-personal-data-input-tel"),J=document.querySelector(".main__info-message-computers"),Y=document.querySelector(".main__info-message-phone"),W=document.querySelector(".main__processing-personal-data-agree"),p=document.querySelector(".main__processing-personal-data-submit"),j=new F;function G(s){s.preventDefault(),j.dataProcessing(s,W,Y,J,p,B)}function O(){B.value.trim()==""||!W.checked?(p.style.pointerEvents="none",p.style.background="gray"):(p.style.pointerEvents="",p.style.background="white")}B.addEventListener("input",O);W.addEventListener("change",O);p.style.pointerEvents="none";p.addEventListener("click",G);O();const U=document.querySelector(".main__stocks-content-participate-button");U.addEventListener("click",()=>{let e=document.querySelector(".main__participate").content.cloneNode(!0),t=e.querySelector(".main__participate-modal-window"),n=t.querySelector(".main__processing-personal-data-input-tel"),i=t.querySelector(".main__processing-personal-data-agree"),o=t.querySelector(".main__processing-personal-data-submit"),r=t.querySelector(".main__participate-close-button"),l=t.querySelector(".main__info-message-phone"),a=t.querySelector(".main__info-message-computers"),m=document.createElement("div");m.className="main__modal-container",m.style.position="absolute";const v=document.querySelector(".main__container");m.appendChild(e),v.appendChild(m),t.showModal(),t.classList.remove("close"),document.body.style.overflow="hidden";const E=b();let y;const d=()=>{t.classList.add("close"),y=setTimeout(()=>{t.close(),v.removeChild(m),t.classList.remove("close")},500),document.body.style.overflow="",document.body.classList.remove("modal-open"),document.body.style.paddingRight=E,r.removeEventListener("click",d),document.removeEventListener("keydown",c),n.removeEventListener("input",T),n.removeEventListener("keydown",q),n.removeEventListener("paste",N),o.removeEventListener("click",f)},c=M=>{M.key==="Escape"&&(d(),_())},_=()=>{y&&clearTimeout(y),closeButton.removeEventListener("click",d),document.removeEventListener("keydown",c)},f=M=>{new F().dataProcessing(M,i,l,a,o,n)},h=()=>{n.value.trim()==""||!i.checked?(o.style.pointerEvents="none",o.style.background="gray"):(o.style.pointerEvents="",o.style.background="white")};n.addEventListener("input",h),i.addEventListener("change",h),o.style.pointerEvents="none",r.addEventListener("click",d),document.addEventListener("keydown",c),n.addEventListener("input",T),n.addEventListener("keydown",q),n.addEventListener("paste",N),o.addEventListener("click",f),h()});
