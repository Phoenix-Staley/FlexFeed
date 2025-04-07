const posts = [
  {
    id: 1,
    title: "Is squatting necessary?",
    content: "Squats are fundamental for leg development and overall strength. They help build muscle, improve balance, and increase power in everyday activities.",
    dateUpdated: "3/9/2024",
    datePosted: "3/9/2024",
    author: "Cassandra",
  },
  {
    id: 2,
    title: "Best protein intake",
    content: "How much protein do you really need daily to maximize muscle repair and growth after your workout sessions?",
    dateUpdated: "8/18/2022",
    datePosted: "8/18/2022",
    author: "Phoenix_Creator",
  },
];

// Helper function to truncate text to a given max length
function truncateText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function loadPosts() {
  const container = document.getElementById("postsContainer");
  posts.forEach((post) => {
    // Create a card for each post
    const postElement = document.createElement("div");
    postElement.className = "card mb-3 is-transparent";

    // Truncate content to a max of 100 characters
    const truncatedContent = truncateText(post.content, 100);

    postElement.innerHTML = `
          <!-- Card Header -->
          <header class="card-header has-background-black is-flex is-justify-content-space-between">
            <p class="card-header-title has-text-light">
              <a href="./pages/post.html">${post.title}</a>
            </p>
            <p class="has-text-success pr-3 pt-3">
              <span class="has-text-white">Last updated: ${post.dateUpdated}</span>
              <span class="has-text-white"> || </span>
              <span class="has-text-success">Posted: ${post.datePosted}</span>
              <span class="has-text-white"> || </span>
              <a href="#">
                <span class="has-text-info">${post.author}</span>
              </a>
            </p>
          </header>

          <!-- Card Content -->
          <div class="card-content has-background-dark has-text-light">
            <div id="img-wrapper">
              <img id="img" class="image is-256x256" src="../assets/landscape-placeholder.svg" alt="Post Image">
            </div>
            <br>
            <div class="content" id="content">
              ${truncatedContent}
            </div>
          </div>
        `;
    container.appendChild(postElement);
  });
}

// Load the posts when the page is loaded
loadPosts();