let posts = [];

function addPost(event) {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    posts.push(new Post(title, "", body, "Phoenix")); // TODO: Get author from cookie, and implement image upload
}