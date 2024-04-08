
var token = localStorage.getItem('token');
 
if (!token) {
    window.location.href = './login.html';
}

const formatDates = (dateString) => {
    const dateObject = new Date(Date.parse(dateString));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
}
const showToast = (message, isError) => {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.style.color = isError ? 'red' : 'green';
    x.textContent = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
window.onload = function () {

   
  
   
    document.querySelector('.sign-btn').addEventListener('click', function(event) {
        // Remove the token from local storage
        localStorage.removeItem('token');
        window.location.href = '/';
    });
    function checkAndDisplayNoBlogsMessage() {
            var blogCard = document.createElement('div');
            blogCard.className = 'no-blogs';
            blogCard.textContent = 'No Blogs At This Time';
            const blogContainer = document.querySelector('#blog-container');
            blogContainer.appendChild(blogCard);


        
    }
    checkAndDisplayNoBlogsMessage();


    fetch('https://portofolio-backend-lhcp.onrender.com/blog')
        .then(response => response.json())  // Parse the response to JSON
        .then(data => {

            document.querySelector('.no-blogs').remove();
            var allBlogsContainer = document.querySelectorAll('.total-blogs');
            for (let i = 0; i < allBlogsContainer.length; i++) {
                allBlogsContainer[i].innerHTML = data.length;
            }
            var totalViews = 0;
            var totalLikes = 0;

            for (var i = 0; i < data.length; i++) {

                totalViews += data[i].views;
                totalLikes += data[i].likes;

                const date = formatDates(data[i].createdAt);
                var blogCard = document.createElement('div');
                // blogCard.href = './blog-post.html/' + blog.title;
                blogCard.className = 'blog-cards';
                blogCard.dataset.id = data[i]._id;

                var blogCardImg = document.createElement('div');
                blogCardImg.className = 'blog-card-img';
                var img = document.createElement('img');
                img.src = data[i].image;
                blogCardImg.appendChild(img);

                var blogCardBottom = document.createElement('div');
                blogCardBottom.className = 'blog-card-bottom';

                var blogCategory = document.createElement('p');
                blogCategory.className = 'blog-category';
                blogCategory.textContent = data[i].category;

                var blogTitle = document.createElement('a');
                blogTitle.className = 'blog-title';
                blogTitle.textContent = data[i].title;
                blogTitle.href = './blog-post.html?id=' + data[i]._id;

                var blogDescription = document.createElement('p');
                blogDescription.className = 'blog-description';
                blogDescription.textContent = data[i].description;

                var blogFooter = document.createElement('div');
                blogFooter.className = 'blog-footer';

                var avatar = document.createElement('img');
                avatar.className = 'avatar';
                avatar.src = 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D';

                var blogFooterDescription = document.createElement('div');
                blogFooterDescription.className = 'blog-footer-description';

                var footerCategory = document.createElement('p');
                footerCategory.className = 'blog-category';
                footerCategory.textContent = data[i].authorName;

                var footerDescription = document.createElement('p');
                footerDescription.className = 'blog-description';
                footerDescription.innerHTML = date + '<span>• ' + data[i].readingDuration + ' min read • ' + data[i].views + ' <img src="./resources/mdi_heart.svg">• ' + data[i].likes + ' <img src="./resources/mdi_eye.svg"></span>';

                var blogBtn = document.createElement('div');
                blogBtn.className = 'edit-btn';


                var editBtn = document.createElement('button');
                editBtn.className = 'blog-edit-button update-action-button';
                editBtn.id = 'edit';
                editBtn.dataset.blog = JSON.stringify(data[i]);

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
                hiddenIdInput.value = data[i]._id;
                hiddenIdInput.id = 'blog-id';
                document.querySelector('#edit-blog-form').appendChild(hiddenIdInput);

            }
            document.getElementById('total-views').innerHTML = totalViews;
            document.getElementById('total-likes').innerHTML = totalLikes;

          
                document.body.addEventListener('click', function (event) {
        
                
            
                    if (event.target.matches('.delete-action-button img')) {
                        event.preventDefault();
                        var blogCard = event.target.closest('.blog-cards');
            
                        var blogId = blogCard.dataset.id;

                        fetch('https://portofolio-backend-lhcp.onrender.com/blog/' + blogId + '/delete', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token
                            }
                        })
                        .then(response => {
                            console.log(response);
                            if (!response.ok) {
                                throw new Error(response.status);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log(data);
                            showToast("Blog deleted successfully",false);
                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            if (error.message == "401") {
                              
                              showToast("Token expired. Please login again.", true);
                              setTimeout(() => {
                                   window.location.href = './login.html';
                              }, 3000)
                                console.log("Token expired. Redirecting to login page");
                            } else {
                                showToast("An error occurred: " + error.message, true);
                            }
                        });
            
                      
                    }
                  
                });
        
                var updateButtons = document.querySelectorAll('.blog-edit-button');
                var currentBlogId;    
        
                // Add an event listener to each button
                updateButtons.forEach(function (button) {
                
                    button.addEventListener('click', function (event) {
                        event.preventDefault();
        
                        console.log("edit")
                        // Get the update modal
        
                        var blog = JSON.parse(button.dataset.blog);
                        console.log(blog)
        
        
                        // Store the id of the blog in a hidden field
                        currentBlogId = blog._id;
                        var updateForm = document.querySelector('#edit-blog-form');
                        updateForm.querySelector('input[placeholder="Enter the name"]').value = blog.authorName;
                        updateForm.querySelector('input[placeholder="Enter the duration"]').value = blog.readingDuration                        ;
                        updateForm.querySelector('input[placeholder="Enter the blog title"]').value = blog.title;
                        // updateForm.querySelector('input[placeholder="Enter the category"]').value = blog.category;
                        updateForm.querySelector('textarea[placeholder="Enter your Blog description"]').value = blog.description;
        
                        var updateModal = document.querySelector('.edit-blog-container');
                        updateModal.style.display = 'flex';
        
        
        
                    });
                });
                var closeButton = document.querySelector('#close-update-menu');
        
                // Add an event listener to the close button
                closeButton.addEventListener('click', function (event) {
                    event.preventDefault();
        
                    // Get the update modal
                    var updateModal = document.querySelector('.edit-blog-container');
                    updateModal.style.display = 'none';
                });
        
                document.querySelector('#edit-blog-form').addEventListener('submit', function (event) {
                    event.preventDefault();
        
                    // Get the updated blog information from the form
                    var blogId = currentBlogId;
                    var authorName = document.querySelector('#edit-blog-form input[placeholder="Enter the name"]').value;
                    var readingDuration = document.querySelector('#edit-blog-form input[placeholder="Enter the duration"]').value;
                    var title = document.querySelector('#edit-blog-form input[placeholder="Enter the blog title"]').value;
                    // var category = document.querySelector('#edit-blog-form input[placeholder="Enter the category"]').value;
                    var description = document.querySelector('#edit-blog-form textarea[placeholder="Enter your Blog description"]').value;
        
        
                    var updatedBlog = {
                        authorName: authorName,
                        readingDuration: readingDuration,
                        title: title,
                        description: description
                        // Add any other fields that your backend expects here
                    };
        
                    fetch('https://portofolio-backend-lhcp.onrender.com/blog/' + blogId + '/edit', {
                        method: 'PUT',  // or 'PATCH' if you're partially updating the blog post
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify(updatedBlog)
                    })
                    .then(response => {
                        console.log(response);
                        if (!response.ok) {
                            throw new Error(response.status);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        showToast("Blog edit successfully",false);
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        if (error.message == "401") {
                          
                          showToast("Token expired. Please login again.", true);
                          setTimeout(() => {
                               window.location.href = './login.html';
                          }, 3000)
                            console.log("Token expired. Redirecting to login page");
                        } else {
                            showToast("An error occurred: " + error.message, true);
                        }
                    });
        
        
                   
        
                });
            });
        
       

   


};

document.querySelector('#create-blog-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var author = document.querySelector('input[placeholder="Enter the name"]').value;
    var duration = document.querySelector('input[placeholder="Enter the duration"]').value;
    var title = document.querySelector('input[placeholder="Enter the blog title"]').value;
    var category = document.querySelector('input[placeholder="Enter the category"]').value;
    var description = document.querySelector('textarea[placeholder="Enter your Blog description"]').value;
    var image = document.querySelector('input[type="file"]').files[0];

    if (image) {
        var reader = new FileReader();
        reader.onloadend = function () {
            var base64String = reader.result;

            var blog = {
                authorName: author,
                readingDuration: duration,
                title: title,
                category: category,
                description: description,
                image: base64String,
            };

            fetch('https://portofolio-backend-lhcp.onrender.com/blog/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(blog)
            })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                showToast("Blog created successfully",false);
                setTimeout(() => {
                    window.location.reload();
                }, 6000);
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.message == "401") {
                  
                  showToast("Token expired. Please login again.", true);
                  setTimeout(() => {
                       window.location.href = './login.html';
                  }, 6000)
                    console.log("Token expired. Redirecting to login page");
                } else {
                    showToast("An error occurred: " + error.message, true);
                }
            });
        }
        reader.readAsDataURL(image);
    } else {
        console.error('No file selected');
    }
});

