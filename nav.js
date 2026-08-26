(function () {
  var mount = document.getElementById('nav');
  if (!mount) return;

  fetch('/nav.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      mount.outerHTML = html;

      var page = window.location.pathname.split('/').pop();
      document.querySelectorAll('.nav-links a[data-nav]').forEach(function (link) {
        if (link.getAttribute('data-nav') === page) {
          link.setAttribute('aria-current', 'page');
        }
      });

      var navEl = document.querySelector('.nav');
      if (navEl) {
        var toggleScrolled = function () {
          navEl.classList.toggle('is-scrolled', window.scrollY > 10);
        };
        toggleScrolled();
        window.addEventListener('scroll', toggleScrolled, { passive: true });
      }
    })
    .catch(function (err) { console.error('Failed to load nav:', err); });
})();
