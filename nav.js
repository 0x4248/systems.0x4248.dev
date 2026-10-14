(function () {
  var mount = document.getElementById('nav');
  if (!mount) return;

  fetch('/nav.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      mount.outerHTML = html;
      animateY();

      var path = window.location.pathname.replace(/^\//, '');
      document.querySelectorAll('.nav-links a[data-nav]').forEach(function (link) {
        if (link.getAttribute('data-nav') === path) {
          link.setAttribute('aria-current', 'page');
        }
      });

      var navEl = document.querySelector('.nav');
      if (!navEl) return;

      var toggleScrolled = function () {
        navEl.classList.toggle('is-scrolled', window.scrollY > 10);
      };
      toggleScrolled();
      window.addEventListener('scroll', toggleScrolled, { passive: true });

      var items = navEl.querySelectorAll('.has-dropdown');
      var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      function setOpen(item, open) {
        item.classList.toggle('is-open', open);
        var btn = item.querySelector('.nav-toggle');
        if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }

      function closeAll(except) {
        items.forEach(function (item) {
          if (item !== except) setOpen(item, false);
        });
      }

      items.forEach(function (item) {
        var btn = item.querySelector('.nav-toggle');
        if (!btn) return;

        btn.addEventListener('click', function (event) {
          event.stopPropagation();
          var open = item.classList.contains('is-open');
          if (canHover && event.detail !== 0) return;
          closeAll();
          setOpen(item, !open);
        });

        if (canHover) {
          item.addEventListener('pointerenter', function () {
            closeAll(item);
            setOpen(item, true);
          });
          item.addEventListener('pointerleave', function () {
            setOpen(item, false);
          });
        }
      });

      document.addEventListener('click', function () { closeAll(); });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeAll();
      });
    })
    .catch(function (err) { console.error('Failed to load nav:', err); });
})();


function animateY() {
  const yL = document.getElementById('yl');
  const yR = document.getElementById('yr');
  const flip = document.querySelector('.brand-y-flip');
  if (!yL || !yR) return;
  const rounds = 5;
  const duration = 250 * rounds;
  let currentRound = 0;

  const randomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

  if (flip) {
    flip.animate(
      [{ marginTop: '10px' }, { marginTop: '-5px' }],
      { duration: duration, easing: 'ease-out', fill: 'forwards' }
    );
  }
  
  const animate = () => {
    if (currentRound < rounds) {
      yL.textContent = randomLetter();
      yR.textContent = randomLetter();
      setTimeout(animate, 250);
      currentRound++;
    } else {
      yL.textContent = 'Y';
      yR.textContent = 'Y';
    }
  };
  animate();
}

