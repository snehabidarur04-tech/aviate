// Aviate x KC Overseas Education — shared behaviour
document.addEventListener('DOMContentLoaded', function () {

  // Sticky header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile hamburger menu
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Animated stat counters (hero stat row)
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var animateCount = function (el) {
      var target = el.getAttribute('data-count');
      var numeric = parseInt(target.replace(/[^0-9]/g, ''), 10);
      if (isNaN(numeric)) return;
      var suffix = target.replace(/^[0-9,]+/, '');
      var current = 0;
      var steps = 36;
      var increment = numeric / steps;
      var i = 0;
      var timer = setInterval(function () {
        i++;
        current = Math.min(numeric, Math.round(increment * i));
        el.textContent = current.toLocaleString('en-IN') + suffix;
        if (current >= numeric) clearInterval(timer);
      }, 22);
    };
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(animateCount);
    }
  }

  // Contact form — client-side only, no backend
  var form = document.getElementById('partner-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name');
      var valid = form.checkValidity();
      if (!valid) {
        form.reportValidity();
        return;
      }
      var success = document.getElementById('form-success');
      var firstName = name && name.value ? name.value.split(' ')[0] : 'there';
      if (success) {
        success.querySelector('[data-success-name]') &&
          (success.querySelector('[data-success-name]').textContent = firstName);
        success.classList.add('is-visible');
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
      form.reset();
      form.querySelectorAll('.field input, .field textarea').forEach(function (f) {
        f.blur();
      });
    });
  }

  // Country info modal (homepage destinations)
  var countryData = {
    'Georgia': {
      flag: 'ge',
      tagline: 'The safe & smart choice',
      fee: '$5,500 – $7,000 / yr',
      list: ['Georgian National University (SEU)', 'Alte University', 'Tbilisi Medical Academy', 'Caucasus University', 'Grigol Robakidze University']
    },
    'Russia': {
      flag: 'ru',
      tagline: 'Excellence & affordability',
      fee: '$10,000 / yr',
      list: ['Synergy University (Moscow)']
    },
    'Hungary': {
      flag: 'hu',
      tagline: 'The gold standard of EU',
      fee: '€14,000 – €15,000 / yr',
      list: ['University of Debrecen', 'University of Pécs']
    },
    'Lithuania': {
      flag: 'lt',
      tagline: 'Gateway to Europe',
      fee: '€13,000 / yr',
      list: ['Vilnius University']
    },
    'Malaysia': {
      flag: 'my',
      tagline: 'Premium quality & proximity',
      fee: '$12,000 – $34,000 / yr',
      list: ['Monash University Malaysia', "Taylor's University", 'Sunway University', 'Lincoln University College']
    },
    'United Kingdom': {
      flag: 'gb',
      tagline: 'Academic excellence',
      fee: 'Varies by course & university',
      list: ['Superior courses and internationally recognised universities', 'Post-study job opportunities', 'Great research opportunities', 'Diverse culture and good quality of life']
    },
    'United States': {
      flag: 'us',
      tagline: 'Globally accepted degrees',
      fee: 'Varies by course & university',
      list: ['Flexible scholarship programs', 'Study and earn simultaneously', 'Tensile, flexible education system', 'Amazing campus life']
    },
    'Canada': {
      flag: 'ca',
      tagline: 'Scholastic excellence',
      fee: 'Varies by course & university',
      list: ['Affordable fees relative to other Western countries', 'Focused approach on skill development', '6th safest country to live in (Global Peace Index 2022)', 'Strong post-study career opportunities']
    },
    'Ireland': {
      flag: 'ie',
      tagline: 'New age technology courses',
      fee: 'Varies by course & university',
      list: ['Multiple work opportunities', 'Globally recognised universities', 'Affordable cost of living', 'Ample scholarship programs', 'Earn while seeking higher education']
    },
    'Australia': {
      flag: 'au',
      tagline: 'Variety of courses',
      fee: 'Varies by course & university',
      list: ['Multiple scholarship programs', 'World-class education', 'Affordable living', 'Technologically advanced courses']
    },
    'New Zealand': {
      flag: 'nz',
      tagline: 'Affordable tuition fee',
      fee: 'Varies by course & university',
      list: ['Great scholarship programs', 'Good scope for Ph.D. scholars', 'Emphasis on innovation and research', '2nd safest country to live in (Global Peace Index 2022)', 'Accredited qualifications across the globe']
    },
    'More': {
      flag: 'un',
      tagline: '45+ countries represented',
      fee: '',
      list: [],
      note: "Beyond these headline destinations, Aviate and KC Overseas Education represent universities across Europe and Asia, including Austria, Croatia, Denmark, Italy, Latvia, Japan, Singapore and South Korea. Talk to our team for the full list matched to your students' goals."
    }
  };

  var modal = document.getElementById('country-modal');
  if (modal) {
    var modalTagline = document.getElementById('modal-tagline');
    var modalName = document.getElementById('modal-country-name');
    var modalFee = document.getElementById('modal-fee');
    var modalBody = document.getElementById('modal-body');
    var modalClose = document.getElementById('modal-close');
    var lastFocused = null;

    var openModal = function (country) {
      var data = countryData[country];
      if (!data) return;
      lastFocused = document.activeElement;
      modalTagline.textContent = data.tagline || 'Study destination';
      var label = country === 'More' ? '45+ destinations worldwide' : country;
      modalName.innerHTML = '';
      if (data.flag) {
        var flagSpan = document.createElement('span');
        flagSpan.className = 'fi fi-' + data.flag + ' modal-flag';
        modalName.appendChild(flagSpan);
      }
      modalName.appendChild(document.createTextNode(label));
      modalFee.textContent = data.fee || '';
      modalFee.style.display = data.fee ? 'block' : 'none';
      modalBody.innerHTML = '';
      if (data.note) {
        var p = document.createElement('p');
        p.textContent = data.note;
        modalBody.appendChild(p);
      }
      if (data.list && data.list.length) {
        var ul = document.createElement('ul');
        data.list.forEach(function (item) {
          var li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
        });
        modalBody.appendChild(ul);
      }
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      modalClose.focus();
      document.body.style.overflow = 'hidden';
    };

    var closeModal = function () {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll('.chip[data-country]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        openModal(chip.getAttribute('data-country'));
      });
    });
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }
});
