// Mobile menu — injected at body level, before .site-wrap.
(function () {
   const HTML = `
      <nav class="site-mobile-menu">
         <div class="close-wrap d-flex">
            <a href="#" class="d-flex ml-auto js-menu-toggle">
               <span class="close-label">Close</span>
               <div class="close-times">
                  <span class="bar1"></span>
                  <span class="bar2"></span>
               </div>
            </a>
         </div>
         <div class="site-mobile-inner"></div>
      </nav>
   `;
   document.currentScript.insertAdjacentHTML('beforebegin', HTML);
})();
