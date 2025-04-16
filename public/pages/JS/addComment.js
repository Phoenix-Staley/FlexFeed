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
        document.location.reload();
      } else {
        alert(`❌ ${result.message || "Failed to add comment."}`);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("❌ Server error.");
    }
  });
});
