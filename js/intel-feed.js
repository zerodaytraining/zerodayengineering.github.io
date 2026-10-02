// Exploit Intelligence feed — latest posts from the Ghost site, rendered as an
// Owl carousel in #intelCarousel (markup in index.html): one centered post with
// smaller previews on either side (single slide on narrow screens).
// Card styles reuse .portfolio-wrap from css/style.css; posts without a feature
// image get a generated .intel-card, and side previews are styled via
// .intel-carousel (both in css/style.css).
// Backend: Ghost Content API (read-only key, safe to ship in the browser).
// If the key is unset or the request fails, the whole #intel-feed section stays hidden.

(function () {
   const GHOST_URL = 'https://intelligence.zerodayengineering.com';
   const GHOST_KEY = 'afa3dbe29b02cca52e9129d699'; // Content API key (Ghost Admin → Settings → Integrations)
   const LIMIT = 5;
   const FILTER = 'tag:-announcements+tag:-0-day-alerts';

   const EMOJI_PREFIX = /^[\p{Extended_Pictographic}️‍\s]+/u;

   function el(tag, cls, text) {
      const e = document.createElement(tag);
      if (cls) e.className = cls;
      if (text) e.textContent = text;
      return e;
   }

   function link(href, cls, text) {
      const a = el('a', cls, text);
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      return a;
   }

   function formatDate(iso) {
      return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
   }

   function buildSlide(post) {
      const title = post.title.replace(EMOJI_PREFIX, '');
      const tag = post.tags && post.tags.length ? post.tags[0].name : '';

      const wrap = el('div', 'portfolio-wrap');

      const visual = link(post.url, 'portfolio-item');
      if (post.feature_image) {
         const img = el('img', 'img-fluid');
         img.src = post.feature_image;
         img.alt = '';
         visual.appendChild(img);
      } else {
         const card = el('div', 'intel-card');
         card.appendChild(el('div', 'intel-card-tag', tag));
         card.appendChild(el('div', 'intel-card-title', title));
         visual.appendChild(card);
      }

      // Caption: tag · date, plus the title only when the visual is an image
      // (title cards already show it).
      const content = el('div', 'portfolio-content');
      content.appendChild(el('p', null, [tag, formatDate(post.published_at)].filter(Boolean).join(' · ')));
      if (post.feature_image) {
         const h3 = el('h3');
         h3.appendChild(link(post.url, null, title));
         content.appendChild(h3);
      }

      wrap.appendChild(visual);
      wrap.appendChild(content);
      return wrap;
   }

   async function load() {
      const carousel = document.getElementById('intelCarousel');
      if (!carousel || !GHOST_KEY) return;

      const params = new URLSearchParams({
         key: GHOST_KEY,
         limit: String(LIMIT),
         include: 'tags',
         filter: FILTER,
         fields: 'title,url,published_at,feature_image',
      });
      try {
         const res = await fetch(`${GHOST_URL}/ghost/api/content/posts/?${params}`);
         if (!res.ok) throw new Error(`Ghost API ${res.status}`);
         const { posts } = await res.json();
         if (!posts || !posts.length) return;

         posts.forEach(post => carousel.appendChild(buildSlide(post)));
         document.getElementById('intel-feed').style.display = '';

         const $carousel = $(carousel);
         $carousel.owlCarousel({
            center: true,
            loop: posts.length >= 3,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            autoplaySpeed: 800,
            nav: false,
            dots: false,
            responsive: {
               0: { items: 1 },
               768: { items: 3 },
            },
         });

         // Clicking a side preview brings it to the center instead of opening the post.
         $carousel.on('click', '.owl-item:not(.center) a', function (e) {
            e.preventDefault();
            const item = $(this).closest('.owl-item');
            const center = $carousel.find('.owl-item.center');
            $carousel.trigger(item.index() < center.index() ? 'prev.owl.carousel' : 'next.owl.carousel');
         });

         // Slides (and Owl's loop clones) are added after page load, so custom.js's
         // cursor hover binding misses them; delegate instead.
         $carousel.on('mouseenter', '.portfolio-item', () => $('.cursor, .cursor-follower').addClass('active'));
         $carousel.on('mouseleave', '.portfolio-item', () => $('.cursor, .cursor-follower').removeClass('active'));
      } catch (err) {
         console.error(err);
      }
   }

   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', load);
   } else {
      load();
   }
})();
