// PEM Disability Children's Club — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('hidden');
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mark current page in nav
  var here = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach(function (link) {
    var target = link.getAttribute('href');
    if (target === here || (here === '' && target === 'index.html')) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('text-orange-400');
    }
  });

  // Events page: highlight the current month, dim past events
  var today = new Date('2026-07-17'); // club's reference "today" — update as needed
  document.querySelectorAll('[data-event-date]').forEach(function (el) {
    var d = new Date(el.getAttribute('data-event-date'));
    if (d < today) {
      el.classList.add('event-past');
    }
  });
  var currentMonthBlock = document.querySelector('[data-month-current]');
  if (currentMonthBlock) {
    currentMonthBlock.classList.add('month-current');
    setTimeout(function () {
      currentMonthBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  // Simple event filter buttons (All / Upcoming / By venue) on events.html
  var filterButtons = document.querySelectorAll('[data-filter]');
  var eventItems = document.querySelectorAll('[data-event-tags]');
  if (filterButtons.length && eventItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) {
          b.classList.remove('bg-teal-600', 'text-white');
          b.classList.add('bg-white', 'text-navy-900');
        });
        btn.classList.add('bg-teal-600', 'text-white');
        btn.classList.remove('bg-white', 'text-navy-900');

        var filter = btn.getAttribute('data-filter');
        eventItems.forEach(function (item) {
          var tags = item.getAttribute('data-event-tags');
          var isPast = item.classList.contains('event-past');
          if (filter === 'all') {
            item.classList.remove('hidden');
          } else if (filter === 'upcoming') {
            item.classList.toggle('hidden', isPast);
          } else {
            item.classList.toggle('hidden', tags.indexOf(filter) === -1);
          }
        });
      });
    });
  }
});
