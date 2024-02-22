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
editFormClose.addEventListener('click', () => editForm.style.display = 'none');