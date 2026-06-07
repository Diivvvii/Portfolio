// Folder tabs
document.querySelectorAll('.folder-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.folder-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.folder-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + target).classList.add('active');
    // re-trigger chip animations
    document.querySelectorAll('#tab-' + target + ' .skill-chip').forEach((chip, i) => {
      chip.classList.remove('visible');
      setTimeout(() => chip.classList.add('visible'), i * 80);
    });
  });
});

// Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx - 6 + 'px'; cursor.style.top = my - 6 + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + 'px'; ring.style.top = ry - 18 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('active'); ring.classList.add('active'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); ring.classList.remove('active'); });
});

// Marquee
const skills = ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Python', 'Flask', 'MySQL', 'React', 'Git', 'Responsive Design', 'UI/UX', 'Frontend Dev'];
const track = document.getElementById('marqueeTrack');
const doubled = [...skills, ...skills];
doubled.forEach(s => {
  const item = document.createElement('div'); item.className = 'marquee-item';
  item.innerHTML = `<i class="fa-solid fa-diamond"></i> ${s}`;
  track.appendChild(item);
});

// Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal-left, .exp-item, .reveal-up, .project-card, .cert-card, .reveal-chip, .skill-chip, .reveal-right, .accomplishment-item').forEach(el => observer.observe(el));

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});
