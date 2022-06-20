const t={body:document.querySelector("body"),start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")};t.start.addEventListener("click",(function(){setInterval((function(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.stop.addEventListener("click",onStopClick);
//# sourceMappingURL=01-color-switcher.83f51dde.js.map
