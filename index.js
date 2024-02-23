// NAVITION MENU
const menuBtn = document.getElementById('open-menu');
const mobileNav = document.getElementById('mobile-navigation');
const closeBtn = document.getElementById('close-menu');
const links = mobileNav.querySelectorAll('a');

menuBtn.addEventListener('click', () => {
  console.log("ok");
  mobileNav.classList.toggle('active');
});
closeBtn.addEventListener('click', () => mobileNav.classList.remove('active'));
links.forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('active')));

// ================================blog edit form==============================

const editBtn = document.querySelectorAll('.blog-edit-button');
const editForm = document.getElementById('edit-blog-cont');
const editFormClose = document.getElementById('close-blog-form');
console.log(editBtn);

for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener('click', () => {
        editForm.style.display = 'flex';
    });
}
if (editFormClose) {
    editFormClose.addEventListener('click', () => editForm.style.display = 'none');
}


// ================================THEME tagglo ==============================
// Define your light mode colors
const lightModeColors = {
    '--text-color': '#00071D', // replace with your light mode text color
    '--border-color': '#D1D1D1', // replace with your light mode border color
     '--container-background': '#fbfbfb', // replace with your light mode container background
    '--background': '#FFFFF0' // replace with your light mode background
  };
  
  // Get the button element
  const toggleButton = document.querySelector('#theme-toggle-button');
const root = document.documentElement;


toggleButton.addEventListener('click', function() {
  const currentMode = getComputedStyle(root).getPropertyValue('--dark-mode') === 'true' ? 'dark' : 'light';

  if (currentMode === 'light') {
    root.style.setProperty('--dark-mode', 'true');
    root.style.setProperty('--dark-mode-background', lightModeColors['background']);
    root.style.setProperty('--dark-mode-text-color', lightModeColors['--text-color']);
    root.style.setProperty('--dark-mode-container-background', lightModeColors['--container-background']);
    root.style.setProperty('--dark-mode-border-color', lightModeColors['--border-color']);
    root.style.setProperty('--dark-mode-footer-color', lightModeColors['--container-background']);
  } else {
    root.style.setProperty('--dark-mode', 'false');
    root.style.setProperty('--dark-mode-background', '#00000F');
    root.style.setProperty('--dark-mode-text-color', '#DFDEFF');
    root.style.setProperty('--dark-mode-container-background', '#000516');
    root.style.setProperty('--dark-mode-border-color', "#00114A");
    root.style.setProperty('--dark-mode-footer-color', '#00071D');
  }
});
