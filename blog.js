
document.querySelector('#create-blog-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('okay')
    var author = document.querySelector('input[placeholder="Enter the name"]').value;
    var duration = document.querySelector('input[placeholder="Enter the duration"]').value;
    var title = document.querySelector('input[placeholder="Enter the blog title"]').value;
    var category = document.querySelector('input[placeholder="Enter the category"]').value;
    var description = document.querySelector('textarea[placeholder="Enter your Blog description"]').value;
    var image = document.querySelector('input[type="file"]').files[0];

    var reader = new FileReader();
    reader.onloadend = function () {
        var base64String = reader.result;
    
        var blog = {
            id: Date.now(),
            author: author,
            duration: duration,
            title: title,
            category: category,
            description: description,
            image: base64String,
            type: 'blog',
        };

        localStorage.setItem(blog.id, JSON.stringify(blog));
    }
    reader.readAsDataURL(image); 
    window.location.reload();
  
});


window.onload = function () {
    console.log('ok')
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        console.log(key);
        if (key === 'theme') {
            continue;
        }
     
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

            var blogBtn = document.createElement('div');
            blogBtn.className = 'edit-btn';


            var editBtn = document.createElement('button');
            editBtn.className = 'blog-edit-button update-action-button';
            editBtn.dataset.blog = JSON.stringify(blog);

            var editBtnDelete = document.createElement('img');
            editBtnDelete.src = " ./resources/flowbite_edit-solid.svg";
            editBtn.appendChild(editBtnDelete);

            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-action-button';

            var deleteBtnImg = document.createElement('img');
            deleteBtnImg.src = "./resources/ic_round-delete.png";

            deleteBtn.appendChild(deleteBtnImg);

            blogBtn.appendChild(editBtn);
            blogBtn.appendChild(deleteBtn);

            blogFooterDescription.appendChild(footerCategory);
            blogFooterDescription.appendChild(footerDescription);

            blogFooter.appendChild(avatar);
            blogFooter.appendChild(blogFooterDescription);
            blogFooter.appendChild(blogBtn);


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

    document.body.addEventListener('click', function (event) {

        console.log([...event.target.classList]);
        if (event.target.matches('.delete-action-button img')) {
            event.preventDefault();
            var blogCard = event.target.closest('.blog-cards');
            var blogId = blogCard.dataset.id;

            localStorage.removeItem(blogId);

            console.log(blogId);
            blogCard.parentNode.removeChild(blogCard);
        }
    });
   
    var updateButtons = document.querySelectorAll('.blog-edit-button');

    // Add an event listener to each button
    updateButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            // Get the update modal
          
            var blog = JSON.parse(button.dataset.blog);
              

        
            // Store the id of the blog in a hidden field

            var updateForm = document.querySelector('#edit-blog-form');
            updateForm.querySelector('input[placeholder="Enter the name"]').value = blog.author;
            updateForm.querySelector('input[placeholder="Enter the duration"]').value = blog.duration;
            updateForm.querySelector('input[placeholder="Enter the blog title"]').value = blog.title;
            updateForm.querySelector('input[placeholder="Enter the category"]').value = blog.category;
            updateForm.querySelector('textarea[placeholder="Enter your Blog description"]').value = blog.description;

            var updateModal = document.querySelector('.edit-blog-container');
            updateModal.style.display = 'flex';
            
          
        
        });
    });

    // Get the close button
    var closeButton = document.querySelector('#close-update-menu');

    // Add an event listener to the close button
    closeButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Get the update modal
        var updateModal = document.querySelector('.edit-blog-container');

        // Close the update modal
        updateModal.style.display = 'none';
    });

    document.querySelector('#edit-blog-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Get the updated blog information from the form
        var blogId = document.querySelector('#edit-blog-form #blog-id').value;
        var author = document.querySelector('#edit-blog-form input[placeholder="Enter the name"]').value;
        var duration = document.querySelector('#edit-blog-form input[placeholder="Enter the duration"]').value;
        var title = document.querySelector('#edit-blog-form input[placeholder="Enter the blog title"]').value;
        var category = document.querySelector('#edit-blog-form input[placeholder="Enter the category"]').value;
        var description = document.querySelector('#edit-blog-form textarea[placeholder="Enter your Blog description"]').value;
    
     
        var existingBlog = JSON.parse(localStorage.getItem(blogId));
        console.log(blogId)
        console.log(existingBlog);
        // Update the fields of the existing blog object
        existingBlog.author = author;
        existingBlog.duration = duration;
        existingBlog.title = title;
        existingBlog.category = category;
        existingBlog.description = description;
    
        // // Save the updated blog information in local storage
        localStorage.setItem(blogId, JSON.stringify(existingBlog));
       

        window.location.reload();
    
    });
    

};

