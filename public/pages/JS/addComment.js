document.addEventListener("DOMContentLoaded", () => {
  const commentBtn = document.getElementById("comment_btn");

  if (!commentBtn) return;

  commentBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const commentInput = document.getElementById("comment");
    const newContent = commentInput.value.trim();

    const pathSegments = window.location.pathname.split("/");
    const postId = pathSegments[pathSegments.length - 1];

    if (!postId || !newContent) {
      alert(" Missing post ID or comment content.");
      return;
    }

    try {
      const response = await fetch("/api/comment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postID: postId,
          content: newContent,
        }),
      });

      const result = await response.json();
      console.log("Comment POST response:", result);

      if (response.ok) {
        commentInput.value = ""; 
        const commentsContainer = document.getElementById("comments");

        const commentCard = document.createElement("div");
        commentCard.className = "comment-box card has-background-dark has-text-light my-3";
        commentCard.innerHTML = `
          <header class="card-header has-background-black is-flex is-justify-content-space-between">
            <p class="card-header-title has-text-light">${result.username || "You"}</p>
            <p class="has-text-success pr-3 pt-3">
              Posted: ${new Date(result.created_at).toLocaleDateString()}
            </p>
          </header>
          <div class="card-content has-background-dark has-text-light">
            <p class="comment-content">${result.content}</p>
          </div>
        `;

        commentsContainer.appendChild(commentCard); 
      } else {
        alert(`❌ ${result.message || "Failed to add comment."}`);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("❌ Server error.");
    }
  });
});
