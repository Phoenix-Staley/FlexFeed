// loadPost.js
document.addEventListener('DOMContentLoaded', () => {
  // Parse ?id= from the URL
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');
  if (!postId) {
    document.getElementById('content').textContent = 'No post ID provided in the URL!';
    return;
  }

  // Get elements
  const contentEl = document.getElementById("content");
  const titleEl = document.getElementById("title");
  const dateEl = document.getElementById("date");
  const authorEl = document.getElementById("author");
  const imgEl = document.getElementById("img");
  const commentsContainer = document.getElementById("comments");

  // Show loading state
  contentEl.textContent = "Loading post...";
  
  // Fetch the post by ID
  fetch(`/api/post/${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(post => {
      // Update post content
      titleEl.textContent = post.title;
      contentEl.textContent = post.content;
      
      // Format the date
      const createdDate = new Date(post.created_at).toLocaleDateString();
      dateEl.textContent = "Posted: " + createdDate;
      
      // Set author
      authorEl.textContent = post.username;
      
      // Update image if available
      if (post.media) {
        imgEl.src = post.media;
        imgEl.alt = post.title;
      } else {
        imgEl.src = "../assets/landscape-placeholder.svg";
        imgEl.alt = "No image available";
      }
      
      // Load comments if available
      if (post.comments && post.comments.length > 0) {
        commentsContainer.innerHTML = "";  // Clear "No comments yet" message
        
        post.comments.forEach(comment => {
          const commentDate = new Date(comment.created_at).toLocaleDateString();
          
          const commentCard = document.createElement("div");
          commentCard.className = "comment-box card has-background-dark has-text-light my-3";
          commentCard.innerHTML = `
            <header class="card-header has-background-black is-flex is-justify-content-space-between">
              <p class="card-header-title has-text-light">${comment.username}</p>
              <p class="has-text-success pr-3 pt-3">
                Posted: ${commentDate}
              </p>
            </header>
            <div class="card-content has-background-dark has-text-light">
              <p class="comment-content">${comment.content}</p>
            </div>
          `;
          
          commentsContainer.appendChild(commentCard);
        });
      } else {
        commentsContainer.innerHTML = `
          <p class="mt-5 mx-2 mb-1 box box-padding p-5 has-text-light has-background-dark has-text-centered">
            No comments yet
          </p>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching post:', error);
      contentEl.textContent = 'Error loading the post: ' + error.message;
    });
});


/* 
let post = new Post(
    "Example Title",
    "", // imageSrc, empty until backend is implemented
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ipsum dolor, bibendum porttitor sem quis, viverra laoreet ipsum. Cras eu lacus ac eros consectetur dapibus. Morbi aliquam maximus augue vitae imperdiet. Suspendisse efficitur egestas ipsum, quis tristique magna iaculis ut. Quisque viverra condimentum felis consequat lobortis.",
    new User("Phoenix123")
);

document.getElementById("content").textContent = post.body;
document.getElementById("title").textContent = post.title;
document.getElementById("date").textContent = "Posted: " + post.publishDate.getMonth() + "/" + post.publishDate.getDate() + "/" + post.publishDate.getFullYear();
document.getElementById("author").textContent = post.author.nickname;

const exampleComment = new Comment("Phoenix", "1", "Lorum ipsum");

post.comments.push(exampleComment);

if (post.comments.length > 0) {
    const commentSection = document.getElementById("comments");
    commentSection.innerHTML = "";

    for (let i = 0; i < post.comments.length; i++) {
        let comment = document.createElement("div");
        comment.classList = "card mx-3 my=1 mb-3";

        comment.innerHTML +=
            `<header class="card-header has-background-black is-flex is-justify-content-space-between">
            <a href="" class="author-wrapper">
                <p class="card-header-title has-text-light author"></p>
            </a>
            <p class="has-text-success pr-3 pt-3 date-wrapper">
                <span class="has-text-success date"></span>
            </p>
            </header>
            <div class="card-content has-background-dark has-text-light p-3">
                <div class="content"></div>
        </div>`

        header = comment.firstChild;
        let Comment = post.comments[i]
        header.querySelector(".author-wrapper").querySelector(".author").textContent = post.author.nickname;
        header.querySelector(".date-wrapper").querySelector(".date").textContent =
            "Posted: " + Comment.publishDate.getMonth() + "/" + Comment.publishDate.getDate() + "/" + Comment.publishDate.getFullYear();

        comment.lastChild.lastChild.textContent = post.body;

        commentSection.append(comment);
    }

    // loadPost.js
document.addEventListener('DOMContentLoaded', () => {
    const singlePostContainer = document.getElementById('singlePostContainer');
    if (!singlePostContainer) {
      console.error('singlePostContainer not found!');
      return;
    }
  
    // Parse ?id= from the URL
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');
    if (!postId) {
      singlePostContainer.textContent = 'No post ID provided in the URL!';
      return;
    }
  
    // Fetch one post: GET /api/posts/:id
    async function fetchSinglePost() {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();
        if (!data.success) {
          singlePostContainer.textContent = 'Post not found or error occurred!';
          return;
        }
  
        const post = data.post;
        singlePostContainer.innerHTML = `
          <h3>Post #${post.id}</h3>
          <p>${post.content}</p>
          ${
            post.imageUrl
              ? `<img src="${post.imageUrl}" alt="Post Image" style="max-width:300px; display:block; margin-top:10px;" />`
              : ''
          }
          <p><em>Created at: ${new Date(post.createdAt).toLocaleString()}</em></p>
        `;
      } catch (err) {
        console.error('Error fetching single post:', err);
        singlePostContainer.textContent = 'Error loading the post!';
      }
    }
  
    fetchSinglePost();
  });
  
} */