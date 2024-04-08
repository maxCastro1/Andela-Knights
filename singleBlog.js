var url = window.location.href;
var blogId = url.substring(url.lastIndexOf('=') + 1);
var totalComments = 0;
const token = localStorage.getItem('token');

const showToast = (message, isError) => {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.style.color = isError ? 'red' : 'green';
    x.textContent = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
window.onload = function () {
   
    if (!url.includes('=')) {
        window.location.href = '/';
    }

    const formatDate = (dateString) => {
        const dateObject = new Date(Date.parse(dateString));
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate;
    }
    function generateAvatar(author) {
        const colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const firstLetter = author.charAt(0).toUpperCase();
    
        return `<div style="background-color: ${color}; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <span style="color: white; font-size: 24px; font-weight: bold;">${firstLetter}</span>
                </div>`;
    }


    
  
    


    fetch('https://portofolio-backend-lhcp.onrender.com/blog/' + blogId)
        .then(response => response.json())  // Parse the response to JSON
        .then(data => {

         
            if (data) {
                const date = formatDate(data.createdAt);
                document.querySelector('.blog-category').textContent = data.category;
                document.querySelector('.blog-title').textContent = data.title;
                document.querySelector('.blog-description').textContent = data.description;
                document.querySelector('.blog-card-img img').src = data.image;
                document.querySelector('#time').innerHTML = date + '<span>• ' + data.readingDuration + 'min read • ' + data.likes + ' <img src="./resources/mdi_heart.svg">• ' + data.views + ' <img src="./resources/mdi_eye.svg"></span>';
            } else {
                // Handle the case where the blog does not exist
                alert('Blog not found');
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error('Error fetching blog data:', error)
            window.location.href = '/';
        }

        );


    fetch(`https://portofolio-backend-lhcp.onrender.com/blog/${blogId}/view`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })

        .then(response => response.json())  // Parse the response to JSON
        .then(data => {
            // Handle your data here
            console.log(data);
        })
        .catch(error => console.error('Error:', error));

    fetch(`https://portofolio-backend-lhcp.onrender.com/comment/${blogId}`)
    .then(response => response.json())
    .then(comments => {
       
        const commentList = document.querySelector('.comment-list');
        const commentsCont = document.querySelector('.small');
        if (comments.length > 0) {
            
            comments.forEach(comment => {
                totalComments++;
                const date = formatDate(comment.createdAt);
                const commentHTML = `
                    <div class="comment">
                        <div class="blog-footer">
                             ${generateAvatar(comment.authorName)}
                           
                            <div class="blog-footer-description">
                                <p class="blog-category">${comment.authorName}</p>
                                <p class="blog-description">${date}</p>
                                ${localStorage.getItem('token') ? "<button class='delete-comment' data-id='" + comment._id + "'>Delete</button>" : ""}
                            </div>
                        </div>
                        <p class="blog-description line-bottom">${comment.content}</p>
                    </div>`;
                commentList.innerHTML += commentHTML;
                commentsCont.innerHTML = ` (${totalComments}).` 
                 if (token) {
                    document.querySelectorAll('.delete-comment').forEach(button => {
                        button.addEventListener('click', function(event) {
                            const commentId = event.target.getAttribute('data-id');
                            console.log('Deleting comment with id:', commentId);
                            event.preventDefault(); // Prevent the button from being clicked normally
                            fetch(`https://portofolio-backend-lhcp.onrender.com/comment/${commentId}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': token
                                },
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Comment deleted successfully:', data);
                                showToast("Comment deleted successfully", false);
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
                            }).catch((error) => {
                                console.error('Error:', error);
                            });
                        })
                        
                    });
                 }
            
                
            });
        } else {
            commentList.innerHTML = '<div>No comments at the moment</div>';
        }
    })
    .catch(error => console.error('Error:', error));

}





document.querySelector('#like-btn').addEventListener('click', function () {
    fetch(`https://portofolio-backend-lhcp.onrender.com/blog/${blogId}/like`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())  // Parse the response to JSON
        .then(data => {
            // Handle your data here
            console.log(data);
            location.reload();
        })
        .catch(error => console.error('Error:', error));
});

document.querySelector('.comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from being submitted normally
   console.log('clicked')
    const authorName = document.querySelector('.comment-form input').value;
    const content = document.querySelector('.comment-form textarea').value;

    if(!authorName || !content){
        showToast("Please enter name and comment", true);
        return;
    }

    const data = {
        blogId: blogId, // This should be defined somewhere in your code
        authorName: authorName,
        content: content
    };

    fetch('https://portofolio-backend-lhcp.onrender.com/comment/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Comment added successfully:', data);
        showToast("Comment added successfully", false);
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
