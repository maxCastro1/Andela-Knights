
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
    console.log('okay')
        var author = document.querySelector('input[placeholder="Enter the name"]').value;
        var duration = document.querySelector('input[placeholder="Enter the duration"]').value;
        var title = document.querySelector('input[placeholder="Enter the blog title"]').value;
        var category = document.querySelector('input[placeholder="Enter the category"]').value;
        var description = document.querySelector('textarea[placeholder="Enter your Blog description"]').value;
        var image = document.querySelector('input[type="file"]').files[0];

        var reader = new FileReader();
        reader.onloadend = function() {
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

            localStorage.setItem(title, JSON.stringify(blog));
        }
        reader.readAsDataURL(image);
        window.location.reload();
    });


    window.onload = function() {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var blog = JSON.parse(localStorage.getItem(key));
            // Check if the item is a blog
            if (blog.type === 'blog') {
                var blogCard = document.createElement('div');
                // blogCard.href = './blog-post.html/' + blog.title;
                blogCard.className = 'blog-cards';

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
            }
        }

        document.body.addEventListener('click', function(event) {

            console.log([...event.target.classList]);
            if (event.target.matches('.delete-action-button img')) {
                console.log('run2')
                event.preventDefault();
                var blogCard = event.target.closest('.blog-cards');
                var blogTitle = blogCard.querySelector('.blog-title').textContent;
                console.log(blogTitle);
                localStorage.removeItem(blogTitle);
    
                // Optionally, remove the blog post from the DOM
                var blogCard = event.target.closest('.blog-cards');
                blogCard.parentNode.removeChild(blogCard);
            }
        });

    };



// document.addEventListener("DOMContentLoaded", function() {
//     const deletingBlogs = () => {

//         // setTimeout(function() {
//         //     var deleteButtons = document.querySelectorAll('.delete-action-button');
//         //     deleteButtons.forEach(function(button) {
//         //         button.addEventListener('mouseOver', function(event) {
                  
//         //             event.preventDefault();
//         //             console.log('clicked')
      
//         //             // // Get the blog title from the button's data attribute
//         //             // var blogTitle = button.dataset.blogTitle;
      
//         //             // // Delete the blog post from local storage
//         //             // localStorage.removeItem(blogTitle);
      
//         //             // // Optionally, remove the blog post from the DOM
//         //             // var blogCard = button.closest('.blog-cards');
//         //             // blogCard.parentNode.removeChild(blogCard);
//         //         });
//         //     });
//         // },2000);
//         // document.body.addEventListener('click', function(event) {
//         //     console.log('run1')
//         //     if (event.target.matches('.delete-action-button')) {
//         //         event.preventDefault();
//         //         console.log('clicked')
//         //         var blogTitle = event.target.dataset.blogTitle;
//         //         localStorage.removeItem(blogTitle);
//         //         var blogCard = event.target.closest('.blog-cards');
//         //         blogCard.parentNode.removeChild(blogCard);
//         //     }
//         // });
    
//     }
//     deletingBlogs();
//   });