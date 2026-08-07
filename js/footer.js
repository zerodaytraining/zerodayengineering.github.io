// Site footer.
// Injects HTML in place at the position of the <script src="/js/footer.js"> tag.
// All internal links are absolute so this file works from any page depth.
(function () {
   const FOOTER_HTML = `
      <!-- Footer -->
      <footer class="footer section" style="margin-top:120px;">
         <div class="container">
            <div class="row justify-content-center">
               <div class="col-md-12">
                  <div class="hr-footer"></div>
                  <div class="footer-site-logo"><a href="/index.html" class="main-logo"><img src="/images/logo.png" class="logo-img light-logo img-fluid" alt=""></a></div>
                  <p><a class="nl-footer-link" href="#" onclick="openNewsletterModal(); return false;">Newsletter: Access Denied</a></p>
                  <p class="site-copyright">
                     <small>&copy; 2021-2026 Zero Day Engineering. All Rights Reserved. <a href="/rss" class="social-icon"><i class="fa fa-rss"></i></a></small>
                  </p>
               </div>
            </div>
         </div>
      </footer>
      <!-- Footer end -->
   `;
   document.currentScript.insertAdjacentHTML('beforebegin', FOOTER_HTML);
})();
