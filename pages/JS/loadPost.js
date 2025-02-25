let post = new Post(
    "Example Title",
    "", // imageSrc, empty until backend is implemented
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ipsum dolor, bibendum porttitor sem quis, viverra laoreet ipsum. Cras eu lacus ac eros consectetur dapibus. Morbi aliquam maximus augue vitae imperdiet. Suspendisse efficitur egestas ipsum, quis tristique magna iaculis ut. Quisque viverra condimentum felis consequat lobortis.",
    new Account("Phoenix123")
);

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
        header.querySelector(".author-wrapper").querySelector(".author").textContent = post.author.nickname;
        header.querySelector(".date-wrapper").querySelector(".date").textContent = "Posted: " + post.publishDate.getDate();

        comment.lastChild.lastChild.textContent = post.body;

        commentSection.append(comment);
    }
}