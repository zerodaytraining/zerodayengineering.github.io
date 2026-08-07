// Newsletter subscription modal — shared across all pages.
// Depends on: css/style.css (all .nl-modal-* classes)
// Backend: Mailpro via GAS proxy

(function () {
   const NL_GAS = 'https://script.google.com/macros/s/AKfycbys7jnM9zQ_B6qirWBiqc8baRN6T7o9mPuW0uclyuvmiQMxVW-4fCnemZ5-9n6zzwEX3A/exec';

   const MODAL_HTML = `
      <div class="nl-modal-overlay" id="nl-modal">
         <div class="nl-modal-box">
            <div class="nl-modal-label">Subscription</div>
            <div class="nl-modal-field">
               <label class="nl-modal-field-label">Email</label>
               <input class="nl-modal-input" id="nl-email" type="email" placeholder="your@email.com" autocomplete="email" spellcheck="false" autocapitalize="off" />
            </div>
            <div class="nl-modal-field">
               <label class="nl-modal-field-label">Full Name</label>
               <input class="nl-modal-input" id="nl-name" type="text" autocomplete="name" spellcheck="false" />
            </div>
            <div class="nl-modal-field">
               <label class="nl-modal-field-label">Company</label>
               <input class="nl-modal-input" id="nl-company" type="text" autocomplete="organization" spellcheck="false" />
            </div>
            <div class="nl-modal-field">
               <label class="nl-modal-field-label">Role</label>
               <input class="nl-modal-input" id="nl-role" type="text" autocomplete="organization-title" spellcheck="false" />
            </div>
            <div class="nl-modal-field">
               <label class="nl-modal-field-label">What brings you here?</label>
               <input class="nl-modal-input" id="nl-signal" type="text" placeholder="e.g. a specific publication or news piece" spellcheck="false" />
            </div>
            <div class="nl-modal-field">
               <label class="nl-modal-field-label">Primary Interest</label>
               <input class="nl-modal-input" id="nl-interest" type="text" placeholder="e.g. a specific product name or research topic" spellcheck="false" />
            </div>
            <div class="nl-modal-actions">
               <button class="nl-modal-btn" id="nl-submit" onclick="submitNewsletter()">Subscribe</button>
            </div>
            <div class="nl-modal-error" id="nl-error">Error. Try again later.</div>
            <div class="nl-modal-note">Bi-weekly mailing with updates from the Founder</div>
         </div>
      </div>
      <div class="nl-modal-overlay" id="nl-modal-confirm">
         <div class="nl-modal-box">
            <div class="nl-modal-confirm-text">One more step — check your email to confirm your subscription.</div>
            <div class="nl-modal-actions" style="justify-content:center;">
               <button class="nl-modal-btn" onclick="closeNewsletterConfirm()">OK</button>
            </div>
         </div>
      </div>
   `;

   function inject() {
      if (document.getElementById('nl-modal')) return;
      const wrap = document.createElement('div');
      wrap.innerHTML = MODAL_HTML;
      while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

      const modal = document.getElementById('nl-modal');
      const modalConfirm = document.getElementById('nl-modal-confirm');

      modal.addEventListener('keydown', e => {
         if (e.key === 'Enter') submitNewsletter();
         if (e.key === 'Escape') closeNewsletterModal();
      });
      modalConfirm.addEventListener('keydown', e => {
         if (e.key === 'Escape' || e.key === 'Enter') closeNewsletterConfirm();
      });

      // Click on the overlay (outside the box) dismisses the modal.
      modal.addEventListener('click', e => {
         if (e.target === modal) closeNewsletterModal();
      });
      modalConfirm.addEventListener('click', e => {
         if (e.target === modalConfirm) closeNewsletterConfirm();
      });
   }

   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject);
   } else {
      inject();
   }

   window.openNewsletterModal = function () {
      document.getElementById('nl-error').style.display = 'none';
      document.getElementById('nl-modal').classList.add('active');
      setTimeout(() => document.getElementById('nl-email').focus(), 50);
   };

   window.closeNewsletterModal = function () {
      document.getElementById('nl-modal').classList.remove('active');
      const btn = document.getElementById('nl-submit');
      btn.disabled = false;
      btn.textContent = 'Subscribe';
   };

   window.closeNewsletterConfirm = function () {
      document.getElementById('nl-modal-confirm').classList.remove('active');
   };

   window.submitNewsletter = async function () {
      const email = document.getElementById('nl-email').value.trim();
      if (!email || !email.includes('@')) {
         document.getElementById('nl-email').focus();
         return;
      }
      const btn = document.getElementById('nl-submit');
      btn.disabled = true;
      btn.textContent = '...';
      document.getElementById('nl-error').style.display = 'none';

      const params = new URLSearchParams({
         email: email,
         name: document.getElementById('nl-name').value.trim(),
         company: document.getElementById('nl-company').value.trim(),
         role: document.getElementById('nl-role').value.trim(),
         signal: document.getElementById('nl-signal').value.trim(),
         interest: document.getElementById('nl-interest').value.trim(),
         referrer: document.referrer || '',
         utm_source: new URLSearchParams(location.search).get('utm_source') || '',
         utm_medium: new URLSearchParams(location.search).get('utm_medium') || '',
         utm_campaign: new URLSearchParams(location.search).get('utm_campaign') || '',
         source: location.hostname,
      });

      try {
         const res = await fetch(NL_GAS, { method: 'POST', body: params });
         const data = JSON.parse(await res.text());
         if (data.ok) {
            document.getElementById('nl-modal').classList.remove('active');
            document.getElementById('nl-modal-confirm').classList.add('active');
         } else {
            document.getElementById('nl-error').style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Subscribe';
         }
      } catch (err) {
         console.error(err);
         document.getElementById('nl-error').style.display = 'block';
         btn.disabled = false;
         btn.textContent = 'Subscribe';
      }
   };
})();
