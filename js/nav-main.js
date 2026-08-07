// Main site nav — injected inside .site-inner, before page content.
// All internal links absolute so this works from any page depth.
(function () {
   const HTML = `
      <nav class="site-nav site-nav-target">
         <div class="container">
            <div class="row align-items-center justify-content-between text-left">
               <div class="col-3">
                  <div class="site-logo">
                     <a href="/index.html" class="site-logo main-logo"><img src="/images/logo.png" class="logo-img light-logo img-fluid" alt=""><span></span></a>
                  </div>
               </div>
               <div class="col text-right">
                  <ul class="site-nav-ul js-clone-nav text-left d-none d-lg-inline-block">
                     <li class="has-children">
                        <a href="/research/index.html" class="nav-link cursor-item">Research</a>
                        <ul class="dropdown">
                           <li><a href="/insights/index.html">0-Day Insights</a></li>
                           <li><a href="/research/index.html">Exploit Design</a></li>
                           <li><a href="/research/index.html">Reverse Engineering</a></li>
                           <li><a href="/research/index.html">Abstract Models</a></li>
                           <li><a href="/research/index.html">Publications</a></li>
                        </ul>
                     </li>
                     <li class="has-children">
                        <a href="/intelligence/index.html" class="nav-link cursor-item">Intelligence</a>
                        <ul class="dropdown">
                           <li><a href="/intelligence/alpha/index.html">Alpha &mdash; Exploit Intelligence</a></li>
                           <li><a href="/intelligence/index.html">Pi — Pattern Insight</a></li>
                           <li><a href="/intelligence/index.html">Omega — Exclusive R&D</a></li>
                        </ul>
                     </li>
                     <li class="has-children">
                        <a href="/training/index.html" class="nav-link cursor-item">Training</a>
                        <ul class="dropdown">
                           <li><a href="/training/universal-vulnerability-research.html">Zero Day Vulnerability Research</a></li>
                           <li><a href="/training/hypervisor-vulnerability-research.html">Hypervisor Vulnerability Research</a></li>
                           <li><a href="/training/browser-exploit-design.html">Browser Exploit Design</a></li>
                           <li><a href="/training/masterclass/">Masterclasses</a></li>
                           <li><a href="/training/certification/">Certification</a></li>
                           <li><a href="/events.html">Schedule</a></li>
                           <li><a href="/training/reviews/index.html">Praise</a></li>
                        </ul>
                     </li>
                     <li class="has-children">
                        <a href="/about.html" class="nav-link cursor-item">Company</a>
                        <ul class="dropdown">
                           <li><a href="/about.html">About us</a></li>
                           <li><a href="/strategic-access.html">Enterprise &amp; Governments</a></li>
                           <li><a href="/events.html">Events</a></li>
                           <li><a href="/contact.html">Contact</a></li>
                        </ul>
                     </li>
                  </ul>
                  <ul class="site-nav-ul-none-onepage text-right d-inline-block d-lg-none">
                     <li><a href="#" class="js-menu-toggle">Menu</a></li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
   `;
   document.currentScript.insertAdjacentHTML('beforebegin', HTML);
})();
