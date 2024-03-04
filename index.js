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
    '--background': '#fffffc' // replace with your light mode background
  };
  
  // Get the button element
  const toggleButton = document.querySelector('#theme-toggle-button');
const root = document.documentElement;


function setTheme(theme) {
//   const currentMode = getComputedStyle(root).getPropertyValue('--dark-mode') === 'true' ? 'dark' : 'light';

  if (theme === 'dark') {
    root.style.setProperty('--dark-mode', 'true');
    root.style.setProperty('--dark-mode-background', lightModeColors['--background']);
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
};

function getThemePreference() {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light'; // Default to light mode if not stored
  }

const preferredTheme = getThemePreference();
setTheme(preferredTheme);

// Add event listener for toggle button click
toggleButton.addEventListener('click', function() {
  const currentMode = getComputedStyle(root).getPropertyValue('--dark-mode') === 'true' ? 'dark' : 'light';
  const newTheme = currentMode === 'light' ? 'dark' : 'light';
 console.log(currentMode);
  // Set the new theme in the UI
  setTheme(newTheme);

  // Store the new theme preference in local storage
  localStorage.setItem('theme', newTheme);
});


// ================================blogs ==============================

window.onload = function () {
  
  let allBlogs = 0
  function checkAndDisplayNoBlogsMessage() {
   
  let noBlogs = true;
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key === 'theme') {
        continue;
    }
      var blog = JSON.parse(localStorage.getItem(key));
      if (blog.type === 'blog') {
        noBlogs = false;
      }
    }
   
   
    if (noBlogs) {
      var blogCard = document.createElement('div');
      blogCard.className = 'no-blogs';
      blogCard.textContent = 'No Blogs At This Time';
      const blogContainer = document.querySelector('#blog-container');
      blogContainer.style.gridTemplateColumns = 'none';
      blogContainer.appendChild(blogCard);
     
  
    }
  }
  
  // Call the function to check and display the message
  checkAndDisplayNoBlogsMessage();
  for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
     
      if (key === 'theme') {
          continue;
      }
      console.log(localStorage.length);
   
      allBlogs++;
 
   
      var blog = JSON.parse(localStorage.getItem(key));
      // Check if the item is a blog
      if (blog.type === 'blog') {
          var blogCard = document.createElement('div');
          // blogCard.href = './blog-post.html/' + blog.title;
          blogCard.className = 'blog-cards';
          blogCard.dataset.id = blog.id;

          var blogCardImg = document.createElement('div');
          blogCardImg.className = 'blog-card-img';
          var img = document.createElement('img');
          img.src = blog.image;
          blogCardImg.appendChild(img);

          var blogCardBottom = document.createElement('div');
          blogCardBottom.className = 'blog-card-bottom';

          var blogCategory = document.createElement('p');
          blogCategory.className = 'blog-category';
          blogCategory.textContent = blog.category;

          var blogTitle = document.createElement('p');
          blogTitle.className = 'blog-title';
          blogTitle.textContent = blog.title;

          var blogDescription = document.createElement('p');
          blogDescription.className = 'blog-description';
          blogDescription.textContent = blog.description;

          var blogFooter = document.createElement('div');
          blogFooter.className = 'blog-footer';

          var avatar = document.createElement('img');
          avatar.className = 'avatar';
          avatar.src = 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D';

          var blogFooterDescription = document.createElement('div');
          blogFooterDescription.className = 'blog-footer-description';

          var footerCategory = document.createElement('p');
          footerCategory.className = 'blog-category';
          footerCategory.textContent = 'maxime';

          var footerDescription = document.createElement('p');
          footerDescription.className = 'blog-description';
          footerDescription.innerHTML = '11 March 2024 <span>• 5 min read • 7 <img src="./resources/mdi_heart.svg">• 70 <img src="./resources/mdi_eye.svg"></span>';


          blogFooterDescription.appendChild(footerCategory);
          blogFooterDescription.appendChild(footerDescription);

          blogFooter.appendChild(avatar);
          blogFooter.appendChild(blogFooterDescription);
  


          blogCardBottom.appendChild(blogCategory);
          blogCardBottom.appendChild(blogTitle);
          blogCardBottom.appendChild(blogDescription);
          blogCardBottom.appendChild(blogFooter);

          blogCard.appendChild(blogCardImg);
          blogCard.appendChild(blogCardBottom);
          document.querySelector('#blog-container').appendChild(blogCard);

          var hiddenIdInput = document.createElement('input');
          hiddenIdInput.type = 'hidden';
          hiddenIdInput.value = blog.id;
          hiddenIdInput.id = 'blog-id';
          document.querySelector('#edit-blog-form').appendChild(hiddenIdInput);
      }
  }

};