const t={body:document.querySelector("body"),start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")};let e=null;t.start.addEventListener("click",(function(){t.start.setAttribute("disabled","disabled"),e=setInterval((function(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.stop.addEventListener("click",(function(){clearInterval(e),t.start.removeAttribute("disabled","disabled")}));
//# sourceMappingURL=01-color-switcher.d47379e7.js.map