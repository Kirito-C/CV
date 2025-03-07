function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const offset = section.offsetTop;
  const duration = 2000;
  const start = window.pageYOffset;
  const distance = offset - start;
  let startTime = null;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, start, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animate);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animate);
}

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').replace(/.*#/, '');
    scrollToSection(targetId);
  });
});

// Gestione form
const form = document.getElementById('form-contattami');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      alert('Messaggio inviato con successo!');
      form.reset();
    }
  } catch (error) {
    alert('Si è verificato un errore. Riprova più tardi.');
  }
});

// Aggiungi al JavaScript
// Gestione dropdown
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', () => {
    dropdown.querySelector('.dropdown-content').style.display = 'block';
  });

  dropdown.addEventListener('mouseleave', () => {
    dropdown.querySelector('.dropdown-content').style.display = 'none';
  });

  // Per dispositivi touch
  dropdown.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const content = dropdown.querySelector('.dropdown-content');
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    }
  });
});

// Chiudi dropdown cliccando fuori
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-content').forEach(content => {
      content.style.display = 'none';
    });
  }
});

const navToggle = document.createElement('button');
navToggle.className = 'nav-toggle';
navToggle.innerHTML = '☰';
document.querySelector('nav').prepend(navToggle);

const navMenu = document.querySelector('nav ul');

function toggleMenu() {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

navToggle.addEventListener('click', function(e) {
  e.stopPropagation();
  toggleMenu();
});

// Chiudi menu cliccando fuori
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 &&
      !e.target.closest('nav') &&
      navMenu.classList.contains('active')) {
    toggleMenu();
  }
});

// Chiudi menu al click sui link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});

// Adatta menu al resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
    toggleMenu();
  }
});
